import React from "react";
import UserProfile from "../component/UserProfile";
import UserAppointments from "../component/UserAppointments";
import UserCars from "../component/UserCars";
import "../../styles/userdashboard.css";

const UserDashboard = () => {
  return (
    <div className="container py-4">
      <div className="d-flex flex-column user-dashboard">
        <h1>User Dashboard</h1>
        <UserProfile />
        <UserAppointments />
        <UserCars />
      </div>
    </div>
  );
};

export default UserDashboard;
