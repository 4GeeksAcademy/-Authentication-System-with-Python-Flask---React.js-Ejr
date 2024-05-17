import React from "react";

import "./../../../styles/Landing-styles/mainView.css";
import { SignUp } from "./SignUp.jsx";
import About from "./about.jsx";
import Services from "./services.jsx";

const MainView = () => {
  return (
    <>
      <div className="main-view-container">
        <article className="text-container background-slider">
          <div className="left-text-container">
            <h2>
              <span className="green-text">FREE</span> YOUR BODY
            </h2>
          </div>
          <div className="right-text-container">
            <h2>
              GET FIT WITH <span className="green-text">MKJ</span>
            </h2>
            <SignUp />
          </div>
        </article>
      </div>
      <section className="about-container">
        <About />
      </section>
      <section>
        <Services />
      </section>
    </>
  );
};

export default MainView;
