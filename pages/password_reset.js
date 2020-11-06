import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Button, FormGroup, Label } from "reactstrap";
import { login } from "../lib/auth";
import AppContext from "../context/AppContext";

function PasswordReset(props) {
  // const router = useRouter();
  // const appContext = useContext(AppContext);
  // const { user, setUser } = useContext(AppContext);
  const [resetSuccessful, setResetSuccessful] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const [userEmail, setUserEmail] = useState();
  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  // var formdata = new FormData();
  // formdata.append("email", user.email);
  // var requestOptions = {
  //   method: "POST",
  //   body: formdata,
  //   redirect: "follow",
  // };
  // fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
  //   requestOptions
  // )
  //   .then((response) => response.text())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log("error", error));
  //}, []);

  const onSubmit = (data) => {
    setUserEmail(data.identifier);
    setLoading(true);
    var formdata = new FormData();
    formdata.append("email", data.identifier);
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
        if (!response.ok) {
          throw Error(response.statusText);
        }
        setResetSuccessful(true);
        setLoading(false);
        return response.json();
      })
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  return (
    <Container className="h-100 d-flex align-items-center justify-content-center">
      <div className="py-5">
        <h4 className="text-center">Account Password Reset</h4>

        {!resetSuccessful ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="d-flex flex-column align-items-center justify-content-center py-3"
          >
            <FormGroup>
              <Label>Email</Label>
              <input
                type="email"
                name="identifier"
                className="form-control"
                style={{ height: 55, fontSize: "1.2em" }}
                ref={register({ required: true })}
              />
              {errors.identifier && (
                <span className="err-msg">* Email is required</span>
              )}
            </FormGroup>
            <button type="submit" className="btn btn-primary">
              {!loading ? "Reset Password" : "Sending Email ..."}
            </button>
          </form>
        ) : (
          <p className="text-center py-3">
            Please check your Email - <strong>{userEmail}</strong> for the
            instructions to reset your ZYCLYX-HRMS Account password
          </p>
        )}
      </div>
    </Container>
  );
}

export default PasswordReset;
