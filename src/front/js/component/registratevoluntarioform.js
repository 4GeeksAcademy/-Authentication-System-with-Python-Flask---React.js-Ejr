import React from "react";

export const RegistrateVoluntarioForm = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <form className="m-5">
            <div className="text-center mb-4">
              <h1>Hazte voluntario</h1>
            </div>
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">
                Nombre
              </label>
              <input type="text" className="form-control" id="inputName" />
            </div>
            <div className="mb-3">
              <label htmlFor="inputSurname" className="form-label">
                Apellido
              </label>
              <input type="text" className="form-control" id="inputSurname" />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">
                Contraseña
              </label>
              <input type="password" className="form-control" id="inputPassword" />
            </div>
            <div className="mb-3">
              <label htmlFor="inputRepeatPassword" className="form-label">
                Repita contraseña
              </label>
              <input type="password" className="form-control" id="inputRepeatPassword" />
            </div>
            <div className="mb-3 form-check">
              <input className="form-check-input" type="checkbox" id="showPassword" />
              <label className="form-check-label" htmlFor="showPassword">
                Mostrar contraseña
              </label>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Sign up
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <img className="img-fluid m-5" src="https://images.pexels.com/photos/3823497/pexels-photo-3823497.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Volunteer" />
        </div>
      </div>
    </div>
  );
}
