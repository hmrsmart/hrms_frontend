import React, { useState } from "react";

import { Container, FormGroup, Label, Col, Alert } from "reactstrap";
import { useForm } from "react-hook-form";

function EmailVerification() {
  const [isLoading, setLoading] = useState(false);
  const [hasSuccess, setHasSuccess] = useState(false);
  const [email, setEmail] = useState();
  const { handleSubmit, register, errors, setError } = useForm();
  const onSubmit = (data) => {
    setLoading(true);
    setEmail({ email: data.email });
    var formdata = new FormData();
    formdata.append("email", data.email);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      requestOptions
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        if (result.statusCode === 400) {
          setLoading(false);
          setError("email", {
            type: "manual",
            message: result.message[0].messages[0].message,
          });
        }
        if (result.ok) {
          setHasSuccess(true);
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Container>
      <div className="py-4">
        <h2 className="text-center"></h2>
        <p className="text-center py-3"></p>
        <Alert color="success">
          <h4 className="alert-heading">Email Verfication Success!</h4>
          <p>Thank you for verifying your email, and welcome to ZYCLYX.</p>
          <hr />
        </Alert>
      </div>
      <div className="py-4 text-center shadow shadow-lg">
        {!hasSuccess ? (
          <>
            <h3 className="py-5">Request New Password</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormGroup row>
                <Col
                  sm={12}
                  md={6}
                  className="d-flex flex-column align-items-center justify-content-center mx-auto"
                >
                  <Label className="align-self-start">Email Address</Label>
                  <input
                    type="email"
                    name="email"
                    className="py-3 form-control"
                    ref={register({
                      required: "Please enter email address",
                    })}
                  />
                  {errors.email && (
                    <span className="err-msg">*{errors.email.message}</span>
                  )}
                </Col>
              </FormGroup>

              <FormGroup>
                <button
                  type="submit"
                  name="submit"
                  className="py-2 btn btn-primary"
                >
                  {isLoading ? "Sending Email ..." : "Request Password"}
                </button>
              </FormGroup>
            </form>
          </>
        ) : (
          <div>
            <h4>Password reset request email sent</h4>
            <p className="py-3">
              A password reset message was sent to your email address (
              <strong>{email.email}</strong>). Please check your inbox for a
              link to reset your password
            </p>
          </div>
        )}
      </div>
    </Container>
  );
}

export default EmailVerification;
