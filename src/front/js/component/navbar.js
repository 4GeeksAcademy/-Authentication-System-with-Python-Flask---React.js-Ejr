import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
import { element } from "prop-types";

export const Navbar = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  const handleSignout = (event) => {
    actions.signOut();
    navigate("/");
  };

  return (
    <div className="col-2">
      <nav className="navbar m-2">
        <ul className="nav navbar-nav">
          <li className="nav-item cutesiefy">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          {store.token == "" ? (
            <li className="nav-item cutesiefy">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          ) : (
            <></>
          )}
          <li className="nav-item cutesiefy">
            <Link to="/about" className="nav-link">
              About Us
            </Link>
          </li>
          <li className="nav-item cutesiefy">
            <Link to="/donate" className="nav-link">
              Donate
            </Link>
          </li>
          <li className="nav-item cutesiefy">
            <Link to="/user" className="nav-link">
              User Page
            </Link>
          </li>
          {store.token !== "" ? (
            <li className="nav-item nav-link cutesiefy" onClick={handleSignout}>
              Sign Out
            </li>
          ) : (
            <></>
          )}
        </ul>
      </nav>
    </div>
  );
};
