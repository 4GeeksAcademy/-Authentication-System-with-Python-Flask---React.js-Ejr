import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const CompanyDashboard = () => {
  return (
    <div className="container my-5">
      <form>
        <div className="card-group">
          <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title"> Nombre Proyecto </h5>
              <p className="card-text">
                Características del Proyecto.
              </p>
              <p className="card-text">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic checkbox toggle button group"
                >
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btncheck1"
                    autoComplete="off"
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btncheck1"
                  >
                    Checkbox 1
                  </label>
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btncheck2"
                    autoComplete="off"
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btncheck2"
                  >
                    Checkbox 2
                  </label>
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btncheck3"
                    autoComplete="off"
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btncheck3"
                  >
                    Checkbox 3
                  </label>
                </div>
              </p>
            </div>
          </div>
          <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title"> Nombre Proyecto </h5>
              <p className="card-text">
                Características del Proyecto.
              </p>
              <p className="card-text">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic checkbox toggle button group"
                >
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btncheck1"
                    autoComplete="off"
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btncheck1"
                  >
                    Checkbox 1
                  </label>
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btncheck2"
                    autoComplete="off"
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btncheck2"
                  >
                    Checkbox 2
                  </label>
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btncheck3"
                    autoComplete="off"
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btncheck3"
                  >
                    Checkbox 3
                  </label>
                </div>
              </p>
            </div>
          </div>
          <div className="card">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Nombre Proyecto</h5>
              <p className="card-text">
                Características del Proyecto
              </p>
              <p className="card-text">
                <div
                  className="btn-group"
                  role="group"
                  aria-label="Basic checkbox toggle button group"
                >
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btncheck1"
                    autoComplete="off"
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btncheck1"
                  >
                    Checkbox 1
                  </label>
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btncheck2"
                    autoComplete="off"
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btncheck2"
                  >
                    Checkbox 2
                  </label>
                  <input
                    type="checkbox"
                    className="btn-check"
                    id="btncheck3"
                    autoComplete="off"
                  />
                  <label
                    className="btn btn-outline-primary"
                    htmlFor="btncheck3"
                  >
                    Checkbox 3
                  </label>
                </div>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
