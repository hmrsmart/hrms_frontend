import React, { useState, useEffect, useContext } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container,
} from "reactstrap";

import JobOpeningCard from "../components/careersPage/JobOpeningCard";
import JobApplicantCard from "../components/careersPage/JobApplicantCard";
import JobPostingForm from "../components/careersPage/JobPostingForm";
import Cookie from "js-cookie";
import { Spinner } from "reactstrap";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";

const Careers = () => {
  const token = Cookie.get("token");
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const { user } = useContext(AppContext);
  const [jobOpeningsData, setJobOpeningsData] = useState(null);
  const [jobApplicationsData, setJobApplicationsData] = useState(null);

  // Get Job Openings
  useState(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/job-openings`, {
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
        setJobOpeningsData(resJSON);
      })
      .catch((error) => {
        console.log(error);
      });

    // Get JOB Applications
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/job-applications`, {
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
        setJobApplicationsData(resJSON);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <Nav tabs className="py-4">
        <NavItem>
          <NavLink
            className="btn btn-outline-info border border-info mx-3"
            onClick={() => {
              toggle("1");
            }}
          >
            Job Openings
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="btn btn-outline-info border border-info mx-3"
            onClick={() => {
              toggle("2");
            }}
          >
            Job Applications
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className="btn btn-outline-info border border-info mx-3"
            onClick={() => {
              toggle("3");
            }}
          >
            Post a new job
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Container>
            {jobOpeningsData && <JobOpeningCard data={jobOpeningsData} />}
          </Container>
        </TabPane>
        <TabPane tabId="2">
          <Container>
            {jobApplicationsData && (
              <JobApplicantCard data={jobApplicationsData} />
            )}
          </Container>
        </TabPane>
        <TabPane tabId="3">
          <JobPostingForm />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Careers;
