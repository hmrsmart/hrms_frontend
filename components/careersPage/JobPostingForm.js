import React, { useState, useContext, useEffect } from "react";
import {
  Container,
  Form,
  Button,
  Input,
  Row,
  Col,
  FormGroup,
  Label,
} from "reactstrap";
import Cookie from "js-cookie";
import { useForm } from "react-hook-form";
import AppContext from "../../context/AppContext";

const JobPostingForm = () => {
  const { register, handleSubmit, errors, reset } = useForm();
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);
  const token = Cookie.get("token");
  const { user } = useContext(AppContext);
  const appContext = useContext(AppContext);

  const submitFormData = (data) => {
    if (user && token) {
      const payload = {
        Title: data.Title,
        Description: data.Description,
        Location: data.Location,
        Status: data.Status,
        Requirements: data.Requirements,
        Responsibilities: data.Responsibilities,
        Experience: data.Experience,
      };

      setFormSubmitLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/job-openings`, {
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
          setFormSubmitLoading(false);
          reset({});
        })
        .catch((error) => {
          setFormSubmitLoading(false);
          console.log(error);
        });
    }
  };

  return (
    <Container fluid>
      {/* Job Positing Form Form */}
      <Container className="shadow shadow-sm rounded rounded-lg py-2 my-4">
        <h2 className="title-text-2 text-center py-5">
          Post a new job opening
        </h2>
        <Form onSubmit={handleSubmit(submitFormData)}>
          <Row
            form
            className="d-flex align-items-center justify-content-center"
          >
            <Col lg={5} md={8}>
              <FormGroup className="py-3 mx-2">
                <Label for="title" className="text-muted">
                  <span className="text-danger mr-1">*</span>Position Title
                </Label>
                <Input
                  type="text"
                  name="Title"
                  id="title"
                  innerRef={register({ required: true })}
                />
                {errors.Title && (
                  <span className="err-msg">* Title is required</span>
                )}
              </FormGroup>
            </Col>

            <Col lg={5} md={8}>
              <FormGroup className="py-3 mx-2">
                <Label for="experience" className="text-muted">
                  <span className="text-danger mr-1">*</span> Experience
                </Label>
                <Input
                  type="text"
                  name="Experience"
                  id="experience"
                  innerRef={register({ required: true })}
                />
                {errors.Experience && (
                  <span className="err-msg">* Experience is required</span>
                )}
              </FormGroup>
            </Col>

            <Col lg={5} md={8}>
              <FormGroup className="py-3 mx-2">
                <Label for="location" className="text-muted">
                  <span className="text-danger mr-1">*</span> Location
                </Label>
                <Input
                  type="text"
                  name="Location"
                  id="location"
                  innerRef={register({ required: true })}
                />
                {errors.Location && (
                  <span className="err-msg">* Location is required</span>
                )}
              </FormGroup>
            </Col>

            <Col lg={5} md={8}>
              <FormGroup className="py-3 mx-2">
                <Label for="status" className="text-muted">
                  <span className="text-danger mr-1">*</span> Status
                </Label>

                <select
                  className="form-control py-2"
                  id="status"
                  name="Status"
                  ref={register({ required: true })}
                >
                  <option value="open">Open</option>
                  <option value="closed">Closed</option>
                </select>
                {errors.Status && (
                  <span className="err-msg">* Status is required</span>
                )}
              </FormGroup>
            </Col>
            <Col lg={10} md={8}>
              <FormGroup className="py-3 mx-2">
                <Label for="description" className="text-muted">
                  Description
                </Label>
                <Input
                  type="textarea"
                  name="Description"
                  id="description"
                  rows="3"
                  innerRef={register({ required: false })}
                />
              </FormGroup>
            </Col>
            <Col lg={10} md={8}>
              <FormGroup className="py-3 mx-2">
                <Label for="requirements" className="text-muted">
                  <span className="text-danger mr-1">*</span>Requirements
                </Label>
                <Input
                  type="textarea"
                  name="Requirements"
                  id="requirements"
                  rows="6"
                  innerRef={register({ required: true })}
                />
                {errors.Requirements && (
                  <span className="err-msg">* Please provide requirements</span>
                )}
                <p>
                  <small className="text-muted">
                    Please add each single requirement in a new line
                  </small>
                </p>
              </FormGroup>
            </Col>

            <Col lg={10} md={8}>
              <FormGroup className="py-3 mx-2">
                <Label for="responsibilities" className="text-muted">
                  <span className="text-danger mr-1">*</span> Responsibilities
                </Label>
                <Input
                  type="textarea"
                  name="Responsibilities"
                  id="responsibilities"
                  rows="6"
                  innerRef={register({ required: true })}
                />
                {errors.Responsibilities && (
                  <span className="err-msg">* Responsibilities required</span>
                )}
                <p>
                  <small className="text-muted">
                    Please add each single Responsibility in a new line
                  </small>
                </p>
              </FormGroup>
            </Col>

            <Col lg={10} md={8} className="text-center">
              <FormGroup>
                <Button
                  type="submit"
                  color="success"
                  disabled={formSubmitLoading}
                >
                  {!formSubmitLoading ? "Submit Position" : "Sending ..."}
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
