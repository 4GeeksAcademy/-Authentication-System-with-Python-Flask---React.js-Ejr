import React from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";

const Login = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 mt-5">
          <div className="card">
            <div className="card-body">
              <Context.Consumer>
                {({ store, actions }) => {
                  return (
                    <form>
                      <div className="form-group">
                        <label>Mail</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Ingresar mail"
                        />
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                        />
                      </div>
                      <div className="form-group form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="exampleCheck1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="exampleCheck1">
                          Check me out
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary btn-block">
                        Confirmar
                      </button>
                    </form>
                  );
                }}
              </Context.Consumer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;