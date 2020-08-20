import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Timesheet = (props) => {
  const { buttonLabel, className } = props;

  const [modal, setModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  const toggle = () => setModal(!modal);

  const { user, setUser } = useContext(AppContext);
  console.log(user);
  const appContext = useContext(AppContext);
  const router = useRouter();
  // useEffect(() => {
  //   if (!appContext.isAuthenticated) {
  //     router.push("/login"); // redirect if you're not logged in
  //   }
  // }, []);

  useEffect(() => {
    const token = Cookie.get("token");
    console.log(token);
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/timesheets?Owner=${user.username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTasks(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="container-fluid px-5 ml-4 d-flex justify-conent-center flex-column">
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
          {tasks &&
            tasks.map((task, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{task.Date}</td>
                  <td>{task.Task}</td>
                  <td>{task.Time_Est}</td>
                  <td>{task.Status}</td>
                  <td>{task.Priority}</td>
                  <td>{task.Due_Date}</td>
                  <td>{task.Project}</td>
                  <td>{task.Remarks}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Timesheet;
