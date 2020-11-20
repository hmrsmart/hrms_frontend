import React, { useEffect, useState, useContext } from "react";
import { Container, UncontrolledAlert } from "reactstrap";
import DataTable, { createTheme } from "react-data-table-component";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import InquiriesTableColumns from "../components/InquiriesPage/InquiriesTableColumns";
import InquiriesTableExpandableComponent from "../components/InquiriesPage/InquiriesTableExpandableComponent";

createTheme("solarized", {
  text: {
    primary: "#111b33",
    secondary: "#2aa198",
    fontSize: "0.9rem",
  },
  background: {
    default: "#faebcc",
  },
  context: {
    background: "#cb4b16",
    text: "#FFFFFF",
  },
  divider: {
    default: "#faebcc",
  },
});

const Inquiries = () => {
  const token = Cookie.get("token");
  const { user } = useContext(AppContext);
  const appContext = useContext(AppContext);
  const router = useRouter();

  const [inquiriesData, setInquiriesData] = useState([]);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!appContext.isAuthenticated && !appContext.isManager) {
      router.push("/login");
    }

    if (appContext.isAuthenticated && !appContext.isManager) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/business-enquiries`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((resJSON) => {
        setInquiriesData(resJSON);
        setIsError(false);
        console.log(resJSON);
      })
      .catch((error) => {
        setIsError(true);
        setErrorMessage(error ? error.toString() : "something went wrong");
      });
  }, []);

  return (
    <Container fluid>
      {isError && (
        <Container className="py-2">
          <UncontrolledAlert color="danger">
            {errorMessage},<span className="mx-2"> Try again</span>
          </UncontrolledAlert>
        </Container>
      )}
      <Container className="py-3">
        {inquiriesData && (
          <DataTable
            title="Inquiries from Website"
            striped
            highlightOnHover
            pointerOnHover
            pagination
            columns={InquiriesTableColumns}
            data={inquiriesData}
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={<InquiriesTableExpandableComponent />}
            theme="solarized"
          />
        )}
      </Container>
    </Container>
  );
};

export default Inquiries;
