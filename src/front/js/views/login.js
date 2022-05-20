import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";

export const LoginScreen = () => {



  return (
    <div id="login my-5">
      <div className="container my-5">
        <div
          id="login-row"
          className="row justify-content-center align-items-center"
        >
          <div id="login-column" className="col-md-6">
            <div id="login-box" className="col-md-12">
              <form id="login-form" className="form">
                <h3 className="text-center text-info">Login</h3>
                <div className="form-group">
                  <label for="email" className="text-info">
                   Email:
                  </label>
                  <br />
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label for="password" className="text-info">
                    Contraseña:
                  </label>
                  <br />
                  <input
                    type="text"
                    name="password"
                    id="password"
                    className="form-control"
                  />
                </div>
                <br />
                <div className="form-group">
                  <Link to="/user_home">
                    <button
                      type="submit"
                      name="submit"
                      className="btn btn-info btn-md"
                      value="submit"
                    >
                      Entrar
                    </button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
