import React, { useState } from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
} from "reactstrap";
import JobOpeningCard from "../components/careersPage/JobOpeningCard";
import JobApplicantCard from "../components/careersPage/JobApplicantCard";
import JobPostingForm from "../components/careersPage/JobPostingForm";

const Careers = () => {
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  return (
    <div>
      <Nav tabs className="py-4">
        <NavItem>
          <NavLink
            className={{ active: activeTab === "1" }}
            onClick={() => {
              toggle("1");
            }}
          >
            Job Openings
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={{ active: activeTab === "2" }}
            onClick={() => {
              toggle("2");
            }}
          >
            Job Applications
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={{ active: activeTab === "3" }}
            onClick={() => {
              toggle("3");
            }}
          >
            Post a new jOb
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <JobOpeningCard />
        </TabPane>
        <TabPane tabId="2">
          <JobApplicantCard />
        </TabPane>
        <TabPane tabId="3">
          <JobPostingForm />
        </TabPane>
      </TabContent>
    </div>
  );
};

export default Careers;
