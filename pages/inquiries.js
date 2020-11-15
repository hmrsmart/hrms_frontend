import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  Form,
  Button,
  Input,
  Row,
  Col,
  FormGroup,
  Label,
  Card,
  CardHeader,
  CardBody,
  Badge,
} from "reactstrap";
import moment from "moment";
import Cookie from "js-cookie";
import AppContext from "../context/AppContext";

const InquiryCard = ({ data }) => {
  return (
    <Card className="my-3">
      <CardHeader>
        <Row>
          <Col lg={6}>
            <p className="mb-0">
              <span className="text-muted mr-3"> Name</span>
              <span className="text-capitalize">{data.Full_Name}</span>
            </p>
          </Col>
          <Col lg={6} className="text-lg-right">
            <p className="mb-0">
              <span className="text-muted mr-3">Date</span>
              {moment(data.Date).format("MMMM Do YYYY")}
            </p>
          </Col>
        </Row>
      </CardHeader>
      <CardBody>
        <div>
          <Row>
            <Col lg={6}>
              <p className="d-flex">
                <span className="text-muted mr-2">Email</span>
                <span>{data.Email}</span>
              </p>
            </Col>
            <Col lg={6}>
              <p className="d-flex">
                <span className="text-muted mr-2">Phone</span>
                <span className="text-uppercase">{data.Phone}</span>
              </p>
            </Col>
            <Col lg={6}>
              <p className="d-flex">
                <span className="text-muted mr-2">Interested in</span>
                <span>{data.Interested}</span>
              </p>
            </Col>
            <Col lg={6}>
              <p className="d-flex">
                <span className="text-muted mr-2">From</span>
                <span>{data.Website}</span>
                <span className="text-muted ml-2">Website</span>
              </p>
            </Col>
            <Col>
              <p className="d-flex flex-column">
                <span className="text-muted">Message</span>
                <span className="py-2">
                  {data.Message ? data.Message : "N/A"}
                </span>
              </p>
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  );
};

const Inquiries = ({ inquiriesData }) => {
  const { user } = useContext(AppContext);
  const token = Cookie.get("token");
  //   const [inquiriesData, setInquiriesData] = useState(null);

  //   useEffect(() => {
  //     if (token && user) {
  //       fetch(`${process.env.NEXT_PUBLIC_API_URL}/business-enquiries`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //         .then((res) => {
  //           if (!res.ok) {
  //             throw Error(res.statusText);
  //           }
  //           return res.json();
  //         })
  //         .then((resJSON) => {
  //           console.log(resJSON);
  //           setInquiriesData(resJSON);
  //         })
  //         .catch((error) => {
  //           console.log(error);
  //         });
  //     }
  //   }, []);

  return (
    <Container fluid>
      <h1 className="title-text py-3">Inquiries</h1>
      <Container>
        <Row>
          {inquiriesData &&
            inquiriesData.map((data) => {
              return <InquiryCard data={data} key={data.id} />;
            })}
        </Row>
      </Container>
    </Container>
  );
};

export async function getServerSideProps(ctx) {
  // Fetch data from external API

  const token = ctx.req.headers.cookie
    ? ctx.req.headers.cookie.split(" ")[1].replace("token=", "")
    : undefined;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/business-enquiries`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const inquiriesData = await res.json();

  // Pass data to the page via props

  return { props: { inquiriesData } };
}
export default Inquiries;
