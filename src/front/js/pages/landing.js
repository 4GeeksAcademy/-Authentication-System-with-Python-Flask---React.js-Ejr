import React, { useContext } from "react";
import { Navbar } from "../component/navbar";
import "../../styles/landing.css";

import { Context } from "../store/appContext";
import { Footer } from "../component/footer";

export const Landing = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <Navbar />
      <div id="landing">
        <div className="landing-content">
          <div className="text-container">
            <h1 className="landing-title">
              Expert dog <br /> walking service
            </h1>
            <h4 className="landin-description">
              Exploring with a dog <br />
              Discovering beauty in every step.
            </h4>
          </div>
          <div className="buttons-container">
            <button className="btn-carrusel"></button>
            <button className="btn-carrusel"></button>
            <button className="btn-carrusel"></button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
