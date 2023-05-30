import React from "react";
import logoDetail from "../../../../assets/logo_detail.png";
import { Link } from "react-router-dom";
import "./styles.css";

const Header = () => (
  <div className="header">
    <Link to="/" className="link">
      <h1 className="logoTitle">Booking Manager.</h1>
    </Link>
    <span className="logoSubtitle">
      A complete booking management software that allows your business to manage
      their bookings effectively.
    </span>
    <img src={logoDetail} alt="purple square design used as logo" />
  </div>
);

export default Header;
