import React, { useEffect, useContext, useState } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import { getDay } from "../lib/date";

const Payslips = () => {
  const [payslips, setPaySlips] = useState([]);
  const { user, setUser } = useContext(AppContext);

  const appContext = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (!appContext.isAuthenticated) {
      router.push("/login"); // redirect if you're not logged in
    }
    const token = Cookie.get("token");
    if (token) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payslips?user.username=${user.username}`,
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
          setPaySlips(data);
          console.log(data);
        });
    }
  }, []);

  return (
    <div className="container-fluid px-5 ml-4 d-flex justify-conent-center flex-column">
      <h2 className="py-3">Pay Slips</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">SNO</th>
            <th scope="col">Month & Year</th>
            <th scope="col">PaySlip</th>
          </tr>
        </thead>
        <tbody>
          {payslips.length !== 0 ? (
            payslips.map((payslip, index) => {
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {payslip.Month} - {payslip.Year}
                  </td>
                  <td>
                    {" "}
                    <a
                      href={payslip.Payslip[0].url}
                      download="download"
                      target="__blank"
                    >
                      Download
                    </a>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="8" className="text-center py-5">
                There are no Pay slips
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Payslips;
