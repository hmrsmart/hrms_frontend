import React from "react";
import { Container } from "reactstrap";

const InquiriesTableExpandableComponent = ({ data }) => {
  return (
    <Container>
      <div className="py-2">
        <p className="text-muted">
          <small>Message</small>
        </p>
        <p>
          <small>{data.Message}</small>
        </p>
      </div>
      <p>
        <small className="text-muted">
          From <span className="text-dark">{data.Website}</span> Website
        </small>
      </p>
    </Container>
  );
};

export default InquiriesTableExpandableComponent;
