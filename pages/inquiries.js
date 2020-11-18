import React, { useEffect, useState, useContext } from "react";
import { Container, UncontrolledAlert } from "reactstrap";
import DataTable from "react-data-table-component";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";
import InquiriesTableColumns from "../components/InquiriesPage/InquiriesTableColumns";
import InquiriesTableExpandableComponent from "../components/InquiriesPage/InquiriesTableExpandableComponent";

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
            {errorMessage},<span className="mx-2"> try again</span>
          </UncontrolledAlert>
        </Container>
      )}
      <Container className="py-3">
        {inquiriesData && (
          <DataTable
            title="Business Inquiries"
            striped
            highlightOnHover
            pointerOnHover
            pagination
            columns={InquiriesTableColumns}
            data={inquiriesData}
            expandableRows
            expandOnRowClicked
            expandableRowsComponent={<InquiriesTableExpandableComponent />}
          />
        )}
      </Container>
    </Container>
  );
};

export default Inquiries;
