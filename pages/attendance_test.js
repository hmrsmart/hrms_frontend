import React, { useEffect, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";

import {
  getClockTime,
  getDateFormat,
  getMinutesSeconds,
  secondsToTime,
} from "../lib/date";

const Attendance = (props) => {
  const [clockTime, setClockTime] = useState(getClockTime());
  const [userLoogedIn, setUserLoggedIn] = useState(false);
  const [loginTime, setLoginTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [stopTime, setStopTime] = useState(null);
  const [timerId, setTimerId] = useState(null);
  const [count, setCount] = useState("00:00:00");
  const [breakDuration, setBreakDuration] = useState({
    duration: "00:00:00",
    seconds: 0,
  });
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [breakData, setBreakData] = useState(null);
  const [loadingLogin, setLoadingLogin] = useState(false);
  const [syncTimerID, setSyncTimerID] = useState(null);

  const { user, setUser } = useContext(AppContext);
  const { register, handleSubmit, errors } = useForm();
  const appContext = useContext(AppContext);
  const router = useRouter();
  const token = Cookie.get("token");
  const breakTime = React.useRef(count);

  useEffect(() => {
    if (!appContext.isAuthenticated) {
      router.push("/login"); // redirect if you're not logged in
    }

    // clcok for attendance - check in / check out
    setInterval(function () {
      setClockTime(getClockTime());
    }, 1000);

    // Check is User logged
    if (user && token) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/attendances?Emp_Name=${
          user.username
        }&Date=${getDateFormat(new Date())}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${Cookie.get("token")}`,
          },
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((resjson) => {
          if (resjson && resjson.length !== 0) {
            resjson.map((item) => {
              if (item.Action === "Login") {
                setUserLoggedIn(true);
                setLoginTime(item.Time);
              }

              if (item.Action === "Break") {
                setBreakData({ id: item.id, notes: item.Notes });
              }
            });
          }
        });
    }
  }, []);

  const onSubmit = (data, event) => {
    const token = Cookie.get("token");
    const payload = {
      Date: getDateFormat(new Date()),
      Emp_Name: user.username,
      Action: "Login",
      Time: clockTime,
      Status: "",
      Notes: "",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendances`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        setLoadingLogin(true);
        return res.json();
      })
      .then((data) => {
        setUserLoggedIn(true);
        setLoginTime(data.Time);
        setLoadingLogin(false);
      });
  };

  const handleCheckOut = () => {
    const token = Cookie.get("token");
    const payload = {
      Date: getDateFormat(new Date()),
      Emp_Name: user.username,
      Action: "Logout",
      Time: clockTime,
      Status: "-",
      Notes: "",
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendances`, {
      method: "post",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // setUserLoggedIn(true);
        // setLoginTime(data.Time);
      });
  };

  const handleBreakTime = () => {
    setIsBreakTime(!isBreakTime);
    setStartTime(clockTime);
    let start = new Date();

    let timer = setInterval(function () {
      setCount(secondsToTime(getMinutesSeconds(start)));
      setBreakDuration({
        duration: secondsToTime(getMinutesSeconds(start)),
        seconds: getMinutesSeconds(start),
      });
    }, 1000);

    setTimerId(timer);

    const payload = {
      Date: getDateFormat(new Date()),
      Emp_Name: user.username,
      Action: "Break",
      Time: count,
      Status: "In Break",
      Notes: breakData
        ? `${breakData.notes}, From ${clockTime}`
        : `From ${clockTime}`,
    };

    const URL = breakData
      ? `${process.env.NEXT_PUBLIC_API_URL}/attendances/${breakData.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/attendances`;

    const METHOD = breakData ? "put" : "post";
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendances`, {
    fetch(URL, {
      method: METHOD,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        breakData
          ? setBreakData({ ...breakData, notes: data.Notes })
          : setBreakData({ id: data.id, notes: data.Notes });
        return data;
      })
      .then((data) => {
        let syncID = setInterval(function () {
          setBreakDuration((time) => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendances/${data.id}`, {
              method: "put",
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                Time: time.duration,
                Seconds: time.seconds,
              }),
            })
              .then((res) => {
                return res.json();
              })
              .then((resjson) => {
                console.log(resjson);
              });
          });
          return { ...time };
        }, 5000);

        // setSyncTimerID(syncID);
      });
  };

  const handleStopBreakTime = () => {
    setIsBreakTime(!isBreakTime);
    setStopTime(clockTime);
    clearInterval(timerId);
    clearInterval(syncTimerID);
    setCount((count) => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendances/${breakData.id}`, {
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Time: count,
          Notes: breakData.notes + "- " + clockTime,
          Status: "Return Back",
        }),
      });
    });
  };

  return (
    <div className="container-fluid px-5 ml-4 d-flex justify-conent-center flex-column">
      <h2 className="py-3">Attendance</h2>
      <div className="row d-flex justify-content-center">
        <div className="col-4">
          <div className="card">
            <div className="card-header">
              <h4>Login/Logout</h4>
            </div>
            <div className="card-body py-4">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group  time-input">
                  <label htmlFor="start">Time</label>
                  <input
                    type="text"
                    className="form-control py-3 text-center"
                    id="start"
                    placeholder=""
                    name="Date"
                    value={clockTime}
                    disabled
                    ref={register({ required: true })}
                  />
                  {errors.Date && (
                    <span className="err-msg">*Start Date is required</span>
                  )}
                </div>
                <div className="d-flex justify-content-around py-3">
                  <button
                    type="submit"
                    className="btn btn-primary check-in px-4"
                    disabled={userLoogedIn}
                    name="login"
                  >
                    {loadingLogin ? "Loading..." : "Login"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger check-in"
                    name="logout"
                    onClick={handleCheckOut}
                    disabled={!userLoogedIn}
                  >
                    Logout
                  </button>
                </div>
              </form>
            </div>
            {userLoogedIn && (
              <div className="card-footer text-muted">
                <p>Today's Login at - {loginTime}</p>
              </div>
            )}
          </div>
        </div>
        <div className="col-4">
          <div className="card">
            <div className="card-header">
              <h4>Break Time</h4>
            </div>
            <div className="card-body text-center py-4">
              <p className="card-text break-label">Break duration</p>
              <h2 className="break-time py-3">
                {/* {count} */}
                {breakDuration.duration}
                {/* <span className="break-time-label">Min</span> */}
              </h2>
              <div className="py-4">
                {isBreakTime ? (
                  <button
                    type="button"
                    name="stop_break"
                    className="btn btn-warning"
                    onClick={(e) => handleStopBreakTime(e)}
                  >
                    Stop Break
                  </button>
                ) : (
                  <button
                    type="button"
                    name="start_break"
                    className="btn btn-primary"
                    onClick={(e) => handleBreakTime(e)}
                  >
                    Start Break
                  </button>
                )}
              </div>
            </div>
            {startTime && (
              <div className="card-footer text-muted">
                <p>
                  Break at - {startTime} - {stopTime}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
