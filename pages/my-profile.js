import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import Cookie from "js-cookie";
import AppContext from "../context/AppContext";

const Profile = () => {
  const { user } = useContext(AppContext);
  const appContext = useContext(AppContext);
  const router = useRouter();
  const [employeeProfile, setEmployeeProfile] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookie.get("token");
    if (!appContext.isAuthenticated) {
      router.push("/login");
    }

    if (user && token) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/employee-profiles?user.id=${user.id}`,
        {
          method: "get",
          headers: {
            Authorization: `Bearer ${Cookie.get("token")}`,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res.json();
        })
        .then((profile) => {
          profile[0].length !== 0 && setEmployeeProfile(profile[0]);
          setLoading(false);
        })
        .catch((error) => {
          if (error) {
            console.log(error);
          }
        });
    }
  }, [user]);

  const {
    Employee_Name,
    Designation,
    Blood_Group,
    DOB,
    Hire_Date,
    Department,
    Employee_ID,
    Gender,
    Home_Phone,
    Marital_Status,
    Mobile,
    Other_Email,
    Permanent_Address,
    Present_Address,
    Work_Email,
    Work_Phone,
  } = employeeProfile || {};

  return (
    <div className="container-fluid d-flex justify-conent-center flex-column">
      <h3 className="py-md-4 title-text">My Profile</h3>
      {isLoading && (
        <div className="py-3">
          <p className="text-center">Loading . . .</p>
        </div>
      )}
      {employeeProfile ? (
        <div className="row">
          <div className="col-lg-9 col-12 px-md-4 px-2 d-flex flex-column mx-auto justify-content-center">
            <div className="my-md-4 my-2">
              <div className="profile d-flex flex-column align-items-center justify-content-center">
                <img
                  src="./profile-picture.png"
                  className="rounded-circle avatar py-2"
                  alt="profile"
                />
                <h4>{Employee_Name}</h4>
                <p className="role">{Designation}</p>
              </div>
            </div>

            <div className="info-wrapper my-2 bg-white">
              <h5 className="p-3 info-header">Employment Details</h5>
              <div className="p-2 px-md-5">
                <table>
                  <tbody>
                    <tr>
                      <td className="border-0 py-2">Full Name</td>
                      <td className="border-0 py-2">
                        <strong>{Employee_Name}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0 py-2">Emp ID</td>
                      <td className="border-0 py-2">
                        <strong>{Employee_ID}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0 py-2">Hire Date</td>
                      <td className="border-0 py-2">
                        <strong>{Hire_Date}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0 py-2">Designation</td>
                      <td className="border-0 py-2">
                        <strong>{Designation}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0 py-2">Department</td>
                      <td className="border-0 py-2">
                        <strong>{Department}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            {/* Personal Details */}
            <div className="info-wrapper my-2 bg-white">
              <h5 className="p-3 info-header">Personal Details</h5>
              <div className="p-2 px-md-5">
                <table>
                  <tbody>
                    <tr>
                      <td className="border-0 py-2">Birth Date</td>
                      <td className="border-0 py-2">
                        <strong>{DOB}</strong>
                      </td>
                    </tr>

                    <tr>
                      <td className="border-0 py-2">Gender</td>
                      <td className="border-0 py-2">
                        <strong>{Gender}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0 py-2">Marital Status</td>
                      <td className="border-0 py-2">
                        <strong>{Marital_Status}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0 py-2">Blood Group</td>
                      <td className="border-0 py-2">
                        <strong>{Blood_Group}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Contact Details */}
            <div className="info-wrapper my-2 bg-white">
              <h5 className="p-md-3 p-2 info-header">Contact Details</h5>
              <div className="p-2 px-md-5">
                <table>
                  <tbody>
                    <tr>
                      <td className="border-0 py-2">Mobile</td>
                      <td className="border-0 py-2">
                        <strong>{Mobile}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0 py-2">Work Phone</td>
                      <td className="border-0 py-2">
                        <strong>{Work_Phone}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0 py-2">Home Phone</td>
                      <td className="border-0 py-2">
                        <strong>{Home_Phone}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0 py-2">Work Email</td>
                      <td className="border-0 py-2">
                        <strong>{Work_Email}</strong>
                      </td>
                    </tr>
                    <tr>
                      <td className="border-0 py-2">Other Email</td>
                      <td className="border-0 py-2">
                        <strong>{Other_Email}</strong>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="info-wrapper my-2 bg-white">
              <h5 className="p-md-3 p-2 info-header">Address Details</h5>
              <div className="px-md-5 p-2">
                <div className="row mt-md-3">
                  <div className="col-md-5">
                    <h6 className="text-primary py-2">Present Address</h6>
                    <address>{Present_Address}</address>
                  </div>
                  <div className="col-md-5">
                    <h6 className="text-primary py-2">Permanent Address</h6>
                    <address>{Permanent_Address}</address>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        !isLoading && (
          <div className="py-3">
            <p className="text-center">
              There is no profile information available
            </p>
          </div>
        )
      )}
      <style jsx>
        {`
          .avatar {
            max-width: 100px;
          }
          .info-wrapper {
            border: 1px solid #d7e8f4;
          }
          .info-header {
            background-color: #d7e8f4;
          }
          .info-wrapper tr strong {
            margin-left: 5rem;
          }
        `}
      </style>
    </div>
  );
};

export default Profile;
