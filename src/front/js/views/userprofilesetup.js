import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const UserProfileSetup = () => {
  return (
    <div className="container my-5">
      <h1>*Usuario*, dejanos conocerte...</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            ¿Cual es tu ingreso fijo?
          </label>
          <select className="form-select" aria-label="Default select example">
            <option selected>Selecciona una opcion:</option>
            <option value="1">$0 - $1.199.000</option>
            <option value="2">$1.200.000 - $1.499.000</option>
            <option value="3">$1.500.000 - 1.799.000</option>
            <option value="4">$1.800.000 - 2.199.000</option>
            <option value="5">$2.200.000 - más</option>
          </select>
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
          <select className="form-select" aria-label="Default select example">
            <option selected>Selecciona una opcion:</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            ¿Cual es tu capacidad de ahorro mensual?
          </label>
          <select className="form-select" aria-label="Default select example">
            <option selected>Selecciona una opcion:</option>
            <option value="1">$0 - $199.000</option>
            <option value="2">$200.000 - $499.000</option>
            <option value="3">$500.000 - mas</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            ¿Tiene deudas actualmente?
          </label>
          <select class="form-select" aria-label="Default select example">
            <option selected>Selecciona una opcion:</option>
            <option value="1">Si</option>
            <option value="2">No</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput" className="form-label">
            ¿Tiene alguna pre aprobacion bancaria?
          </label>
          <select className="form-select" aria-label="Default select example">
            <option selected>Selecciona una opcion:</option>
            <option value="1">Si</option>
            <option value="2">No</option>
          </select>
        </div>
        <Link to="/user_profile">
          <button>Registrate!</button>
        </Link>
      </form>
    </div>
  );
};
