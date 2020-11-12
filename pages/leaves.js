import React, { useEffect, useContext, useState } from "react";
import Link from "next/link";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";

const LeaveRequest = (props) => {
  const [leaves, setLeaves] = useState([]);
  const [balance, setBalance] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { user } = useContext(AppContext);
  const appContext = useContext(AppContext);
  const router = useRouter();
  useEffect(() => {
    if (!appContext.isAuthenticated) {
      router.push("/login");
    }
    const token = Cookie.get("token");
    if (token && user) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/leave-requests?user.id=${user.id}`,
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
          data.length !== 0 && setLeaves(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });

      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/leave-balances?user.id=${user.id}`,
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
          data.length !== 0 && setBalance(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <div className="container-fluid d-flex justify-conent-center flex-column">
      <h2 className="py-3">Leave Balance</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">CL Utilized</th>
            <th scope="col">SL Utilized</th>
            <th scope="col">Total Utilized</th>
            <th scope="col">Casual Leaves</th>
            <th scope="col">Special Leaves</th>
            <th scope="col">Sick Leaves</th>
            <th scope="col">Bereavement Leaves</th>
            <th scope="col">Leave Balance</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan="8" className="text-center py-5">
                Loading . . .
              </td>
            </tr>
          )}
          {balance.length !== 0
            ? balance.map((task, index) => {
                return (
                  <tr>
                    <td>{task.CL_Utilized}</td>
                    <td>{task.SL_Utilized}</td>
                    <td>{task.SL_Utilized}</td>
                    <td>{task.Total_Leaves_Utilized}</td>
                    <td>{task.Casual_Leaves}</td>
                    <td>{task.Special_Leaves}</td>
                    <td>{task.Bereavement_Leave}</td>
                    <td>{task.Leave_Balance}</td>
                  </tr>
                );
              })
            : !isLoading && (
                <tr>
                  <td colSpan="8" className="text-center py-5">
                    There is no Leave Balance Data
                  </td>
                </tr>
              )}
        </tbody>
      </table>

      <h2 className="py-3">Leave Requests</h2>
      <div className="d-flex py-3">
        <Link href="/leave-request">
          <a className="ml-auto btn btn-primary">Request Leave</a>
        </Link>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">SNO</th>
            <th scope="col">Date</th>
            <th scope="col">Leave Type</th>
            <th scope="col">From Date</th>
            <th scope="col">To Date</th>
            <th scope="col">Status</th>
            <th scope="col">Message</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan="7" className="text-center py-5">
                Loading . . .
              </td>
            </tr>
          )}
          {leaves.length !== 0
            ? leaves.map((task, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{task.Applied_Date}</td>
                    <td>{task.Leave_Type}</td>
                    <td>{task.From_Date}</td>
                    <td>{task.To_Date}</td>
                    <td>{task.Approval}</td>
                    <td>{task.Message}</td>
                  </tr>
                );
              })
            : !isLoading && (
                <tr>
                  <td colSpan="8" className="text-center py-5">
                    There are no Leave Requests
                  </td>
                </tr>
              )}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequest;
