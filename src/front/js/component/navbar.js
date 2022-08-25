import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Logout } from "./logout";
export const Navbar = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">React Boilerplate</span>
        </Link>

        {store.token ? (
          <div className="ml-auto">
            <Logout />
          </div>
        ) : (
          <div className="ml-auto">
            <Link to="/login">
              <a href="#" className="btn btn-success">
                Login
              </a>
            </Link>
            <Link to="/signup">
              <a href="#" className="btn btn-outline-success">
                Signup
              </a>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
