import React, { useState, useContext, useEffect } from "react";
import { Container } from "reactstrap";
import { useForm } from "react-hook-form";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";

const Policies = () => {
  return (
    <Container fluid>
      <h1 className="title-text py-3">Grievances</h1>
      {/* Grievance Form */}
      <Container>
        <h2 className="title-text-2">Grievance Form</h2>
      </Container>

      {/* Grievance History */}
      <Container>
        <h2 className="title-text-2">Grievance History</h2>
      </Container>
    </Container>
  );
};

export default Policies;
