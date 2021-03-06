import React, { useEffect, useContext, useState } from "react";
import Link from "next/link";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import {
  Row,
  Col,
  Container,
  Card,
  CardText,
  CardBody,
  CardTitle,
} from "reactstrap";
import moment from "moment";
import DataTable, { createTheme } from "react-data-table-component";

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

const columns = [
  {
    name: "Request Date",
    selector: "Applied_Date",
    format: (row) => moment(row.Applied_Date).format("MMMM DD YYYY"),
    sortable: true,
  },
  {
    name: "Leave Type",
    selector: "Leave_Type",
    sortable: true,
  },
  {
    name: "From Date",
    selector: "Form_Date",
    format: (row) => moment(row.Form_Date).format("MMMM DD YYYY"),
    sortable: true,
  },
  {
    name: "To Date",
    selector: "To_Date",
    format: (row) => moment(row.To_Date).format("MMMM DD YYYY"),
    sortable: true,
  },
  {
    name: "Approval",
    selector: "Approval",
    sortable: true,
  },
  {
    name: "Message",
    selector: "Message",
    sortable: true,
  },
];
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
          setLeaves(data);
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
      {/* <Container className="py-5">
        <Row>
          <Col lg={3}>
            <Card className="l-card-1 border-0 p-3 bg-success">
              <CardBody className="pb-0">
                <CardTitle tag="h6">Casual Leaves</CardTitle>
                <p className="mb-0">Utilized - 0</p>
                <p className="mb-0">Total - 0</p>
              </CardBody>
            </Card>
          </Col>
          <Col lg={3}>
            <Card className="l-card-2 border-0 p-3 bg-warning">
              <CardBody className="pb-0">
                <CardTitle tag="h6">Sick Leaves</CardTitle>
                <p className="mb-0">Utilized - 0</p>
                <p className="mb-0">Total - 0</p>
              </CardBody>
            </Card>
          </Col>
          <Col lg={3}>
            <Card className="l-card-3 border-0 p-3 bg-primary">
              <CardBody className="pb-0">
                <CardTitle tag="h6">Special Leaves</CardTitle>
                <p className="mb-0">Utilized - 0</p>
                <p className="mb-0">Total - 0</p>
              </CardBody>
            </Card>
          </Col>
          <Col lg={3}>
            <Card className="l-card-4 border-0 p-3 bg-danger">
              <CardBody className="pb-0">
                <CardTitle tag="h6">Bereavement Leaves</CardTitle>
                <p className="mb-0">Utilized - 0</p>
                <p className="mb-0">Total - 0</p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container> */}

      <h2 className="py-3 title-text">Leave Requests</h2>
      <div className="d-flex py-3">
        <Link href="/leave-request">
          <a className="ml-auto btn btn-primary">Request Leave</a>
        </Link>
      </div>
      {/* <table className="table table-striped">
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
      </table> */}
      {leaves.length !== 0 && (
        <DataTable
          noHeader
          striped
          highlightOnHover
          pointerOnHover
          pagination
          columns={columns}
          data={leaves}
          theme="solarized"
        />
      )}
    </div>
  );
};

export default LeaveRequest;
