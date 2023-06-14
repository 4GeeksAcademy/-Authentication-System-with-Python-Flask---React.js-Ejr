import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/button/index.jsx";
import { bgImg } from "../../../../assets/assets.jsx";

import styles from "./home.module.css";

const HomePage = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const localStorageData = JSON.parse(
      localStorage.getItem("token/role/company_id")
    );
    localStorageData && setIsSignedIn(true);
  }, [isSignedIn]);

  const handleDashboard = () => {
    const data = JSON.parse(localStorage.getItem("token/role/company_id"));

    if (data.role === "admin") navigate(`/admin-dashboard/${data.company_id}`);
    if (data.role === "client") navigate("/user-dashboard");
    if (data.role === "worker")
      navigate(`/worker-dashboard/${data.company_id}`);
  };

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
              {isSignedIn ? (
                <div className={styles._loginWrapper}>
                  <Button
                    type="button"
                    title="Dashboard"
                    onClick={() => handleDashboard()}
                  />
                </div>
              ) : (
                <>
                  <Link to={"/user-register"}>
                    <p className={styles._registerLink}>Sign Up</p>
                  </Link>
                  <div className={styles._loginWrapper}>
                    <Button title="Login" onClick={() => navigate("/login")} />
                  </div>
                </>
              )}
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
