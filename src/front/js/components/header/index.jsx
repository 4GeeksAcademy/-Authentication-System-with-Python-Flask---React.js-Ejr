import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import Logotipo from "../logotipo/index.jsx";
import Modal from "../modal/index.jsx";
import Avatar from "../avatar/index.jsx";

const Header = ({ imgProfile, settings, settingsTitle, updateProfile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token/role/company_id");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleDashboard = () => {
    const data = JSON.parse(localStorage.getItem("token/role/company_id"));

    if (data.role === "admin") navigate(`/admin-dashboard/${data.company_id}`);
    if (data.role === "client") navigate("/user-dashboard");
    if (data.role === "worker")
      navigate(`/worker-dashboard/${data.company_id}`);
  };

  return (
    <header className={styles._headerContainer}>
      <div className={styles._contentContainer}>
        <Logotipo />
        <nav className={styles._navContainer}>
          <button onClick={() => handleDashboard()} className={styles._btn}>
            <span>Dashboard</span>
          </button>
          <button onClick={() => setIsOpen(true)} className={styles._btn}>
            <i className="fa-solid fa-gear"></i>
          </button>
          <button onClick={() => handleLogOut()} className={styles._btn}>
            <i className="fa-solid fa-arrow-right-from-bracket" />
          </button>

          <Avatar
            url={imgProfile}
            alt="User profile img"
            onClick={updateProfile}
          />

          {/* <img
            className={`${styles._userProfileImg} _boxShadow`}
            src={avatar}
            alt="User profile img"
            onClick={updateProfile}
          /> */}
        </nav>
      </div>
      <Modal
        title={settingsTitle}
        isOpen={isOpen}
        close={() => setIsOpen(false)}
      >
        {settings}
      </Modal>
    </header>
  );
};

export default Header;
