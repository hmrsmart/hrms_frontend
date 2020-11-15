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
import FileSaver from "file-saver";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const JobApplicantCard = ({ data }) => {
  console.log(data);
  const downoladFile = (event) => {
    event.preventDefault();
    FileSaver.saveAs(event.target.href, event.target.name);
  };
  return (
    <Card className="my-3">
      <CardHeader>
        <Row>
          <Col lg={4}>
            <p className="mb-0">
              <span className="text-muted mr-3">Applicant Name</span>
              <span className="text-capitalize">
                {data.Firstname} {data.Lastname}
              </span>
            </p>
          </Col>
          <Col lg={4} className="text-center">
            <p className="mb-0">
              <span className="text-muted mr-3">Date</span>
              {moment(data.Date).format("MMMM Do YYYY")}
            </p>
          </Col>
          <Col lg={4} className="text-right">
            {data.Resume[0] ? (
              <a
                name={`Resume_${data.Firstname}_${data.Lastname}.${data.Resume[0].ext}`}
                href={data.Resume[0].url}
                onClick={downoladFile}
                className="pay_link btn btn-success"
                download
              >
                <FontAwesomeIcon
                  icon={["fas", "download"]}
                  className="mr-2 text-dark"
                />
                Resume
              </a>
            ) : (
              <p>
                <span className="text-muted mr-2">Resume</span>
                <span>N/A</span>
              </p>
            )}
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <div>
          <Row>
            <Col lg={6}>
              <p className="d-flex">
                <span className="text-muted mr-2">Applied for</span>
                <span>{data.Position}</span>
              </p>
            </Col>
            <Col lg={6}>
              <p className="d-flex">
                <span className="text-muted mr-2">From</span>
                <span className="text-uppercase">{data.Website}</span>
                <span className="text-muted ml-2">Website</span>
              </p>
            </Col>
            <Col lg={6}>
              <p className="d-flex">
                <span className="text-muted mr-2">Email</span>
                <span>{data.Email}</span>
              </p>
            </Col>
            <Col lg={6}>
              <p className="d-flex">
                <span className="text-muted mr-2">Phone</span>
                <span>{data.Phone}</span>
              </p>
            </Col>
            <Col>
              <p className="d-flex flex-column">
                <span className="text-muted">Message</span>
                <span className="py-2">
                  {data.Message ? data.Message : "N/A"}
                </span>
              </p>
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};

export default JobApplicantCard;
