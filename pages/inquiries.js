import React, { useEffect, useState, useContext } from "react";
import { Container } from "reactstrap";
import DataTable from "react-data-table-component";
import moment from "moment";
import Cookie from "js-cookie";
import AppContext from "../context/AppContext";

const columns = [
  {
    name: "Name",
    selector: "Full_Name",
    sortable: true,
  },
  {
    name: "Date",
    selector: "Date",
    sortable: true,
    format: (row) => moment(row.Date).format("MMMM DD YYYY"),
  },
  {
    name: "Email",
    selector: "Email",
    sortable: true,
  },
  {
    name: "Phone",
    selector: "Phone",
    sortable: true,
  },
];

const ExpandableComponent = ({ data }) => {
  return (
    <Container>
      <div className="py-2">
        <p className="text-muted">
          <small>Message</small>
        </p>
        <p>
          <small>{data.Message}</small>
        </p>
      </div>
      <p>
        <small className="text-muted">
          From <span className="text-dark">{data.Website}</span> Website
        </small>
      </p>
    </Container>
  );
};

const Inquiries = () => {
  const token = Cookie.get("token");
  const [inquiriesData, setInquiriesData] = useState(null);
  useEffect(() => {
    // Get JOB Applications
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/business-enquiries`, {
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
      .then((resJSON) => {
        console.log(resJSON);
        setInquiriesData(resJSON);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container fluid>
      {/* <h1 className="title-text py-3">Inquiries</h1> */}
      <Container className="py-3">
        {inquiriesData && (
          <DataTable
            title="Business Inquiries"
            striped
            highlightOnHover
            pointerOnHover
            pagination
            columns={columns}
            data={inquiriesData}
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={<ExpandableComponent />}
          />
        )}
      </Container>
    </Container>
  );
};

export default Inquiries;
