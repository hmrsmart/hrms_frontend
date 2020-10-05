import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import { Button, Alert } from "reactstrap";

function Home() {
  const { user, setUser } = useContext(AppContext);
  const appContext = useContext(AppContext);
  const router = useRouter();
  useEffect(() => {
    if (!appContext.isAuthenticated) {
      router.push("/login"); // redirect if user not logged in
    }
  }, []);
  return (
    <div className="container-fluid px-5 ml-4 d-flex justify-conent-center flex-column">
      {user && (
        <div className="content-wrapper">
          <h4 className="px-3 py-4 user-title ml-4">
            Welcome, <strong> {user && user.username}</strong>
          </h4>
        </div>
      )}
    </div>
  );
}

export default Home;
