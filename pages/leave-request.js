import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import { getDateDDMMYYYY, getDateFormat } from "../lib/date";

const RequestLeave = () => {
  const { user } = useContext(AppContext);
  const appContext = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (!appContext.isAuthenticated) {
      router.push("/login"); // redirect if you're not logged in
    }
  }, [user]);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data, event) => {
    const token = Cookie.get("token");
    const payload = {
      ...data,
      Employee_Name: user.username,
      Approval: "Pending",
      Applied_Date: getDateFormat(new Date()),
      user: user,
    };
    // console.log(payload);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/leave-requests`, {
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
        //  console.log(data);
        router.push("/leaves");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container p-4">
      <h3 className="text-center mt-md-3 title-text">New Leave Request</h3>
      <div className="row d-flex justify-content-center mt-md-5">
        <div className="col-6">
          <form className="task-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              <div className="form-group col-md-6 px-3">
                <label htmlFor="task">Request Date</label>
                <input
                  type="text"
                  className="form-control py-2"
                  id="task"
                  placeholder="Task Description"
                  value={getDateDDMMYYYY(new Date())}
                  disabled
                  name="Applied_Date"
                  ref={register({ required: true })}
                />
                {errors.Applied_Date && (
                  <span className="err-msg">*Date is required</span>
                )}
              </div>
              <div className="form-group col-md-6 px-3">
                <label htmlFor="project">Leave Type</label>
                <select
                  className="form-control py-2"
                  id="project"
                  name="Leave_Type"
                  ref={register({ required: true })}
                >
                  <option>Casual</option>
                  <option>Sick</option>
                  <option>Special</option>
                  <option>Bereavement</option>
                </select>
                {errors.Leave_Type && (
                  <span className="err-msg">*Leave Type is required</span>
                )}
              </div>

              <div className="form-group col-md-6 px-3">
                <label htmlFor="start">From Date</label>
                <input
                  type="date"
                  className="form-control py-2"
                  id="start"
                  placeholder=""
                  name="From_Date"
                  ref={register({ required: true })}
                />
                {errors.From_Date && (
                  <span className="err-msg">*From Date is required</span>
                )}
              </div>

              <div className="form-group col-md-6 px-3">
                <label htmlFor="target">To Date</label>
                <input
                  type="date"
                  className="form-control py-2"
                  id="target"
                  placeholder=""
                  name="To_Date"
                  ref={register({ required: true })}
                />
                {errors.To_Date && (
                  <span className="err-msg">*To Date is required</span>
                )}
              </div>

              <div className="form-group col-12 px-3">
                <label htmlFor="remarks">Message</label>
                <textarea
                  className="form-control"
                  id="remarks"
                  rows="3"
                  name="Message"
                  ref={register({ required: false })}
                />
              </div>
              <div className="form-group col-12 px-3">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value="Request Leave"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestLeave;
