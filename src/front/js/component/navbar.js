import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

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
          onClick={handleNavCollapse}
          aria-controls="navbarNav"
          aria-expanded={!isNavCollapsed}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
              <Link
                to="/"
                className="nav-link m-2"
                onClick={handleNavCollapse}
              >
                Home
              </Link>
            </li>
            <li className="nav-item m-2">
              <Link
                to="/bookappointment"
                className="nav-link"
                onClick={handleNavCollapse}
              >
                Book an Appointment
              </Link>
            </li>
            <li className="nav-item m-2">
              <Link
                to="/contact"
                className="nav-link"
                onClick={handleNavCollapse}
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
                    onClick={handleNavCollapse}
                  >
                    Login
                  </Link>
                </li>
                <li className="nav-item m-2">
                  <Link
                    to="/signup"
                    className="btn btn-primary"
                    onClick={handleNavCollapse}
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
                    onClick={handleNavCollapse}
                  >
                    Profile
                  </Link>
                </li>
                <li className="nav-item m-2">
                  <Link
                    to="/appointments"
                    className="btn btn-secondary"
                    onClick={handleNavCollapse}
                  >
                    Appointment History
                  </Link>
                </li>
                <li className="nav-item m-2">
                  <Link
                    to="/logout"
                    className="btn btn-primary"
                    onClick={handleNavCollapse}
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
                    onClick={handleNavCollapse}
                  >
                    Appointment History
                  </Link>
                </li>
                <li className="nav-item m-2">
                  <Link
                    to="/logout"
                    className="btn btn-primary"
                    onClick={handleNavCollapse}
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
                    onClick={handleNavCollapse}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item m-2">
                  <Link
                    to="/appointments"
                    className="btn btn-secondary"
                    onClick={handleNavCollapse}
                  >
                    Appointment History
                  </Link>
                </li>
                <li className="nav-item m-2">
                  <Link
                    to="/logout"
                    className="btn btn-primary"
                    onClick={handleNavCollapse}
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
