import React from "react";
import logo from "../../../../assets/logotipo-detail.png";
import "./styles.css";

const Logotipo = ({ ...rest }) => (
  <div id="logo-container" {...rest}>
    <img src={logo} alt="Double purple squares design used as logo" />
    <span>Booking Manager.</span>
  </div>
);

export default Logotipo;
