import React from "react";
import logo from "../../../../assets/logotipo-detail.png";
import { Link } from "react-router-dom";
import styles from "./logotipo.module.css";

const Logotipo = () => (
  <Link to="/">
    <div className={styles._logoContainer}>
      <img src={logo} alt="Double blue squares design used as logo" />
      <span className={styles._logoText}>Booking Manager.</span>
    </div>
  </Link>
);

export default Logotipo;
