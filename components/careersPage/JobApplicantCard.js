import React from "react";
import moment from "moment";
import DataTable from "react-data-table-component";
import { Container } from "reactstrap";
import FileSaver from "file-saver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const downoladFile = (url, name) => {
  FileSaver.saveAs(url, name);
};

const columns = [
  {
    name: "Name",
    selector: "Firstname",
    sortable: true,
    format: (row) => `${row.Firstname} ${row.Lastname}`,
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
  {
    name: "Resume",
    sortable: true,
    button: true,
    cell: (row) => {
      return row.Resume[0] ? (
        <button
          type="button"
          onClick={() =>
            downoladFile(
              row.Resume[0].url,
              `Resume_${row.Firstname}_${row.Lastname}${row.Resume[0].ext}`
            )
          }
          className="btn btn-link text-success"
          download
        >
          <FontAwesomeIcon
            icon={["fas", "download"]}
            className="mr-2 text-dark"
          />
        </button>
      ) : (
        <p>N/A</p>
      );
    },
  },
];

const ExpandableComponent = ({ data }) => {
  return (
    <Container>
      <div className="py-2">
        <p>
          <small className="text-muted">
            Applied for <span className="mr-3 text-dark">{data.Position}</span>
          </small>
        </p>

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

const JobApplicantCard = ({ data }) => {
  return (
    <Container className="py-3">
      {data && (
        <DataTable
          title="Job Applications"
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
