import React, { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";

const AddTask = () => {
  const { user } = useContext(AppContext);
  const appContext = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (!appContext.isAuthenticated) {
      router.push("/login");
    }
  }, [user]);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data, event) => {
    console.log(data);
    const token = Cookie.get("token");
    const payload = { ...data, Employee_Name: user.username, user: user };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/timesheets`, {
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
        router.push("/timesheets");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container p-4">
      <div className="d-flex justify-content-end">
        <Link href="/timesheets">
          <a className="btn btn-outline-warning ml-auto text-warning">
            View All Tasks
          </a>
        </Link>
      </div>
      <h3 className="text-center title-text">Add New Task</h3>
      <div className="row d-flex justify-content-center">
        <div className="col-7">
          <form className="task-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-row">
              <div className="form-group col-md-6 px-2">
                <label htmlFor="task">Task</label>
                <input
                  type="text"
                  className="form-control py-2"
                  id="task"
                  placeholder="Task Description"
                  name="Task"
                  ref={register({ required: true })}
                />
                {errors.Task && (
                  <span className="err-msg">*Task is required</span>
                )}
              </div>
              <div className="form-group col-md-6 px-2">
                <label htmlFor="start">Start Date</label>
                <input
                  type="date"
                  className="form-control py-2"
                  id="start"
                  placeholder=""
                  name="Date"
                  ref={register({ required: true })}
                />
                {errors.Date && (
                  <span className="err-msg">*Start Date is required</span>
                )}
              </div>
              <div className="form-group col-md-6 px-2">
                <label htmlFor="target">Target Date</label>
                <input
                  type="date"
                  className="form-control py-2"
                  id="target"
                  placeholder=""
                  name="Due_Date"
                  ref={register({ required: true })}
                />
                {errors.Due_Date && (
                  <span className="err-msg">*Target Date is required</span>
                )}
              </div>
              <div className="form-group col-md-6 px-2">
                <label htmlFor="target">Time Estimation</label>
                <input
                  type="number"
                  className="form-control py-2"
                  id="target"
                  placeholder=""
                  name="Time_Est"
                  ref={register({ required: true })}
                />
                {errors.Time_Est && (
                  <span className="err-msg">*Time Estimation is required</span>
                )}
              </div>
              <div className="form-group col-md-4 px-2">
                <label htmlFor="project">Project</label>
                <select
                  className="form-control"
                  id="project"
                  name="Project"
                  ref={register({ required: true })}
                >
                  <option>OCR</option>
                  <option>RPA</option>
                  <option>HRMS</option>
                  <option>Websites</option>
                </select>
                {errors.Project && (
                  <span className="err-msg">*Project is required</span>
                )}
              </div>
              <div className="form-group col-md-4 px-2">
                <label htmlFor="status">Status</label>
                <select
                  className="form-control"
                  id="status"
                  name="Status"
                  ref={register({ required: true })}
                >
                  <option>WIP</option>
                  <option>Done</option>
                  <option>Review</option>
                  <option>Blockage</option>
                </select>
                {errors.Status && (
                  <span className="err-msg">*Status is required</span>
                )}
              </div>
              <div className="form-group col-md-4 px-2">
                <label htmlFor="priority">Priority</label>
                <select
                  className="form-control"
                  id="priority"
                  name="Priority"
                  ref={register({ required: true })}
                >
                  <option>high</option>
                  <option>low</option>
                  <option>medium</option>
                </select>
                {errors.Priority && (
                  <span className="err-msg">*Priority is required</span>
                )}
              </div>
              <div className="form-group col-12">
                <label htmlFor="remarks">Remarks</label>
                <textarea
                  className="form-control"
                  id="remarks"
                  rows="3"
                  name="Remarks"
                  ref={register({ required: false })}
                />
              </div>
              <input
                type="submit"
                className="btn btn-primary"
                value="Add Task"
                //   onClick={handleSubmit(onSubmit)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
