import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const About = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="text-center col-6 my-5">
      <h1>Welcome to the about page :)</h1>
    </div>
  );
};
