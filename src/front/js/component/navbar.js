import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const navigate = useNavigate();

  const userRole = null; // Placeholder: replace with actual user role check ('client', 'mechanic', 'admin')

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          AutoAgenda
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
              <Link
                to="/"
                className="nav-link m-2"
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
              >
                Home
              </Link>
            </li>
            <li className="nav-item m-2">
              <Link
                to="/bookappointment"
                className="nav-link"
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
              >
                Book an Appointment
              </Link>
            </li>
            <li className="nav-item m-2">
              <Link
                to="/contact"
                className="nav-link"
                data-bs-toggle="collapse"
                data-bs-target=".navbar-collapse.show"
              >
                Contact
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto">
            {userRole === null && (
              <>
                <li className="nav-item m-2">
                  <Link
                    to="/login"
                    className="btn btn-primary"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item m-2">
                  <Link
                    to="/signup"
                    className="btn btn-primary"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Signup
                  </Link>
                </li>
              </>
            )}
            {userRole === "client" && (
              <>
                <li className="nav-item m-2">
                  <Link
                    to="/userprofile"
                    className="btn btn-secondary"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Profile
                  </Link>
                </li>
                <li className="nav-item m-2">
                  <Link
                    to="/appointments"
                    className="btn btn-secondary"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Appointment History
                  </Link>
                </li>
                <li className="nav-item m-2">
                  <Link
                    to="/logout"
                    className="btn btn-primary"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
            {userRole === "mechanic" && (
              <>
                <li className="nav-item m-2">
                  <Link
                    to="/appointments"
                    className="btn btn-secondary"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Appointment History
                  </Link>
                </li>
                <li className="nav-item m-2">
                  <Link
                    to="/logout"
                    className="btn btn-primary"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
            {userRole === "admin" && (
              <>
                <li className="nav-item m-2">
                  <Link
                    to="/admindashboard"
                    className="btn btn-secondary"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item m-2">
                  <Link
                    to="/appointments"
                    className="btn btn-secondary"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Appointment History
                  </Link>
                </li>
                <li className="nav-item m-2">
                  <Link
                    to="/logout"
                    className="btn btn-primary"
                    data-bs-toggle="collapse"
                    data-bs-target=".navbar-collapse.show"
                  >
                    Logout
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
