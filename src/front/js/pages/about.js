import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";

import "../../styles/about.css";

export const About = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center mt-5">
      <h1>ABOUT</h1>
    </div>
  );
};
