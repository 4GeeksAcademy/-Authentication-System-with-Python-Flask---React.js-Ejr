import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/index.jsx";
import bgImg from "../../../../assets/bgImg.jpeg";
import styles from "./home.module.css";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <main className={styles._mainContainer}>
      <section className={styles._sectionContainer}>
        <img
          className={styles._bgImg}
          src={bgImg}
          alt="Woman booking a service in your computer"
        />
        <div className={styles._actionContainer}>
          <div className={styles._headerContainer}>
            <div className={styles._nav}>
              <Link to={"/user-register"}>
                <p className={styles._registerLink}>Sign Up</p>
              </Link>
              <div className={styles._loginWrapper}>
                <Button title="Login" onClick={() => navigate("/login")} />
              </div>
            </div>
          </div>
          <h1 className={styles._heading}>Booking Manager.</h1>
          <p className={styles._subHeading}>
            A complete booking management software that allows your business to
            manage their bookings effectively.
          </p>
          <div className={styles._buttonsWrapper}>
            <Button
              type="button"
              title="Companies List"
              onClick={() => navigate("/companies-list")}
            />
            <Link to={"/company-register"}>
              <p className={styles._registerLink}>
                Register your company here!
              </p>
            </Link>
          </div>
          <span className={styles._credits}>
            Photo by Andrew Neel on Unsplash
          </span>
          <span className={`${styles._line} _gradient1`}></span>
        </div>
      </section>
    </main>
  );
};
export default HomePage;
