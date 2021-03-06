import React, { useEffect, useContext, useState } from "react";
import Cookie from "js-cookie";
import { Spinner } from "reactstrap";
import { useRouter } from "next/router";
import FileSaver from "file-saver";
import { Container, Row, Col } from "reactstrap";
import DataTable, { createTheme } from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppContext from "../context/AppContext";
import { getDay } from "../lib/date";
import PayslipsTableColumn from "../components/PayslipsPage/PayslipsTableColumn";

createTheme("solarized", {
  text: {
    primary: "#111b33",
    secondary: "#2aa198",
    fontSize: "0.9rem",
  },
  background: {
    default: "#faebcc",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "#faebcc",
  },
});
// TODO : Refactor code

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

  return (
    <div className="container-fluid d-flex justify-conent-center flex-column">
      <h3 className="py-3 title-text text-center">Pay Slips</h3>
      <div className="container">
        {/* <table className="table table-striped">
          <thead className="bg-success text-dark">
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
                  <Spinner color="success" />
                </td>
              </tr>
            )}
            {payslips.length !== 0
              ? payslips.map((payslip, index) => {
                  return (
                    <tr key={payslip.Month + index}>
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
                          className="pay_link btn btn-success"
                          download
                        >
                          <FontAwesomeIcon
                            icon={["fas", "download"]}
                            className="mr-2 text-dark"
                          />
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
        </table> */}
        <Container className="py-3">
          <Row className="d-flex justify-content-center">
            <Col lg={7} md={8}>
              {payslips.length !== 0 && (
                <DataTable
                  noHeader
                  striped
                  highlightOnHover
                  pointerOnHover
                  pagination
                  columns={PayslipsTableColumn}
                  data={payslips}
                  theme="solarized"
                />
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <style jsx>
        {`
          td {
            color: #454545;
          }
          tbody tr:nth-child(odd) {
            background-color: #a8d7a8;
          }
          tbody tr:nth-child(even) {
            background-color: #cbe7cb;
          }
          .pay_link {
            color: #252525;
          }
        `}
      </style>
    </div>
  );
};

export default Payslips;
