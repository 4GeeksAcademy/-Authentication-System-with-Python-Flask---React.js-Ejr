import React, { useState } from "react";
import logoDetail from "../../../../assets/logo_detail.png";
import calendarBox from "../../../../assets/calendar_box.png";
import "./styles.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <main className="mainContainer">
      <header>
        <h1 className="logoTitle">Booking Manager.</h1>
        <span className="logoSubtitle">
          A complete booking management software that allows your business to
          manage their bookings effectively.
        </span>
        <img src={logoDetail} alt="purple square design used as logo" />
      </header>
      <section>
        <div className="btn">
          <Link to={"/register"}>
            <button type="button" className="boxShadow">
              Login
            </button>
          </Link>
          <Link to={"/register"}>
            <p className="btnregister">
              Don’t have an account yet? Register here!
            </p>
          </Link>
        </div>
        <div className="imagencalendar">
          <img className="calendar" src={calendarBox} alt="calendar agenda" />
        </div>
        <div className="bgImg"></div>
      </section>
    </main>
  );
};
export default HomePage;
