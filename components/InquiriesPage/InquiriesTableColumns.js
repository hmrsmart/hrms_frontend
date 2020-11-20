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
    name: "Interested In",
    selector: "Interested",
    sortable: true,
  },
  {
    name: "Country",
    selector: "Country",
    sortable: true,
  },
];

export default columns;
