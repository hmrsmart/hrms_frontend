import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import AppContext from "../context/AppContext";

function Home() {
  const { user } = useContext(AppContext);
  const appContext = useContext(AppContext);

  const router = useRouter();
  useEffect(() => {
    if (!appContext.isAuthenticated) {
      router.push("/login"); // redirect if user not logged in
    }
  }, [user]);

  return (
    <div className="container-fluid d-flex justify-conent-center flex-column">
      {user && (
        <div>
          <h4 className="pt-4 user-title">
            Hello <strong> {user && user.username}</strong>
          </h4>
        </div>
      )}
    </div>
  );
}

export default Home;
