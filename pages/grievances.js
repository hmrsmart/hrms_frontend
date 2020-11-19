import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
// import Datetime from "react-datetime";
import DataTable from "react-data-table-component";
import moment from "moment";
import { DateTimePicker, DatePicker } from "@material-ui/pickers";
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
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
// TODO : Refactor code

const columns = [
  {
    name: "Complaint Date",
    selector: "Complaint_Date",
    sortable: true,
    format: (row) => moment(row.Complaint_Date).format("MMMM DD YYYY"),
  },
  {
    name: "Event Time & Date",
    selector: "Event_Time_Date",
    sortable: true,
    format: (row) => moment(row.Event_Time_Date).format("MMMM DD YYYY"),
  },
  {
    name: "Status",
    selector: "Status",
    sortable: true,
  },
  {
    name: "Place of Event",
    selector: "Place_Of_Event",
    sortable: true,
  },
  {
    name: "Witness",
    selector: "Witness",
    sortable: true,
  },
];

const ExpandableComponent = ({ data }) => {
  return (
    <Container>
      <div className="py-2">
        <p className="text-muted">
          <small>Account of Event</small>
        </p>
        <p>{data.Account_Of_Event}</p>

        <p className="text-muted">
          <small>Violations</small>
        </p>
        <p>{data.Violations}</p>

        <p className="text-muted">
          <small>Proposed_Solution</small>
        </p>
        <p>{data.Proposed_Solution ? data.Proposed_Solution : "N/A"}</p>
      </div>
    </Container>
  );
};

const GrievanceRecordCard = ({ data }) => {
  return (
    <Container className="py-3">
      {data && (
        <DataTable
          title="Grievances"
          striped
          highlightOnHover
          pointerOnHover
          pagination
          columns={columns}
          data={data}
          expandableRows
          expandOnRowClicked
          expandableRowsComponent={<ExpandableComponent />}
        />
      )}
    </Container>
  );
};

const Grievances = () => {
  const token = Cookie.get("token");
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { user } = useContext(AppContext);
  const [grievanceHistoryData, setgrievanceHistoryData] = useState(null);
  const [selectedDate, handleDateChange] = useState(new Date());
  const { register, handleSubmit, errors, reset } = useForm();
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);

  console.log(user);

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

      //   if (
      //     user.Email === user.hr_manager.Manager_Email ||
      //     user.Email === user.line_manager.Manager_Email
      //   ) {
      //     let URL;

      //     if (user.Email === user.hr_manager.Manager_Email) {
      //       URL = `${process.env.NEXT_PUBLIC_API_URL}/grievances?hr_manager.id=${user.hr_manager}`;
      //     }
      //     if (user.Email === user.line_manager.Manager_Email) {
      //       URL = `${process.env.NEXT_PUBLIC_API_URL}/grievances?line_manager.id=${user.line_manager}`;
      //     }

      //     fetch(URL, {
      //       headers: {
      //         Authorization: `Bearer ${token}`,
      //       },
      //     })
      //       .then((res) => {
      //         if (!res.ok) {
      //           throw Error(res.statusText);
      //         }
      //         return res.json();
      //       })
      //       .then((resJSON) => {
      //         console.log(resJSON);
      //       })
      //       .catch((error) => {
      //         console.log(error);
      //       });
      //   }
    }
  }, []);

  const submitGrievance = (data) => {
    console.log(data);
    if (user && token) {
      const payload = {
        Employee_Name: user.username,
        Complaint_Date: new Date(),
        Email: user.email,
        Event_Time_Date: selectedDate,
        Place_Of_Event: data.Place_Of_Event,
        Witness: data.Witness,
        Account_Of_Event: data.Account_of_Event,
        Violations: data.Violations,
        Reported_To: data.Reported_To,
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
          handleGrievanceFormResponse(resJSON);
          setFormSubmitLoading(false);
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
              {/* <FormGroup className="py-3 mx-2">
                <Label for="date" className="text-muted">
                  <span className="text-danger mr-1">*</span> Date and Time
                </Label>
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
              </FormGroup> */}
              <FormGroup className="py-3 mx-2">
                <Label for="date" className="text-muted">
                  <span className="text-danger mr-1">*</span> Date and Time
                </Label>
                {/* <Input
                  type="text"
                  name="date"
                  id="date"
                  autoComplete="off"
                  innerRef={register({ required: true })}
                /> */}
                <DatePicker
                  value={selectedDate}
                  onChange={handleDateChange}
                  className="form-control px-3"
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
                  <span className="err-msg">
                    * Please provide grievance details
                  </span>
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
                {errors.Violations && (
                  <span className="err-msg">*violations details required</span>
                )}
                <p>
                  <small className="text-muted">
                    Provide a list of any policies, procedures, or guidelines
                    you believe have been violated in the event described
                  </small>
                </p>
              </FormGroup>
            </Col>
            <Col lg={10} md="8">
              <FormGroup tag="fieldset" className="d-flex py-2">
                <legend className="text-muted">
                  <small>Report To</small>
                </legend>
                <FormGroup check className="mx-2">
                  <Label check>
                    <Input
                      type="radio"
                      name="Reported_To"
                      value="HR_Manager"
                      innerRef={register({ required: true })}
                    />
                    HR Manager
                  </Label>
                </FormGroup>
                <FormGroup check className="mx-2">
                  <Label check>
                    <Input
                      type="radio"
                      name="Reported_To"
                      value="Line_Manager"
                      innerRef={register({ required: true })}
                    />
                    Line Manager
                  </Label>
                </FormGroup>
                <FormGroup check className="mx-2">
                  <Label check>
                    <Input
                      type="radio"
                      name="Reported_To"
                      value="All"
                      innerRef={register({ required: true })}
                    />
                    HR & Line Manager
                  </Label>
                </FormGroup>
              </FormGroup>
              {errors.reportto && (
                <span className="err-msg">*select reporting manager</span>
              )}
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
        {grievanceHistoryData && (
          <GrievanceRecordCard data={grievanceHistoryData} />
        )}
      </Container>
    </Container>
  );
};

export default Grievances;
