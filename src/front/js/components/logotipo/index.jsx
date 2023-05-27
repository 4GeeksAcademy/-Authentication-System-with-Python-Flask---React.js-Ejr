import React from "react";
import logo from "../../../../assets/logotipo-detail.png";
import { Link } from "react-router-dom";
import "./styles.css";

const Logotipo = ({ ...rest }) => (
  <Link to="/">
    <div id="logo-container" {...rest}>
      <img src={logo} alt="Double purple squares design used as logo" />
      <span>Booking Manager.</span>
    </div>
  </Link>
);

export default Logotipo;
