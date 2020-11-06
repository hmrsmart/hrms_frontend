import React, { useEffect, useContext, useState } from "react";
import Cookie from "js-cookie";
import { Spinner } from "reactstrap";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import { getDay } from "../lib/date";

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { user } = useContext(AppContext);

  const appContext = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (!appContext.isAuthenticated) {
      router.push("/login"); // redirect if user not logged in
    }
    const token = Cookie.get("token");
    if (token && user) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/holidays`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((data) => {
          setHolidays(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  return (
    <div className="container-fluid d-flex justify-conent-center flex-column">
      <h2 className="py-3 title-text">Holidays List</h2>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">SNO</th>
            <th scope="col">Date</th>
            <th scope="col">Day</th>
            <th scope="col">Occasion</th>
            <th scope="col">Holiday Type</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan="5" className="text-center py-5">
                <Spinner color="success" />
              </td>
            </tr>
          )}
          {holidays &&
            holidays.map((task, index) => {
              return (
                <tr
                  key={task.Ocation}
                  className={`${
                    task.Holiday_Type === "Mandatory" ? "mandatory" : "optional"
                  }`}
                >
                  <td scope="row">{index + 1}</td>
                  <td>{task.Date}</td>
                  <td>{getDay(task.Date)}</td>
                  <td>{task.Occasion}</td>
                  <td>{task.Holiday_Type}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <style jsx>
        {`
          th {
            color: #00a14b;
          }
          td {
            color: #454545;
          }
          .mandatory {
            background-color: #a8d7a8;
          }
          .optional {
            background-color: #cbe7cb;
          }
        `}
      </style>
    </div>
  );
};

export default Holidays;
