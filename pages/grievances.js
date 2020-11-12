import React, { useState, useContext, useEffect } from "react";
import { Container } from "reactstrap";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import GrievanceForm from "../components/GrievancePage/GrievanceForm";
import GrievanceRecords from "../components/GrievancePage/GrievanceRecords";

const Grievances = () => {
  const token = Cookie.get("token");
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { user } = useContext(AppContext);
  const [grievanceHistoryData, setgrievanceHistoryData] = useState(null);

  useEffect(() => {
    if (!appContext.isAuthenticated) {
      router.push("/login");
    }

    if (token && user) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/grievances?user.id=${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((resJSON) => {
          setgrievanceHistoryData(resJSON);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleGrievanceFormResponse = (data) => {
    console.log(data);
    setgrievanceHistoryData([...grievanceHistoryData, data]);
  };

  return (
    <Container fluid>
      <h1 className="title-text py-3">Grievances</h1>
      {/* Grievance Form */}
      <GrievanceForm
        user={user}
        token={token}
        handleGrievanceFormResponse={handleGrievanceFormResponse}
      />
      {/* Grievance History */}
      <GrievanceRecords grievanceHistoryData={grievanceHistoryData} />
    </Container>
  );
};

export default Grievances;
