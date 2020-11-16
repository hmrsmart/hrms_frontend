import React from "react";
import { Container } from "reactstrap";
import DataTable from "react-data-table-component";
import moment from "moment";
// import Cookie from "js-cookie";
// import AppContext from "../context/AppContext";

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

const Inquiries = ({ data }) => {
  console.log(data);
  return (
    <Container fluid>
      {/* <h1 className="title-text py-3">Inquiries</h1> */}
      <Container className="py-3">
        <DataTable
          title="Business Inquiries"
          striped
          highlightOnHover
          pointerOnHover
          pagination
          columns={columns}
          data={data}
          expandableRows
          expandOnRowClicked
          expandableRowsComponent={<ExpandableComponent />}
        />
      </Container>
    </Container>
  );
};

export async function getServerSideProps(ctx) {
  // Fetch data from API
  const token = ctx.req.headers.cookie
    ? ctx.req.headers.cookie.split(" ")[1].replace("token=", "")
    : undefined;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/business-enquiries`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();

  // Pass data to the page via props

  return { props: { data } };
}
export default Inquiries;
