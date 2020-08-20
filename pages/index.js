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
      router.push("/login"); // redirect if you're not logged in
    }
  }, []);
  return (
    <div className="container-fluid">
      <div className="content-wrapper">
        <h2 className="px-3 py-4">Welcome, {user && user.username}</h2>
      </div>
    </div>
  );
}

export default Home;
