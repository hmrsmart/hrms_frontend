import React from "react";
import moment from "moment";
import DataTable from "react-data-table-component";
import { Container } from "reactstrap";

const columns = [
  {
    name: "Position",
    selector: "Title",
    sortable: true,
  },
  {
    name: "Date",
    selector: "Date",
    sortable: true,
    format: (row) => moment(row.Date).format("MMMM DD YYYY"),
  },
  {
    name: "Status",
    selector: "Status",
    sortable: true,
  },
  {
    name: "Experience",
    selector: "Experience",
    sortable: true,
  },
  {
    name: "Location",
    selector: "Location",
    sortable: true,
  },
];

const ExpandableComponent = ({ data }) => {
  return (
    <Container>
      <div className="py-2">
        <p className="text-muted">
          <small>Requirements</small>
        </p>
        <ul>
          {data &&
            data.Requirements.split("\n").map((res) => {
              return (
                res !== "" && (
                  <li className="py-1">
                    <small>{res}</small>
                  </li>
                )
              );
            })}
        </ul>

        <p className="text-muted">
          <small>Responsibilities</small>
        </p>
        <ul>
          {data &&
            data.Responsibilities.split("\n").map((res) => {
              return (
                res !== "" && (
                  <li className="py-1">
                    <small>{res}</small>
                  </li>
                )
              );
            })}
        </ul>
      </div>
    </Container>
  );
};

const JobApplicantCard = ({ data }) => {
  return (
    <Container className="py-3">
      {data && (
        <DataTable
          title="Open Positions"
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
      )}
    </Container>
  );
};

export default JobApplicantCard;
