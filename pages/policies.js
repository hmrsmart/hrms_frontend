import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container } from "reactstrap";
import Cookie from "js-cookie";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";

function Policies() {
  const token = Cookie.get("token");
  const appContext = useContext(AppContext);
  const router = useRouter();
  const { user } = useContext(AppContext);
  const [policiesData, setPoliciesData] = useState([]);

  useEffect(() => {
    if (!appContext.isAuthenticated) {
      router.push("/login");
    }
    if (token && user) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/policies`, {
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
          setPoliciesData(resJSON);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  return (
    <Container fluid className="py-4">
      <h4 className="py-4 title-text">ZYCLYX Policies </h4>
      <ul className="policies">
        {policiesData.length !== 0 &&
          policiesData.map((policy) => {
            return (
              <li className="py-2">
                <Link
                  href={{
                    pathname: "policy_preview",
                    query: { id: policy.id },
                  }}
                >
                  <a>
                    <FontAwesomeIcon
                      icon={["fas", "file-signature"]}
                      className="mr-2 text-primary"
                    />
                    {policy.Policy_Name}
                  </a>
                </Link>
              </li>
            );
          })}
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
