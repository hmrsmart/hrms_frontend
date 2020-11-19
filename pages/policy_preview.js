import React, { useEffect, useContext, useState } from "react";
import FileSaver from "file-saver";
import Cookie from "js-cookie";
import { useForm } from "react-hook-form";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import { FormGroup, Label, Input } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CodeOfConduct() {
  const { register, handleSubmit, errors } = useForm();
  const token = Cookie.get("token");
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { user } = useContext(AppContext);
  const [acknowledgeCheckboxStatus, setAcknowledgeCheckboxStatus] = useState(
    false
  );
  const [formSubmitLoading, setFormSubmitLoading] = useState(false);
  const [codeOfConduct, setCodeOfConduct] = useState(null);
  const [policy, setPolicy] = useState([]);

  useEffect(() => {
    if (!appContext.isAuthenticated) {
      router.push("/login"); // redirect if user not logged in
    }
    if (token && user) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/policies/${router.query.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((resJSON) => {
          console.log(resJSON);
          setPolicy([resJSON]);
        })
        .catch((error) => {
          console.log(error);
        });

      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/employee-acknowledgements?user.id=${user.id}&Policy_Type=Code of Conduct`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          if (!res) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((resJSON) => {
          if (resJSON.length !== 0) {
            setCodeOfConduct(resJSON);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [policy]);

  useEffect(() => {
    if (policy.length !== 0) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/employee-acknowledgements?user.id=${user.id}&Policy_Type=${policy[0].Policy_Name}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          if (!res) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((resJSON) => {
          if (resJSON.length !== 0) {
            setCodeOfConduct(resJSON);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  // Download code of conduct pdf document
  const downoladFile = (url) => {
    FileSaver.saveAs(url, policy[0].Policy_Name);
  };

  const UpdateCheckboxAcknowledgeStatus = () => {
    setAcknowledgeCheckboxStatus(!acknowledgeCheckboxStatus);
  };

  const submitAcknowledgement = () => {
    if (user && token) {
      const payload = {
        Employee_Name: user && user.username,
        Policy_Type: policy[0].Policy_Name,
        Status: "Acknowledged",
        user: user,
        Acknowledgement_Date: new Date(),
      };
      setFormSubmitLoading(true);
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee-acknowledgements`, {
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
          setFormSubmitLoading(false);
          setCodeOfConduct([resJSON]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="py-4">
      {policy.length !== 0 && (
        <>
          <h3 className="text-center py-3 title-text">
            {policy[0].Policy_Name}
          </h3>
          <div>
            <div className="d-flex justify-content-between py-md-3">
              <Link href="/policies">
                <a className="btn btn-link">Back to policies</a>
              </Link>
              <button
                className="btn btn-success"
                name="zyclyx_employee_handbook"
                onClick={() => downoladFile(policy[0].Policy_Document.url)}
              >
                <FontAwesomeIcon icon={["fas", "download"]} className="mr-2" />
                Download Document
              </button>
            </div>
            <embed
              src={`${policy[0].Policy_Document.url}#toolbar=0&navpanes=0&scrollbar=0`}
              type="application/pdf"
              width="100%"
              height="600px"
            />
          </div>

          {/* Acknowledgement form */}
          {codeOfConduct ? (
            <div className="container px-md-5 py-3">
              <p className="text-center">
                You have acknowledged {policy[0].Policy_Name} policy on{" "}
                <strong>
                  {codeOfConduct.length !== 0 &&
                    codeOfConduct[0].Acknowledgement_Date}
                </strong>
              </p>
              <p className="text-center">
                If you have any questions, do not hesitate to contact HR Team.
              </p>
            </div>
          ) : (
            <div className="container px-md-5 py-3">
              <div className="px-md-5">
                <p className="text-danger">
                  <strong>
                    Please read the {policy[0].Policy_Name} carefully to ensure
                    that you understand the policy before signing this document.
                  </strong>
                </p>
              </div>
              <form
                onSubmit={handleSubmit(submitAcknowledgement)}
                className="d-flex flex-column align-items-center justify-content-center px-md-5"
              >
                <FormGroup check>
                  <Label check>
                    <Input
                      type="checkbox"
                      checked={acknowledgeCheckboxStatus}
                      onChange={UpdateCheckboxAcknowledgeStatus}
                    />
                    <p>
                      I have read and been informed about the content,
                      requirements, and expectations of the{" "}
                      {policy[0].Policy_Name} for employees at ZYCLYX. I have
                      received a copy of the policy and agree to abide by the
                      policy guidelines as a condition of my employment at
                      ZYCLYX.
                    </p>
                  </Label>
                </FormGroup>
                <div className="form-group row d-flex flex-column">
                  <label htmlFor="employee_name" className="text-muted">
                    Signature
                  </label>
                  <input
                    type="text"
                    name="signature"
                    className="form-control"
                    id="employee_name"
                    disabled
                    aria-describedby="Employee Name Help"
                    value={user ? user.username : ""}
                    ref={register({ required: true })}
                  />
                  {errors.signature && (
                    <span className="err-msg">* Signature is required</span>
                  )}
                </div>
                <div className="form-group row d-flex flex-column">
                  <label htmlFor="date" className="text-muted">
                    Date
                  </label>
                  <input
                    type="text"
                    name="date"
                    className="form-control"
                    id="date"
                    disabled
                    value={moment().format("MM-DD-YYYY")}
                    ref={register({ required: true })}
                  />
                  {errors.date && (
                    <span className="err-msg">* Date is required</span>
                  )}
                </div>
                <div className="form-group row">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!acknowledgeCheckboxStatus}
                  >
                    {!formSubmitLoading ? "I Accept" : "Updating ..."}
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CodeOfConduct;
