import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./navbar.module.css";
import Logotipo from "../logotipo/index.jsx";
import avatar from "../../../../assets/avatar.png";

const Navbar = () => {
  const navigate = useNavigate();
  const handlesubmit = () => {
    navigate("/");
  };
  return (
    <header className={styles._headerContainer}>
      <div className={styles._contentContainer}>
        <Logotipo />
        <nav className={styles._navContainer}>
          <Link to="/">
            <span>Dashboard</span>
          </Link>
          <Link to="/">
            <i className="fa-solid fa-gear"></i>
          </Link>
          <Link to="/">
            <i className="fa-solid fa-arrow-right-from-bracket" />
          </Link>

          <img
            className={`${styles._userProfileImg} _boxShadow`}
            src={avatar}
            alt="User profile img"
            onClick={handlesubmit}
          />
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
