import React from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import Shape from "../component/shape";

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

        <Shape />
      </div>
    </div>
  );
};

Login.propTypes = {
  match: PropTypes.object,
};
