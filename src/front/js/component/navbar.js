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
          {!store.verifiedUser ? (
            <li className="nav-item cutesiefy">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          ) : (
            <></>
          )}
          {!store.verifiedUser ? (
            <li className="nav-item cutesiefy big">
              <Link to="/create" className="nav-link">
                Create account
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
          {store.verifiedUser ? (
            <li className="nav-item cutesiefy big">
              <Link to="/user" className="nav-link">
                Personal Portal
              </Link>
            </li>
          ) : (
            <></>
          )}
          {store.verifiedUser ? (
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
