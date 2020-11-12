import React from "react";
import moment from "moment";
import { Card, CardHeader, CardBody, Badge, Row, Col } from "reactstrap";

const GrievanceRecordCard = ({ data }) => {
  console.log(data);
  return (
    <Card className="my-3">
      <CardHeader className="d-flex justify-content-between">
        <p className="mb-0">
          <span className="text-muted mr-3">Complaint Date</span>
          {moment(data.Complaint_Date).format("MMMM Do YYYY")}
        </p>
        <p className="mb-0">
          <span className="text-muted mr-3">Date and Time of Event </span>
          <span>
            {moment(data.Event_Time_Date).format("MMMM Do YYYY, h:mm:ss a")}
          </span>
        </p>

        <Badge color={data.Status === "Active" ? "warning" : "success"}>
          {data.Status === "Active" ? "Active" : "Resolved"}
        </Badge>
      </CardHeader>
      <CardBody>
        <div>
          <Row>
            <Col lg={6}>
              <p className="d-flex flex-column">
                <span className="text-muted py-2">Place of Event</span>
                <span>{data.Place_Of_Event}</span>
              </p>
            </Col>
            <Col lg={6}>
              <p className="d-flex flex-column">
                <span className="text-muted py-2">Witness</span>
                <span>{data.Witness}</span>
              </p>
            </Col>
          </Row>
          <p className="d-flex flex-column">
            <span className="text-muted py-2">Account of Event</span>
            {data.Account_Of_Event}
          </p>
          <p className="d-flex flex-column">
            <span className="text-muted py-2">Violations</span>
            {data.Violations}
          </p>
          {data.Proposed_Solution && (
            <p className="d-flex flex-column">
              <span className="text-muted py-2">Proposed Solution</span>
              {data.Proposed_Solution}
            </p>
          )}
          {/* <p>
            <small className="text-muted">Reported To</small>
          </p> */}
        </div>
      </CardBody>
    </Card>
  );
};

export default GrievanceRecordCard;
