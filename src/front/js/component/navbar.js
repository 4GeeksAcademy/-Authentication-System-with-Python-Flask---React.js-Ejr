import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">Investor</span>
        </Link>
        <Link to="/company_register">
          <button className="btn btn-success">Empresas</button>
        </Link>
        <div className="ml-auto">
          <Link to="/register">
            <button className="btn btn-success mx-5">Registrate</button>
          </Link>
          <Link to="/login">
            <button className="btn btn-success">Ingresa</button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
