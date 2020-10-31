import React from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import { withRouter } from "next/router";

import AppContext from "../context/AppContext";

import {
  getClockTime,
  getDateFormat,
  getMinutesSeconds,
  secondsToTime,
} from "../lib/date";

class Attendance extends React.Component {
  static contextType = AppContext;
  constructor(props) {
    super(props);
    this.state = {
      clockTime: getClockTime(),
      userLoggedIn: false,
      loginLoading: false,
      userLoginTime: 0,
      breakTimeData: { id: false, duration: "00:00:00", notes: "", seconds: 0 },
      isBreakTime: false,
      breakTimerID: null,
      breakDurationID: null,
      prevBreakTime: 0,
      tasks: [],
    };

    this.handleUserLogin = this.handleUserLogin.bind(this);
    this.handleUserLogout = this.handleUserLogout.bind(this);
    this.handleBreakStart = this.handleBreakStart.bind(this);
    this.handleBreakStop = this.handleBreakStop.bind(this);
  }

  componentDidMount() {
    const { router } = this.props;
    const token = Cookie.get("token");
    const user = this.context.user;

    if (!this.context.isAuthenticated) {
      router.push("/login"); // redirect if user not logged in
    }
    // tick clock time for login/logout
    setInterval(() => {
      this.setState({ clockTime: getClockTime() });
    }, 1000);

    // Get login data from backend
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
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((resjson) => {
          if (resjson && resjson.length !== 0) {
            resjson.map((item) => {
              if (item.Action === "Login") {
                this.setState({ userLoginTime: item.Time, userLoggedIn: true });
              }

              if (item.Action === "Break") {
                this.setState({
                  breakTimeData: {
                    id: item.id,
                    notes: item.Notes,
                    seconds: item.Seconds,
                    duration: item.Time,
                  },
                  prevBreakTime: parseInt(item.Seconds),
                  isBreakTime: item.Status === "In Break" ? true : false,
                });

                if (item.Status === "In Break") {
                  let start = new Date();
                  let timerID = setInterval(() => {
                    this.setState((state, props) => ({
                      breakTimeData: {
                        ...state.breakTimeData,
                        duration: secondsToTime(
                          getMinutesSeconds(start, this.state.prevBreakTime)
                        ),
                        seconds: getMinutesSeconds(
                          start,
                          this.state.prevBreakTime
                        ),
                        // notes: `${breakTimeData.notes}${this.sateclockTime}`,
                      },
                    }));
                  }, 1000);

                  this.setState({ breakTimerID: timerID });
                }
              }
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });

      if (token && user) {
        fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/attendances?user.id=${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
          .then((res) => {
            if (!res.ok) {
              throw Error(res.statusText);
            }
            return res.json();
          })
          .then((data) => {
            this.setState({ tasks: data });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }

  handleUserLogin(event) {
    event.preventDefault();
    const token = Cookie.get("token");
    const user = this.context.user;
    const { clockTime } = this.state;
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
        if (!res.ok) {
          throw Error(res.statusText);
        }
        this.setState({ loginLoading: true });
        return res.json();
      })
      .then((data) => {
        this.setState({
          loginLoading: false,
          userLoginTime: data.Time,
          userLoggedIn: true,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleUserLogout(event) {
    event.preventDefault();
    const token = Cookie.get("token");
    const user = this.context.user;
    const { clockTime } = this.state;
    const payload = {
      Date: getDateFormat(new Date()),
      Emp_Name: user.username,
      Action: "Logout",
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
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        this.setState({
          userLoggedIn: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleBreakStart() {
    const { clockTime, breakTimeData, prevBreakTime } = this.state;
    const user = this.context.user;
    const token = Cookie.get("token");

    this.setState((state, props) => ({
      isBreakTime: true,
      breakTimeData: {
        ...state.breakTimeData,
        notes: `${breakTimeData.notes}${clockTime}`,
      },
    }));

    let start = new Date();
    let timerID = setInterval(() => {
      this.setState((state, props) => ({
        breakTimeData: {
          ...state.breakTimeData,
          duration: secondsToTime(getMinutesSeconds(start, prevBreakTime)),
          seconds: getMinutesSeconds(start, prevBreakTime),
          notes: `${breakTimeData.notes}${clockTime}`,
        },
      }));
    }, 1000);

    this.setState({ breakTimerID: timerID });

    const payload = {
      Date: getDateFormat(new Date()),
      Emp_Name: user.username,
      Action: "Break",
      Time: breakTimeData.duration,
      Status: "In Break",
      Notes: breakTimeData.notes,
      Seconds: breakTimeData.seconds,
    };

    const URL = breakTimeData.id
      ? `${process.env.NEXT_PUBLIC_API_URL}/attendances/${breakTimeData.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/attendances`;

    const METHOD = breakTimeData.id ? "put" : "post";
    // fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendances`, {
    fetch(URL, {
      method: METHOD,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        if (breakTimeData.id) {
          this.setState({
            breakTimeData: {
              id: data.id,
              notes: data.Notes,
              duration: data.Time,
              seconds: data.Seconds,
            },
          });
        }
        if (!breakTimeData.id) {
          this.setState({
            breakTimeData: {
              id: data.id,
              notes: data.Notes,
              duration: data.Time,
              seconds: data.Seconds,
            },
          });
        }
        return data;
      })

      .then((data) => {
        let syncID = setInterval(() => {
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendances/${data.id}`, {
            method: "put",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              Time: this.state.breakTimeData.duration,
              Seconds: this.state.breakTimeData.seconds,
              Notes: this.state.breakTimeData.notes,
            }),
          })
            .then((res) => {
              if (!res.ok) {
                throw Error(res.statusText);
              }
              return res.json();
            })
            .then((resjson) => {
              // console.log(resjson);
            })
            .catch((error) => {
              console.log(error);
            });
        }, 4000);
        this.setState({ breakDurationID: syncID });
      });
  }

  handleBreakStop() {
    const {
      clockTime,
      breakTimeData,
      breakDurationID,
      breakTimerID,
    } = this.state;

    const user = this.context.user;
    const token = Cookie.get("token");

    this.setState((state, props) => ({
      isBreakTime: false,
      breakTimeData: {
        ...state.breakTimeData,
        notes: `${breakTimeData.notes} - ${clockTime},`,
      },
      prevBreakTime: breakTimeData.seconds,
    }));

    clearInterval(breakDurationID);
    clearInterval(breakTimerID);

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/attendances/${breakTimeData.id}`,
      {
        method: "put",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          Time: breakTimeData.duration,
          Notes: `${breakTimeData.notes} - ${clockTime},`,
          Seconds: breakTimeData.seconds,
          Status: "Return Back",
        }),
      }
    );
  }

  render() {
    const {
      clockTime,
      userLoggedIn,
      userLoginTime,
      loginLoading,
      breakTimeData,
      isBreakTime,
      tasks,
    } = this.state;
    const { duration, notes } = breakTimeData;
    return (
      <div className="container-fluid d-flex justify-conent-center flex-column">
        <h2 className="py-3">Attendance</h2>
        <div className="row d-flex justify-content-center">
          <div className="col-4">
            <div className="card">
              <div className="card-header">
                <h4>Login/Logout</h4>
              </div>
              <div className="card-body py-4">
                <form>
                  <div className="form-group  time-input">
                    <label htmlFor="start">Time</label>
                    <input
                      type="text"
                      className="form-control py-3 text-center"
                      id="start"
                      placeholder=""
                      name="clock"
                      value={clockTime}
                      disabled={true}
                    />
                  </div>
                  <div className="d-flex justify-content-around py-3">
                    <button
                      type="submit"
                      className="btn btn-primary check-in px-4"
                      disabled={userLoggedIn}
                      name="login"
                      onClick={this.handleUserLogin}
                    >
                      {loginLoading ? "Loading..." : "Login"}
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger check-in"
                      name="logout"
                      disabled={!userLoggedIn}
                      onClick={this.handleUserLogout}
                    >
                      Logout
                    </button>
                  </div>
                </form>
              </div>
              {userLoggedIn && (
                <div className="card-footer text-muted">
                  <p>Today's Login at - {userLoginTime}</p>
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
                <h2 className="break-time py-3">{duration}</h2>
                <div className="py-4">
                  {isBreakTime ? (
                    <button
                      type="button"
                      name="stop_break"
                      className="btn btn-warning"
                      onClick={this.handleBreakStop}
                    >
                      Stop Break
                    </button>
                  ) : (
                    <button
                      type="button"
                      name="start_break"
                      className="btn btn-primary"
                      onClick={this.handleBreakStart}
                    >
                      Start Break
                    </button>
                  )}
                </div>
              </div>
              {notes && (
                <div className="card-footer text-muted break-logs">
                  <p>Break logs</p>
                  <ul className="mb-0">
                    {notes.split(",").map((item) => {
                      return <li key={item}>{item}</li>;
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="py-5">
          <h4 className="py-4">Attendance Logs</h4>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">SNO</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
                <th scope="col">Time</th>
                <th scope="col">Status</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
              {tasks &&
                tasks.map((task, index) => {
                  return (
                    <tr key={task.id}>
                      <th scope="row">{index + 1}</th>
                      <td>{task.Date}</td>
                      <td>{task.Action}</td>
                      <td>{task.Time}</td>
                      <td>{task.Status}</td>
                      <td className="attendance-notes">{task.Notes}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default withRouter(Attendance);
