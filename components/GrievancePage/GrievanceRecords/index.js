import React from "react";
import { Container } from "reactstrap";
import GrievanceRecordCard from "../GrievanceRecordCard";

const GrievanceRecords = ({ grievanceHistoryData }) => {
  console.log(grievanceHistoryData);
  return (
    <Container className="py-5">
      <h2 className="title-text-2 text-center py-3">Grievance History</h2>
      {grievanceHistoryData &&
        grievanceHistoryData.map((data) => {
          return <GrievanceRecordCard data={data} key={data.id} />;
        })}
    </Container>
  );
};

export default GrievanceRecords;
