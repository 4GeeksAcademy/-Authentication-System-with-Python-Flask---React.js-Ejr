import { Link } from "react-router-dom";
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import logoUp from "../../img/logoUp.jpg";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  const handleClick = async () => {
    await actions.backHome();
    actions.fillLocalStorage();
  };

  return (
    <nav className="navbar navbar-dark bg-dark mb-2">
      <div className="container">
        <Link to="/" className="text-decoration-none">
          <span onClick={handleClick} className="mb-0 display-6 text-white ">
            LUXURY ESTATE
          </span>
        </Link>
        <div className="ml-auto">
          <Link to="/demo">
            <button className="btn btn-primary">
              Check the Context in action
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
