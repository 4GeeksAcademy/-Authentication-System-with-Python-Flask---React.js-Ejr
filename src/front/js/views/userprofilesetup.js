import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const UserProfileSetup = () => {
  return (
    <div className="container">
      <h1>*Usuario*, dejanos conocerte...</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            ¿Cual es tu ingreso fijo?
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Example input placeholder"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            ¿Cual es tu trabajo actualmente?
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="Another input placeholder"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            ¿Si aplica, de cuanto es tu ingreso complementario mensualmente?
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Example input placeholder"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            ¿Cual es tu capacidad de ahorra mensual?
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Example input placeholder"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
           ¿Tiene deudas actualmente?
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Example input placeholder"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            ¿Tiene alguna pre aprobacion bancaria?
          </label>
          <input
            type="text"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="Example input placeholder"
          />
        </div>
        <Link to="/user_profile">
          <button>Registrate!</button>
        </Link>
      </form>
    </div>
  );
};
