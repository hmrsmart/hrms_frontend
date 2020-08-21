import React, { useEffect, useContext, useState } from "react";
import { Button } from "reactstrap";
import { useForm } from "react-hook-form";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import { getDate, getDateFormat } from "../lib/date";

const RequestLeave = () => {
  const { user, setUser } = useContext(AppContext);

  const appContext = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (!appContext.isAuthenticated) {
      router.push("/login"); // redirect if you're not logged in
    }
  }, []);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data, event) => {
    const token = Cookie.get("token");
    const payload = {
      ...data,
      Employee_Name: user.username,
      Approval: "Pending",
      Applied_Date: getDateFormat(new Date()),
    };
    console.log(payload);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/leave-requests`, {
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
        console.log(data);
        router.push("/leaves");
      });
  };

  return (
    <div className="container p-4">
      <h3 className="text-center">New Leave Request</h3>
      <div className="row d-flex justify-content-center">
        <div className="col-5">
          <form className="task-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label htmlFor="task">Request Date</label>
              <input
                type="text"
                className="form-control"
                id="task"
                placeholder="Task Description"
                value={getDate(new Date())}
                disabled
                name="Applied_Date"
                ref={register({ required: true })}
              />
              {errors.Applied_Date && (
                <span className="err-msg">*Date is required</span>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="project">Leave Type</label>
              <select
                className="form-control"
                id="project"
                name="Leave_Type"
                ref={register({ required: true })}
              >
                <option>Sick</option>
                <option>Casual</option>
                <option>Optional</option>
                <option>Unpaid</option>
                <option>Emergency</option>
                <option>Other</option>
              </select>
              {errors.Leave_Type && (
                <span className="err-msg">*Leave Type is required</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="start">From Date</label>
              <input
                type="date"
                className="form-control"
                id="start"
                placeholder=""
                name="From_Date"
                ref={register({ required: true })}
              />
              {errors.From_Date && (
                <span className="err-msg">*From Date is required</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="target">To Date</label>
              <input
                type="date"
                className="form-control"
                id="target"
                placeholder=""
                name="To_Date"
                ref={register({ required: true })}
              />
              {errors.To_Date && (
                <span className="err-msg">*To Date is required</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="remarks">Message</label>
              <textarea
                className="form-control"
                id="remarks"
                rows="3"
                name="Message"
                ref={register({ required: false })}
              />
            </div>
            <input
              type="submit"
              className="btn btn-primary"
              value="Request Leave"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RequestLeave;
