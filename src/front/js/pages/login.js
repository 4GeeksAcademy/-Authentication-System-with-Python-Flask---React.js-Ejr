import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";

export const Login = () => {
  const [isShown, setIsShown] = useState(true);

  return (
    <div className="container-fluid">
      <div className="container align-items-center">
        <div className="row d-flex justify-content-center align-items-center m-auto mb-5 mt-5">
          <div className="col">
            <div className="card card-registration my-4 register mb-5">
              <div className="col-xl-12 mb-3">
                <div className="card-body p-md-5 text-black">
                  <h3 className="mb-5 ">Login</h3>
                  <form>
                    <div className="row">
                      <div className="col-md-12 mb-6">
                        <div className="form-outline">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label mt-2">Usuario</label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 mb-2 mt-3">
                        <div className="form-outline">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label mt-2">Contraseña</label>
                        </div>
                      </div>
                    </div>
                    {isShown == true ? (
                      <div className="row mt-3">
                        <button
                          type="submit"
                          className="btn btn-lg rounded-pill text-light "
                          id="btn_register"
                          onMouseEnter={() => setIsShown(false)}
                        >
                          Login
                        </button>
                      </div>
                    ) : (
                      <div className="row mt-3">
                        <button
                          type="submit"
                          className="btn btn-lg rounded-pill text-light "
                          id="btn_register2"
                          onMouseLeave={() => setIsShown(true)}
                        >
                          Login
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="custom-shape-divider-bottom-1659915776">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  match: PropTypes.object,
};
