import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
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

import { useForm } from "react-hook-form";
// import Datetime from "react-datetime";
import moment from "moment";

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

const JobPostingForm = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);
  return (
    <Container fluid>
      {/* Grievance Form */}
      <Container className="shadow shadow-sm rounded rounded-lg py-2 my-4">
        <h2 className="title-text-2 text-center py-5">
          Post a new job opening
        </h2>
        <Form onSubmit={handleSubmit(submitGrievance)}>
          <Row
            form
            className="d-flex align-items-center justify-content-center"
          >
            <Col lg={5} md={8}>
              <FormGroup className="py-3 mx-2">
                <Label for="placeOfEvent" className="text-muted">
                  <span className="text-danger mr-1">*</span>Title
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

            <Col lg={5} md={8}>
              <FormGroup className="py-3 mx-2">
                <Label for="date" className="text-muted">
                  <span className="text-danger mr-1">*</span> Experience
                </Label>
                <Input
                  type="text"
                  name="date"
                  id="date"
                  autoComplete="off"
                  innerRef={register({ required: true })}
                />
                {errors.date && (
                  <span className="err-msg">* Place of event is required</span>
                )}
              </FormGroup>
            </Col>

            <Col lg={5} md={8}>
              <FormGroup className="py-3 mx-2">
                <Label for="witness" className="text-muted">
                  Location
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
                <Label for="witness" className="text-muted">
                  Status
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

            <Col lg={10} md={8}>
              <FormGroup className="py-3 mx-2">
                <Label for="accountOfEvent" className="text-muted">
                  <span className="text-danger mr-1">*</span>Requirements
                </Label>
                <Input
                  type="textarea"
                  name="Account_of_Event"
                  id="accountOfEvent"
                  rows="4"
                  innerRef={register({ required: true })}
                />
                {errors.Account_of_Event && (
                  <span className="err-msg">
                    * Please provide grievance details
                  </span>
                )}
                <p>
                  <small className="text-muted">
                    Please start adding each requirement in new line
                  </small>
                </p>
              </FormGroup>
            </Col>

            <Col lg={10} md={8}>
              <FormGroup className="py-3 mx-2">
                <Label for="violations" className="text-muted">
                  <span className="text-danger mr-1">*</span>Responsibilities
                </Label>
                <Input
                  type="textarea"
                  name="Violations"
                  id="violations"
                  rows="4"
                  innerRef={register({ required: true })}
                />
                {errors.Violations && (
                  <span className="err-msg">*violations details required</span>
                )}
                <p>
                  <small className="text-muted">
                    Please start adding each requirement in new line
                  </small>
                </p>
              </FormGroup>
            </Col>

            <Col lg={10} md={8} className="text-center">
              <FormGroup>
                <Button type="submit" color="success">
                  {!formSubmitLoading ? "Submit" : "Sending ..."}
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Container>
    </Container>
  );
};

export default JobPostingForm;
