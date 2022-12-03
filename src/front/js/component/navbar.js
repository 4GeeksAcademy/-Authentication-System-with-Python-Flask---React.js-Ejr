import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { element } from "prop-types";

export const Navbar = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const handleSignout = (event) => {
    actions.verifyUser("no");
    console.log(store.verifyUser);
  };

  return (
    <div className="col-1">
      <nav className="navbar bg-light m-2 shadow-lg">
        <ul className="nav navbar-nav px-3">
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/donate" className="nav-link">
              Donate
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user" className="nav-link">
              User Page
            </Link>
          </li>
          <li className="nav-item nav-link" onClick={handleSignout}>
            Sign Out
          </li>
        </ul>
      </nav>
    </div>
  );
};
