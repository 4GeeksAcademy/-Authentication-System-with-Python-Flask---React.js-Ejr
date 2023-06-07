import React from "react";
import abueloslogin from "../../img/abueloslogin.png";
import "../../styles/login.css";

export const LoginForm = () => {
  return (
    <div className="container">
      <div className="container-form">
        <div className="row">
          <form className="container-login-fom col-md-6">
            <div className="login-title mt-5 mb-5">
              <h2>Accede</h2>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="inputEmail" className="form-label">
                    <h5>Email</h5>
                  </label>
                  <input type="email" className="form-control" id="inputEmail" />
                </div>
              </div>
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="inputPassword" className="form-label">
                    <h5>Contraseña</h5>
                  </label>
                  <input type="password" className="form-control" id="inputPassword" />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 mt-5">
                <div className="recoverpassword">
                  <a href="/recoverpassword">
                    <h5>Olvidaste tu contraseña</h5>
                  </a>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 mt-5">
                <div className="login-botton">
                  <button type="submit" className="btn btn-primary">
                    <h5>Log in</h5>
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="col-md-6">
            <img src={abueloslogin} alt="Abuelos Login" />
          </div>
        </div>
      </div>
    </div>
  );
};
