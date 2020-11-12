import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Datetime from "react-datetime";
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
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
// TODO : Refactor code

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

const Grievances = () => {
  const token = Cookie.get("token");
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { user } = useContext(AppContext);
  const [grievanceHistoryData, setgrievanceHistoryData] = useState(null);

  useEffect(() => {
    if (!appContext.isAuthenticated) {
      router.push("/login");
    }

    if (token && user) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/grievances?user.id=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((resJSON) => {
          setgrievanceHistoryData(resJSON);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const { register, handleSubmit, errors, reset } = useForm();
  const [grievanceDate, setGrievanceDate] = useState(null);
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);
  const handleGrievanceDateChange = (date) => {
    setGrievanceDate(date._d);
  };

  const submitGrievance = (data) => {
    if (user && token) {
      const payload = {
        Employee_Name: user.username,
        Complaint_Date: new Date(),
        Email: user.email,
        Event_Time_Date: grievanceDate,
        Place_Of_Event: data.Place_Of_Event,
        Witness: data.Witness,
        Account_Of_Event: data.Account_of_Event,
        Violations: data.Violations,
        user: user,
      };
      console.log(user.username);
      setFormSubmitLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/grievances`, {
        method: "post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((resJSON) => {
          console.log(resJSON);
          handleGrievanceFormResponse(resJSON);
          setFormSubmitLoading(false);
          setGrievanceDate({ _d: "" });
          reset({});
        })
        .catch((error) => {
          setFormSubmitLoading(false);
          console.log(error);
        });
    }
  };

  const handleGrievanceFormResponse = (data) => {
    console.log(data);
    setgrievanceHistoryData([...grievanceHistoryData, data]);
  };

  return (
    <Container fluid>
      <h1 className="title-text py-3">Grievances</h1>
      {/* Grievance Form */}
      <Container className="shadow shadow-sm rounded rounded-lg py-2">
        <h2 className="title-text-2 text-center py-5">
          Employee Grievance Form
        </h2>
        <Form onSubmit={handleSubmit(submitGrievance)}>
          <Row
            form
            className="d-flex align-items-center justify-content-center"
          >
            <Col lg={3} md={8}>
              <FormGroup className="py-3 mx-2">
                <Label for="placeOfEvent" className="text-muted">
                  <span className="text-danger mr-1">*</span>Place of Event
                </Label>
                <Input
                  type="text"
                  name="Place_Of_Event"
                  id="placeOfEvent"
                  innerRef={register({ required: true })}
                />
                {errors.Place_Of_Event && (
                  <span className="err-msg">* Place of event is required</span>
                )}
              </FormGroup>
            </Col>

            <Col lg={3} md={8}>
              <FormGroup className="py-3 mx-2">
                <Label for="date" className="text-muted">
                  <span className="text-danger mr-1">*</span> Date and Time
                </Label>
                {/* <Input
                type="date"
                name="date"
                id="date"
                innerRef={register({ required: true })}
              /> */}
                <Datetime
                  ref={register({ required: true })}
                  inputProps={{
                    name: "date",
                    required: true,
                    autoComplete: "off",
                  }}
                  onChange={handleGrievanceDateChange}
                  value={grievanceDate}
                />
                {errors.date && (
                  <span className="err-msg">* Place of event is required</span>
                )}
              </FormGroup>
            </Col>

            <Col lg={4} md={8}>
              <FormGroup className="py-3 mx-2">
                <Label for="witness" className="text-muted">
                  Witness if applicable
                </Label>
                <Input
                  type="text"
                  name="Witness"
                  id="witness"
                  innerRef={register({ required: false })}
                />
                {errors.witness && (
                  <span className="err-msg">* Place of event is required</span>
                )}
              </FormGroup>
            </Col>

            <Col lg={5} md={8}>
              <FormGroup className="py-3 mx-2">
                <Label for="accountOfEvent" className="text-muted">
                  <span className="text-danger mr-1">*</span>Account of event
                </Label>
                <Input
                  type="textarea"
                  name="Account_of_Event"
                  id="accountOfEvent"
                  rows="4"
                  innerRef={register({ required: true })}
                />
                {errors.Account_of_Event && (
                  <span className="err-msg">* Place of event is required</span>
                )}
                <p>
                  <small className="text-muted">
                    Provide a detailed account of the occurrence, Include the
                    names of any persons involved
                  </small>
                </p>
              </FormGroup>
            </Col>

            <Col lg={5} md={8}>
              <FormGroup className="py-3 mx-2">
                <Label for="violations" className="text-muted">
                  <span className="text-danger mr-1">*</span>Violations
                </Label>
                <Input
                  type="textarea"
                  name="Violations"
                  id="violations"
                  rows="4"
                  innerRef={register({ required: true })}
                />
                {errors.violations && (
                  <span className="err-msg">* Place of event is required</span>
                )}
                <p>
                  <small className="text-muted">
                    Provide a list of any policies, procedures, or guidelines
                    you believe have been violated in the event described
                  </small>
                </p>
              </FormGroup>
            </Col>

            <Col lg={10} md={8} className="text-center">
              <FormGroup>
                <Button type="submit" color="success">
                  {!formSubmitLoading ? "Submit Grievance" : "Sending ..."}
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Container>
      {/* Grievance History */}
      <Container className="py-5">
        <h2 className="title-text-2 text-center py-3">Grievance History</h2>
        {grievanceHistoryData &&
          grievanceHistoryData.map((data) => {
            return <GrievanceRecordCard data={data} key={data.id} />;
          })}
      </Container>
    </Container>
  );
};

export default Grievances;
