import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { Logout } from "./logout";
export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Luxury Estate</span>
        </Link>

        {store.token ? (
          <div>
            <Link to={`/user/${localStorage.getItem("id")}`}>
              <img
                src={process.env.DEFAULT_PROFILE_PIC}
                className="mt-5 img-fluid"
                style={{
                  height: "50px",
                  top: "3rem",
                  border: "solid 5px gray",
                  borderRadius: "50%",
                }}
              />
            </Link>
            <Logout />
          </div>
        ) : (
          <div className="ms-auto">
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
