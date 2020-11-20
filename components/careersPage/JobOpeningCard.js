import React, { useState, useContext } from "react";
import moment from "moment";
import DataTable, { createTheme } from "react-data-table-component";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Row,
  Col,
  Input,
  FormGroup,
  Label,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookie from "js-cookie";
import { useForm, Controller } from "react-hook-form";
import AppContext from "../../context/AppContext";

createTheme("solarized", {
  text: {
    primary: "#111b33",
    secondary: "#2aa198",
    fontSize: "0.9rem",
  },
  background: {
    default: "#faebcc",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "#faebcc",
  },
});

const ExpandableComponent = ({ data }) => {
  return (
    <Container>
      <div className="py-2">
        <p className="text-muted">
          <small>Requirements</small>
        </p>
        <ul>
          {data &&
            data.Requirements.split("\n").map((res) => {
              return (
                res !== "" && (
                  <li className="py-1">
                    <small>{res}</small>
                  </li>
                )
              );
            })}
        </ul>

        <p className="text-muted">
          <small>Responsibilities</small>
        </p>
        <ul>
          {data &&
            data.Responsibilities.split("\n").map((res) => {
              return (
                res !== "" && (
                  <li className="py-1">
                    <small>{res}</small>
                  </li>
                )
              );
            })}
        </ul>
      </div>
    </Container>
  );
};

const JobApplicantCard = ({ data }) => {
  const [selectedRowData, setSelectedRowData] = useState(null);
  const { register, handleSubmit, errors, reset } = useForm();
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);
  const token = Cookie.get("token");
  const { user } = useContext(AppContext);
  const appContext = useContext(AppContext);
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const submitFormData = (data) => {
    console.log(data);
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
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/job-openings/${selectedRowData.id}`,
        {
          method: "put",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((resJSON) => {
          console.log(resJSON);
          setFormSubmitLoading(false);
          toggle();
          reset({});
        })
        .catch((error) => {
          setFormSubmitLoading(false);
          console.log(error);
        });
    }
  };
  const getSelectedRow = (data) => {
    setSelectedRowData(data);
    toggle();
  };

  const columns = [
    {
      name: "Job Title",
      selector: "Title",
      sortable: true,
    },
    {
      name: "Date",
      selector: "Date",
      sortable: true,
      format: (row) => moment(row.createdAt).format("MMMM DD YYYY"),
    },
    {
      name: "Status",
      selector: "Status",
      sortable: true,
    },
    {
      name: "Experience",
      selector: "Experience",
      sortable: true,
    },
    {
      name: "Location",
      selector: "Location",
      sortable: true,
    },
    {
      name: "Edit",
      button: true,
      cell: (row) => {
        return (
          <button
            className="btn btn-light py-0"
            type="button"
            onClick={() => getSelectedRow(row)}
          >
            <FontAwesomeIcon
              icon={["fas", "pencil-alt"]}
              className="text-info"
            />
          </button>
        );
      },
    },
  ];

  return (
    <Container className="py-3">
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <Container className="shadow shadow-sm rounded rounded-lg py-2 my-4">
            <h1 className="py-3 title-text-2 text-center text-muted">
              Update{" "}
              <span className="text-dark">
                {" "}
                {selectedRowData && selectedRowData.Title}{" "}
              </span>{" "}
              Position Details
            </h1>
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
                      defaultValue={selectedRowData && selectedRowData.Title}
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
                      defaultValue={
                        selectedRowData && selectedRowData.Experience
                      }
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
                      defaultValue={selectedRowData && selectedRowData.Location}
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
                      defaultValue={selectedRowData && selectedRowData.Status}
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
                      defaultValue={
                        selectedRowData && selectedRowData.Description
                      }
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
                      defaultValue={
                        selectedRowData && selectedRowData.Requirements
                      }
                    />
                    {errors.Requirements && (
                      <span className="err-msg">
                        * Please provide requirements
                      </span>
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
                      <span className="text-danger mr-1">*</span>{" "}
                      Responsibilities
                    </Label>
                    <Input
                      type="textarea"
                      name="Responsibilities"
                      id="responsibilities"
                      rows="6"
                      innerRef={register({ required: true })}
                      defaultValue={
                        selectedRowData && selectedRowData.Responsibilities
                      }
                    />
                    {errors.Responsibilities && (
                      <span className="err-msg">
                        * Responsibilities required
                      </span>
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
                      {!formSubmitLoading ? "Update details" : "Sending ..."}
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </Container>
        </ModalBody>
        {/* <ModalFooter>
          <Button color="primary" onClick={toggle}>Do Something</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter> */}
      </Modal>

      {data && (
        <DataTable
          noHeader
          title="Open Positions"
          striped
          highlightOnHover
          pointerOnHover
          pagination
          columns={columns}
          data={data}
          expandableRows
          expandOnRowClicked
          expandableRowsComponent={<ExpandableComponent />}
          theme="solarized"
        />
      )}
    </Container>
  );
};

export default JobApplicantCard;
