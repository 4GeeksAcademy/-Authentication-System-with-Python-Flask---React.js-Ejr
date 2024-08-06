import React, { useState } from "react";
import UserList from "../component/UserList";
import SettingModal from "../component/SettingModal";
import iconUser from "../../img/icons/icon-user.png";
import iconComments from "../../img/icons/icon-comments.png";
import iconConnect from "../../img/icons/icon-connect.png";
import iconFavorites from "../../img/icons/icon-favorites.png";
import iconBriefcase from "../../img/icons/icon-briefcase.png";
import "../../styles/admindashboard.css";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container py-5">
      <div className="d-flex flex-column dashboard">
        <h1>Admin Dashboard</h1>
        <div className="stats row">
          <div className="stat1 col mx-2">
            <img src={iconUser} alt="Total Clients"/>
            <h3>Total Clients</h3>
            <p>10</p>
          </div>
          <div className="stat2 col mx-2">
            <img src={iconComments} alt="Total Appointments"/>
            <h3>Total Appointments</h3>
            <p>20</p>
          </div>
          <div className="stat3 col mx-2">
            <img src={iconBriefcase} alt="Total Services"/>
            <h3>Total Services</h3>
            <p>5</p>
          </div>
          <div className="stat4 col mx-2">
            <img src={iconFavorites} alt="Total Cars"/>
            <h3>Total Cars</h3>
            <p>15</p>
          </div>
          <div className="stat5 col mx-2">
            <img src={iconConnect} alt="Settings"/>
            <h3>Settings</h3>
            <p>Max Appointments per Hour: 4</p>
            <button className="btn btn-secondary btnSetting" onClick={handleModalOpen}>
              Edit
            </button>
          </div>
        </div>
      </div>
      <UserList />
      {isModalOpen && <SettingModal onClose={handleModalClose} />}
    </div>
  );
};

export default AdminDashboard;
