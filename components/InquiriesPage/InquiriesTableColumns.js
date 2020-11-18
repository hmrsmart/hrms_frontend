import moment from "moment";

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

export default columns;
