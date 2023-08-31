import React, { useContext } from "react";
import { Navbar } from "../component/navbar";
import "../../styles/landing.css";

import { Context } from "../store/appContext";

export const Landing = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <Navbar />
      <div className="container">
        <div id="landing-wrap">
          <h1>
            Expert dog <br /> walking service
          </h1>
          <h4>
            Exploring with a dog: <br />
            Discovering beauty in every step.
          </h4>
        </div>
      </div>
    </>
  );
};
