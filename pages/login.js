import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Container, Row, Col, Button, FormGroup, Label } from "reactstrap";
import { useForm } from "react-hook-form";
import { login } from "../lib/auth";
import AppContext from "../context/AppContext";

function Login(props) {
  const [data, updateData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const appContext = useContext(AppContext);
  const { user, setUser } = useContext(AppContext);
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    if (appContext.isAuthenticated) {
      router.push("/"); // redirect if you're already logged in
    }
  }, [user]);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  const onSubmit = (data) => {
    setLoading(true);
    login(data.identifier, data.password)
      .then((res) => {
        setLoading(false);
        // set authed User in global context to access in state
        appContext.setUser(res.data.user);
      })
      .catch((error) => {
        if (error.response.data) {
          setError(error.response.data);
        }
        setLoading(false);
      });
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-items-center">
        <Col sm="12" md={{ size: 6 }}>
          <div className="paper p-4 bg-white">
            <div className="py-2">
              <h3 className="pb-3 login-title text-center">
                Welcome to ZYCLYX Employee Portal
              </h3>
            </div>
            <section className="wrapper">
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Email</Label>
                    <input
                      onChange={(event) => onChange(event)}
                      name="identifier"
                      className="form-control"
                      style={{ height: 55, fontSize: "1.2em" }}
                      ref={register({ required: true })}
                    />
                    {errors.identifier && (
                      <span className="err-msg">* Email is required</span>
                    )}
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password</Label>
                    <input
                      onChange={(event) => onChange(event)}
                      type="password"
                      name="password"
                      className="form-control"
                      style={{ height: 55, fontSize: "1.2em" }}
                      ref={register({ required: true })}
                    />
                    {errors.password && (
                      <span className="err-msg">* Password is required</span>
                    )}
                  </FormGroup>

                  <FormGroup>
                    <span>
                      <Link href="/password_reset">
                        <a>
                          <small>Forgot Password?</small>
                        </a>
                      </Link>
                    </span>
                    <Button
                      style={{ float: "right", width: 120 }}
                      color="primary"
                    >
                      {loading ? "Loading... " : "Login"}
                    </Button>
                  </FormGroup>
                </fieldset>
              </form>
            </section>
          </div>
        </Col>
      </Row>
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

export default Login;
