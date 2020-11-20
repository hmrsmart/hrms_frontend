import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FileSaver from "file-saver";

const downoladFile = (url, name) => {
  FileSaver.saveAs(url, name);
};
const columns = [
  {
    name: "Date",
    selector: "Month",
    format: (row) => `${row.Month} - ${row.Year}`,
    sortable: true,
  },
  {
    name: "Download",
    button: true,
    cell: (row) => {
      return row.Payslip[0] ? (
        <button
          type="button"
          onClick={() =>
            downoladFile(
              row.Payslip[0].url,
              `Payslip_${row.Month}_${row.Year}${row.Payslip[0].ext}`
            )
          }
          className="btn btn-success-outline d-flex"
          download
        >
          <FontAwesomeIcon
            icon={["fas", "download"]}
            className="mr-2 text-success"
          />
        </button>
      ) : (
        <p>N/A</p>
      );
    },
  },
];

export default columns;
