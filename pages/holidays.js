import React, { useEffect, useContext, useState } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import { getDay } from "../lib/date";

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const { user, setUser } = useContext(AppContext);

  const appContext = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (!appContext.isAuthenticated) {
      router.push("/login"); // redirect if user not logged in
    }
    const token = Cookie.get("token");
    if (token) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/holidays`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setHolidays(data);
        });
    }
  }, []);

  return (
    <div className="container-fluid px-5 ml-4 d-flex justify-conent-center flex-column">
      <h2 className="py-3">Holidays List</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">SNO</th>
            <th scope="col">Date</th>
            <th scope="col">Day</th>
            <th scope="col">Occation</th>
            <th scope="col">Holiday Type</th>
          </tr>
        </thead>
        <tbody>
          {holidays &&
            holidays.map((task, index) => {
              return (
                <tr key={task.Ocation}>
                  <th scope="row">{index + 1}</th>
                  <td>{task.Date}</td>
                  <td>{getDay(task.Date)}</td>
                  <td>{task.Ocation}</td>
                  <td>{task.Holiday_Type}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default Holidays;
