import React, { useEffect, useContext, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Profile = (props) => {
  const [tasks, setTasks] = useState([]);

  const { user, setUser } = useContext(AppContext);

  const appContext = useContext(AppContext);
  const router = useRouter();

  useEffect(() => {
    if (!appContext.isAuthenticated) {
      router.push("/login"); // redirect if you're not logged in
    }
  }, []);

  return (
    <div className="container-fluid px-5 ml-4 d-flex justify-conent-center flex-column">
      <h2 className="py-3">My Profile</h2>
      <div className="d-flex py-3">
        <Link href="/">
          <a className="ml-auto btn btn-primary">Update Profile</a>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
