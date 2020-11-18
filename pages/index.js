import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {
  Row,
  Col,
  Container,
  Card,
  CardText,
  CardBody,
  CardLink,
  CardTitle,
  CardSubtitle,
} from "reactstrap";

import AppContext from "../context/AppContext";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import Cookie from "js-cookie";
import Calendar from "react-calendar";
import ReactMarkdown from "react-markdown";

function Home() {
  const { user } = useContext(AppContext);
  const appContext = useContext(AppContext);
  const token = Cookie.get("token");
  const router = useRouter();
  const [announcements, setAnnouncements] = useState([]);
  const [lineManager, setLineManager] = useState([]);
  const [hrManager, setHrManager] = useState([]);

  console.log(user);
  useEffect(() => {
    if (!appContext.isAuthenticated) {
      router.push("/login"); // redirect if user not logged in
    }

    if (token && user) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/announcements?Status=Open`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((resJSON) => {
          console.log(resJSON);
          setAnnouncements(resJSON);
        })
        .catch((error) => {
          console.log(error);
        });

      // get HR Manager
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/hr-managers/${user.hr_manager}`,
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
          console.log(resJSON);
          setHrManager(resJSON);
        })
        .catch((error) => {
          console.log(error);
        });

      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/line-managers/${user.line_manager}`,
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
          console.log(resJSON);
          setLineManager(resJSON);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <Container fluid className="d-flex justify-conent-center flex-column">
      <Container className="py-5">
        <Row>
          <Col lg={8} className="py-3 profile-home">
            <Row>
              <Col lg={8}>
                <Card className="card-1">
                  <CardBody className="pb-0">
                    {user && (
                      <>
                        <CardTitle tag="h5" className="user-title">
                          {<strong> {user && user.username}</strong>}
                        </CardTitle>
                        <p>{user.email}</p>
                        <hr />
                        <div className="d-flex justify-content-around">
                          <div>
                            <h6>Line Manager</h6>
                            {lineManager && (
                              <>
                                <p className="mb-0">
                                  {lineManager.Manager_Name}
                                </p>
                                <p className="mb-0">
                                  {lineManager.Manager_Email}
                                </p>
                              </>
                            )}
                          </div>
                          <div>
                            <h6>HR Manager</h6>
                            {hrManager && (
                              <>
                                <p className="mb-0">{hrManager.Manager_Name}</p>
                                <p className="mb-0">
                                  {hrManager.Manager_Email}
                                </p>
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </CardBody>

                  <CardBody>
                    <CardText></CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col lg={4}>
                <Card className="card-2">
                  <CardBody>
                    <CardTitle tag="h5">Next Public Holiday</CardTitle>
                  </CardBody>

                  <CardBody>
                    <p className="text-center">Friday, 25 Dec 2020</p>
                    <p className="text-center">Christmas</p>
                  </CardBody>
                </Card>
              </Col>

              <Col lg={6}>
                <div className="mt-4 py-3">
                  <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName="Zyclyx_IT"
                    options={{ height: 400 }}
                  />
                </div>
              </Col>
              <Col lg={6}>
                <Col lg={12} className="py-3">
                  <div className="news-feed rounded rounded-lg text-bolder mt-4">
                    <div className="feed-header py-2 pl-3 bg-white">
                      <h5 className="text-weight-bold py-2 mb-0">
                        Announcements
                      </h5>
                    </div>
                    <div className="p-2">
                      {announcements.length !== 0 &&
                        announcements.map((item) => {
                          return (
                            <div className="feed-card shadow shadow-lg m-2 p-2 py-3 rounded rounded-lg">
                              <ReactMarkdown source={item.Description} />
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </Col>
              </Col>
            </Row>
          </Col>

          <Col lg={4}>
            <div className="h-100 cal-box">
              <Calendar className="rounded rounded-lg border-0 shadow shadow-sm" />
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Home;
