import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import AppContext from "../context/AppContext";

function PasswordUpdate(props) {
  const [data, updateData] = useState({
    password: "",
    passwordConfirmation: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const appContext = useContext(AppContext);
  const { code } = router.query;

  //   useEffect(() => {
  //     if (appContext.isAuthenticated) {
  //       router.push("/"); // redirect if you're already logged in
  //     }
  //   }, []);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  function resetPassword() {
    if (
      data.password !== "" &&
      data.passwordConfirmation !== "" &&
      data.passwordConfirmation == data.password
    ) {
      var formdata = new FormData();
      formdata.append("code", code);
      formdata.append("password", data.password);
      formdata.append("passwordConfirmation", data.passwordConfirmation);
      setLoading(true);

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        requestOptions
      )
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          setLoading(false);
          setSuccess(true);
          return response.json();
        })
        .then((result) => console.log(result))
        .catch((error) => {
          setLoading(false);
          console.log(error);
          setError(true);
        });

      // axios
      //   .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`, {
      //     code: code,
      //     password: data.password,
      //     passwordConfirmation: data.passwordConfirmation,
      //   })
      //   .then((res) => {
      //     console.log(res);
      //     setLoading(false);
      //     setSuccess(true);
      //   })
      //   .catch((error) => {
      //     setLoading(false);
      //     console.log(error);
      //     setError(true);
      //   });
    }
  }
  return (
    <Container>
      {!success ? (
        <Row className="d-flex justify-content-center align-items-center">
          <Col sm="12" md={{ size: 6 }}>
            <div className="paper p-4 bg-white">
              <div className="py-2">
                <h3 className="pb-3 login-title text-center">
                  Reset Account Password
                </h3>
              </div>
              <section className="wrapper">
                {error && (
                  <p className="text-danger text-sm">
                    Something went wrong, try again
                  </p>
                )}
                {Object.entries(error).length !== 0 &&
                  error.constructor === Object &&
                  error.message.map((error) => {
                    return (
                      <div
                        key={error.messages[0].id}
                        style={{ marginBottom: 10 }}
                      >
                        <small style={{ color: "red" }}>
                          {error.messages[0].message}
                        </small>
                      </div>
                    );
                  })}
                <Form>
                  <fieldset disabled={loading}>
                    <FormGroup>
                      <Label>Password</Label>
                      <Input
                        onChange={(event) => onChange(event)}
                        name="password"
                        type="password"
                        required
                        style={{ height: 55, fontSize: "1.2em" }}
                      />
                    </FormGroup>
                    <FormGroup style={{ marginBottom: 30 }}>
                      <Label>Confirm Password</Label>
                      <Input
                        onChange={(event) => onChange(event)}
                        type="password"
                        name="passwordConfirmation"
                        style={{ height: 55, fontSize: "1.2em" }}
                        required
                      />
                    </FormGroup>

                    <FormGroup>
                      <Button
                        style={{ float: "right", width: 120 }}
                        color="primary"
                        onClick={() => {
                          resetPassword();
                        }}
                      >
                        {loading ? "Updating... " : "Update"}
                      </Button>
                    </FormGroup>
                  </fieldset>
                </Form>
              </section>
            </div>
          </Col>
        </Row>
      ) : (
        <div className="py-4">
          <h3 className="text-center">Password Reset Successful</h3>
        </div>
      )}
      <style jsx>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            border-radius: 6px;
            margin-top: 90px;
            border-top: 2px solid #2196f3;
          }
          .notification {
            color: #ab003c;
          }
          .header {
            width: 100%;
            height: 120px;
            background-color: #2196f3;
            margin-bottom: 30px;
            border-radius-top: 6px;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
          a {
            color: blue !important;
          }
          img {
            margin: 15px 30px 10px 50px;
          }
          .login-title {
            color: #2196f3;
            font-size: 1.3rem;
          }
        `}
      </style>
    </Container>
  );
}

export default PasswordUpdate;
