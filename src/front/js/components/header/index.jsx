import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import Logotipo from "../logotipo/index.jsx";
import Avatar from "../avatar/index.jsx";

const Header = ({ imgProfile, settings, settingsTitle, updateProfile }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("token/role/company_id");
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleDashboard = () => {
    const localStorageData = JSON.parse(
      localStorage.getItem("token/role/company_id")
    );

    if (localStorageData.role === "admin")
      navigate(`/admin-dashboard/${localStorageData.company_id}`);
    if (localStorageData.role === "client") navigate("/user-dashboard");
    if (localStorageData.role === "worker")
      navigate(`/worker-dashboard/${localStorageData.company_id}`);
  };

  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem("token/role/company_id")
    );
    console.log(localStorageData); 
    localStorageData.role === "admin" && setIsAdmin(true);
  }, [isAdmin]);

  return (
    <header className={styles._headerContainer}>
      <div className={styles._contentContainer}>
        <Logotipo />
        <nav className={styles._navContainer}>
          <button onClick={() => handleDashboard()} className={styles._btn}>
            <span>Dashboard</span>
          </button>
          {isAdmin ? (
            <button
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
              className={`navbar-toggler ${styles._btn}`}
            >
              <i className="fa-solid fa-gear navbar-toggler-icon"></i>
            </button>
          ) : null}
          <button onClick={() => handleLogOut()} className={styles._btn}>
            <i className="fa-solid fa-arrow-right-from-bracket" />
          </button>

          <Avatar
            url={imgProfile}
            alt="User profile img"
            onClick={updateProfile}
          />
        </nav>
      </div>
      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
            {settingsTitle}
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">{settings}</div>
      </div>
    </header>
  );
};

export default Header;
