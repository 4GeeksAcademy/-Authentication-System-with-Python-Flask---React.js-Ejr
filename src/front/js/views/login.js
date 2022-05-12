import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";

export const LoginScreen = () => {
  return (
    <div id="login my-5">
      <div class="container my-5">
        <div
          id="login-row"
          class="row justify-content-center align-items-center"
        >
          <div id="login-column" class="col-md-6">
            <div id="login-box" class="col-md-12">
              <form id="login-form" class="form">
                <h3 class="text-center text-info">Login</h3>
                <div class="form-group">
                  <label for="username" class="text-info">
                    Nombre:
                  </label>
                  <br />
                  <input
                    type="text"
                    name="username"
                    id="username"
                    class="form-control"
                  />
                </div>
                <div class="form-group">
                  <label for="password" class="text-info">
                    Contraseña:
                  </label>
                  <br />
                  <input
                    type="text"
                    name="password"
                    id="password"
                    class="form-control"
                  />
                </div>
                <br />
                <div class="form-group">
                  <Link to="/userhome">
                    <button
                      type="submit"
                      name="submit"
                      class="btn btn-info btn-md"
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
