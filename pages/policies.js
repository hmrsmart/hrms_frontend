import React, { useState } from "react";
// import { Document, Page } from "react-pdf";
// import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
// import { PDFReader } from "reactjs-pdf-reader";

function Policies() {
  //   const [numPages, setNumPages] = useState(null);
  //   const [pageNumber, setPageNumber] = useState(1);

  //   function onDocumentLoadSuccess({ numPages }) {
  //     setNumPages(numPages);
  //   }

  return (
    <div className="py-4">
      <h3 className="text-center py-3 text-primary">
        Employee Code of Conduct Policy
      </h3>
      {/* <div style={{ overflowY: "scroll", overflowX: "auto", height: "90vh" }}>
        <PDFReader url="./policy.pdf" />
      </div> */}
      <div className="container px-md-5 py-3">
        <div className="px-md-5">
          <p className="text-danger">
            <strong>
              Please read the code of conduct policy carefully to ensure that
              you understand the policy before signing this document.
            </strong>
          </p>
          <small className="text-muted">
            In effect from 05/11/2020 until further notice
          </small>
          <p className="py-2">
            I have read and been informed about the content, requirements, and
            expectations of the code of conduct policy for employees at ZYCLYX.
            I have received a copy of the policy and agree to abide by the
            policy guidelines as a condition of my employment and my continuing
            employment at ZYCLYX.
          </p>
          <p>
            <small className="text-warning">
              I understand that if I have questions, at any time, regarding the
              code of conduct policy, I will consult with my immediate
              supervisor or my Human Resources staff members.
            </small>
          </p>
        </div>
        <form className="d-flex flex-column align-items-center  justify-content-center">
          <div className="form-group row d-flex flex-column">
            <label for="employee_name" className="text-muted">
              Signature
            </label>
            <input
              type="text"
              className="form-control"
              id="employee_name"
              aria-describedby="Employee Name Help"
            />
          </div>
          <div className="form-group row d-flex flex-column">
            <label for="date" className="text-muted">
              Date
            </label>
            <input type="text" className="form-control" id="date" />
          </div>
          <div className="form-group row">
            <button type="submit" className="btn btn-primary">
              I Accept the Policy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Policies;
