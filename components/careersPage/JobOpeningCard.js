import React from "react";
import moment from "moment";
import {
  Container,
  Form,
  Button,
  Input,
  Row,
  Col,
  FormGroup,
  Label,
  Card,
  CardHeader,
  CardBody,
  Badge,
} from "reactstrap";

const JobApplicantCard = ({ data }) => {
  console.log(data);
  return (
    <Card className="my-3">
      <CardHeader className="d-flex justify-content-between">
        <p className="mb-0">
          <span className="text-muted mr-3">Title</span>
          {data.Title}
        </p>
        <p className="mb-0">
          <span className="text-muted mr-3">Post Date</span>
          {moment(data.createdAt).format("MMMM Do YYYY")}
        </p>

        <Badge color={data.Status === "open" ? "success" : "warning"}>
          {data.Status === "open" ? "Open" : "Closed"}
        </Badge>
      </CardHeader>
      <CardBody>
        <div>
          <Row>
            <Col lg={6}>
              <p className="d-flex">
                <span className="text-muted mr-2">Location</span>
                <span>{data.Location}</span>
              </p>
            </Col>
            <Col lg={6}>
              <p className="d-flex">
                <span className="text-muted mr-2">Experience</span>
                <span>{data.Experience}</span>
              </p>
            </Col>
          </Row>
          <p className="d-flex flex-column">
            <span className="text-muted py-2">Requirements</span>
            <ul>
              {data &&
                data.Requirements.split("\n").map((res) => {
                  return res !== "" && <li className="py-2">{res}</li>;
                })}
            </ul>
          </p>
          <p className="d-flex flex-column">
            <span className="text-muted py-2">Responsibilities</span>
            <ul>
              {data &&
                data.Responsibilities.split("\n").map((res) => {
                  return res !== "" && <li className="py-2">{res}</li>;
                })}
            </ul>
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default JobApplicantCard;
