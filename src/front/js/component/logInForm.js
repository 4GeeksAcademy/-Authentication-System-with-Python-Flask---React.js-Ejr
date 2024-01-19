import React from "react";
import { Link } from "react-router-dom";

export const LoginForm = () => {
  return (
    <div className="container-full py-5 h-100 grey-background">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card shadow-2-strong" style={{ borderRadius: "1rem" }}>
            <div className="card-body p-5 text-center">
              <h3 className="mb-5">Sign in</h3>

              <div className="form-outline mb-4">
                <input
                  type="email"
                  id="typeEmailX-2"
                  className="form-control form-control-lg"
                />
                <label className="form-label" htmlFor="typeEmailX-2">
                  Email
                </label>
              </div>

              <div className="form-outline mb-4">
                <input
                  type="password"
                  id="typePasswordX-2"
                  className="form-control form-control-lg"
                />
                <label className="form-label" htmlFor="typePasswordX-2">
                  Password
                </label>
              </div>

            
              <div className="form-check d-flex justify-content-start mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="form1Example3"
                />
                <label className="form-check-label" htmlFor="form1Example3">
                  Remember password
                </label>
              </div>

              <button
                className="btn btn-primary custom-btn btn-lg btn-block"
                type="submit"
              >
                Login
              </button>

              <hr className="my-4" />

                <div>
                    <p>Don't have an account? Sign up now!</p>

                    <button
                        className="btn btn-primary custom-btn btn-lg btn-block"
                        type="submit"
                    >
                        Register
                    </button>
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
