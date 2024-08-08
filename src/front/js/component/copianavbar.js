import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoAutoAgenda from "../../img/autoagendalogo1080.png";
import "../../styles/navbar.css";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const handleLogout = () => {
    actions.logout();
    handleNavCollapse();
    navigate("/login");
  };

  const userRole = null; // Placeholder: replace with actual user role check ('client', 'mechanic', 'admin')

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img
            src={logoAutoAgenda}
            className="mr-3 h-6 sm:h-9"
            alt="AutoAgenda Logo"
          />
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
        <div
          className={`${isNavCollapsed ? "collapse" : ""} navbar-collapse`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={handleNavCollapse}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              {userRole === null && (
                <Link
                  to="/bookappointment"
                  className="nav-link"
                  onClick={handleNavCollapse}
                >
                  Book an Appointment
                </Link>
              )}
              {userRole === "client" && (
                <Link
                  to="/createappointmentregistereduser"
                  className="nav-link"
                  onClick={handleNavCollapse}
                >
                  Create New Appointment
                </Link>
              )}
            </li>
            <li className="nav-item">
              <Link
                to="/contact"
                className="nav-link"
                onClick={handleNavCollapse}
              >
                Contact
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {userRole === null && (
              <>
                <Link
                  to="/login"
                  className="btn btn-primary me-2"
                  onClick={handleNavCollapse}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="btn btn-primary"
                  onClick={handleNavCollapse}
                >
                  Signup
                </Link>
              </>
            )}
            {userRole === "client" && (
              <>
                <Link
                  to="/userdashboard"
                  className="btn btn-secondary me-2"
                  onClick={handleNavCollapse}
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-primary">
                  Logout
                </button>
                <div className="row">
                  <div className="profile-header-container">
                    <div className="role-label-container">
                      <span className="label label-default role-label">
                        Client
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
            {userRole === "mechanic" && (
              <>
                <Link
                  to="/mechanicdashboard"
                  className="btn btn-secondary me-2"
                  onClick={handleNavCollapse}
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-primary">
                  Logout
                </button>
                <div className="row">
                  <div className="profile-header-container">
                    <div className="role-label-container">
                      <span className="label label-default role-label">
                        Mechanic
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
            {userRole === "admin" && (
              <>
                <Link
                  to="/admindashboard"
                  className="btn btn-secondary me-2"
                  onClick={handleNavCollapse}
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn btn-primary">
                  Logout
                </button>
                <div className="row">
                  <div className="profile-header-container">
                    <div className="role-label-container">
                      <span className="label label-default role-label">
                        Admin
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
