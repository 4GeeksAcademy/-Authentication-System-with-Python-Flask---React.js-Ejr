import React, { useState } from "react";
import calendarBox from "../../../../assets/calendar_box.png";
import { Link } from "react-router-dom";
import Header from "../../components/header/index.jsx";
import "./styles.css";

const HomePage = () => {
  return (
    <main className="mainContainer">
      <Header />
      <section>
        <div className="btnWrapper">
          <Link to={"/login"}>
            <button type="button" className="loginBtn boxShadow">
              Login
            </button>
          </Link>
          <Link to={"/user-register"}>
            <p className="registerLink">
              Don’t have an account yet? Register here!
            </p>
          </Link>
          <Link to={"/company-register"}>
            <p className="registerLink">Register your company here!</p>
          </Link>
        </div>
        <div className="calendarWrapper">
          <img
            className="calendar"
            src={calendarBox}
            alt="Purple calendar image with a schedule of worker"
          />
        </div>
        <div className="bgImg"></div>
      </section>
    </main>
  );
};
export default HomePage;
