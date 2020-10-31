import React, { useEffect, useContext, useState } from "react";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import FileSaver from "file-saver";
import AppContext from "../context/AppContext";
import { getDay } from "../lib/date";

const Payslips = () => {
  const [payslips, setPaySlips] = useState([]);
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
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/payslips?user.id=${user.id}`, {
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
          setPaySlips(data);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  const downoladFile = (event) => {
    event.preventDefault();
    FileSaver.saveAs(event.target.href, event.target.name);
  };

  return (
    <div className="container-fluid d-flex justify-conent-center flex-column">
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
          {isLoading && (
            <tr>
              <td colSpan="3" className="text-center py-5">
                Loading . . .
              </td>
            </tr>
          )}
          {payslips.length !== 0
            ? payslips.map((payslip, index) => {
                return (
                  <tr key={payslip.month + index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {payslip.Month} - {payslip.Year}
                    </td>
                    <td>
                      {" "}
                      <a
                        name={`Payslip_${payslip.Month}_${payslip.Year}.pdf`}
                        href={payslip.Payslip[0].url}
                        onClick={downoladFile}
                        download
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                );
              })
            : !isLoading && (
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
