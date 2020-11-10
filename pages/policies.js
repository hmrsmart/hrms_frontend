import React from "react";
import Link from "next/link";
import { Container } from "reactstrap";

function Policies() {
  return (
    <Container fluid className="py-4">
      <h4 className="py-4 title-text">ZYCLYX Policies </h4>
      <ul className="policies">
        <li className="py-2">
          <Link href="./employee_handbook">
            <a>
              <i className="fas fa-file-signature mr-2 text-primary" />
              Employee Handbook
            </a>
          </Link>
        </li>
        <li className="py-2">
          <Link href="./code_of_conduct">
            <a>
              <i className="fas fa-file-signature mr-2 text-primary" />
              Code of Conduct Policy
            </a>
          </Link>
        </li>
      </ul>

      <style jsx>{`
        .policies li {
          list-style-type: none;
          font-size: 1.3rem;
        }
      `}</style>
    </Container>
  );
}

export default Policies;
