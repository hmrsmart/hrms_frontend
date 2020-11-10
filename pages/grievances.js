import React, { useState, useContext, useEffect } from "react";
import { Container, Form, Button, Input } from "reactstrap";
import { useForm } from "react-hook-form";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";

const Grievances = () => {
  const { register, handleSubmit, errors } = useForm();
  const token = Cookie.get("token");
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { user } = useContext(AppContext);

  const submitGrievance = () => {};
  return (
    <Container fluid>
      <h1 className="title-text py-3">Grievances</h1>
      {/* Grievance Form */}
      <Container>
        <h2 className="title-text-2">Grievance Form</h2>
        <Form onSubmit={handleSubmit(submitGrievance)}></Form>
      </Container>

      {/* Grievance History */}
      <Container>
        <h2 className="title-text-2">Grievance History</h2>
      </Container>
    </Container>
  );
};

export default Grievances;
