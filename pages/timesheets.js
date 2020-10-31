import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";

const Timesheet = () => {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { user } = useContext(AppContext);
  const appContext = useContext(AppContext);
  const router = useRouter();
  console.log(user);
  useEffect(() => {
    if (!appContext.isAuthenticated) {
      router.push("/login"); // redirect if user not logged in
    }

    const token = Cookie.get("token");
    console.log(token);
    if (token && user) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/timesheets?user.id=${user.id}`,
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
          setTasks(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <div className="container-fluid d-flex justify-conent-center flex-column">
      <h2 className="py-3">Timesheet</h2>
      <div className="d-flex py-3">
        <Link href="/add-task">
          <a className="ml-auto btn btn-primary">Add New Task</a>
        </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">SNO</th>
            <th scope="col">Date</th>
            <th scope="col">Task</th>
            <th scope="col">Time Est</th>
            <th scope="col">Status</th>
            <th scope="col">Priority</th>
            <th scope="col">Target Date</th>
            <th scope="col">Project</th>
            <th scope="col">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan="9" className="text-center py-5">
                Loading . . .
              </td>
            </tr>
          )}

          {tasks.length !== 0
            ? tasks.map((task, index) => {
                return (
                  <tr key={task.Task.substring(0, 10)}>
                    <td scope="row">{index + 1}</td>
                    <td>{task.Date}</td>
                    <td className="task-text">{task.Task}</td>
                    <td className="text-center">{task.Time_Est}</td>
                    <td>{task.Status}</td>
                    <td>{task.Priority}</td>
                    <td>{task.Due_Date}</td>
                    <td>{task.Project}</td>
                    <td>{task.Remarks}</td>
                  </tr>
                );
              })
            : !isLoading && (
                <tr>
                  <td colSpan="9" className="text-center py-5">
                    There are no tasks
                  </td>
                </tr>
              )}
        </tbody>
      </table>
    </div>
  );
};

export default Timesheet;
