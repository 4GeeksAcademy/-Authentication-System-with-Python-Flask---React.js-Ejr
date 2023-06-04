import React from "react";

export const RegistrateVoluntarioForm =()=> {
    return (

        <form className="container bg-warning mt-5">
        <div className="col-md-6">
          <label htmlFor="inputName" className="form-label">
            Nombre
          </label>
          <input type="email" className="form-control" id="inputName" />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputSurname" className="form-label">
            Apellido
          </label>
          <input type="email" className="form-control" id="inputSurname" />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
          />
        </div>
        <div className="col-12">
          <label htmlFor="inputAddress2" className="form-label">
            Address 2
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            City
          </label>
          <input type="text" className="form-control" id="inputCity" />
        </div>
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">
            State
          </label>
          <select id="inputState" className="form-select">
            <option selected="">Choose...</option>
            <option>...</option>
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">
            Zip
          </label>
          <input type="text" className="form-control" id="inputZip" />
        </div>
        <div className="col-12">
        <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Contraseña
          </label>
          <input type="password" className="form-control" id="inputPassword4" />
        </div><div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Repita contraseña
          </label>
          <input type="password" className="form-control" id="inputPassword4" />
        </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="gridCheck" />
            <label className="form-check-label" htmlFor="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Sign in
          </button>
        </div>
      </form>
   


         
    );
}