import React, { useContext, useEffect, useState } from "react";
import UserProfile from "../component/UserProfile";
import UserAppointments from "../component/UserAppointments";
import UserCars from "../component/UserCars";
import { Context } from '../store/appContext';
import "../../styles/userdashboard.css";

const UserDashboard = () => {
  const { store, actions } = useContext(Context);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const roleId = localStorage.getItem("role_id");
    setHasAccess(!!token && roleId === "3");
  }, [store.token, localStorage.token]);

  return (
    <div className="container py-4">
      <div className="d-flex flex-column user-dashboard">
        <h1>User Dashboard</h1>
        {!hasAccess ? (
        <div className="card p-5">
          <div className="card-body mx-auto">
            <h2 className="card-title">You do not have access to this section</h2>
            <p className="card-text mt-3">
              You must log in as a registered user to view the content of this page.
            </p>
          </div>
        </div>
      ) : (
        <>
        <UserProfile />
        <UserAppointments />
        <UserCars />
        </>
      )}
      </div>
    </div>
  );
};

export default UserDashboard;
