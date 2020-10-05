import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { Container } from "reactstrap";
import { login } from "../lib/auth";
import AppContext from "../context/AppContext";

function PasswordReset(props) {
  const router = useRouter();
  const appContext = useContext(AppContext);
  const { user, setUser } = useContext(AppContext);

  useEffect(() => {
    var formdata = new FormData();
    formdata.append("email", user.email);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }, []);

  return (
    <Container>
      <div className="py-4">
        <h2 className="text-center">Account Password Reset</h2>
        <p className="text-center py-3">
          Please check your Email - <strong>{user.email}</strong> for the
          instructions to reset your ZYCLYX-HRMS Account password
        </p>
      </div>
    </Container>
  );
}

export default PasswordReset;
