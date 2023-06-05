import React, { useState } from "react";

export const RegistrateVoluntarioForm = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const inputName = document.getElementById("inputName").value;
    const inputSurname = document.getElementById("inputSurname").value;
    const inputPassword = document.getElementById("inputPassword").value;
    const inputRepeatPassword = document.getElementById("inputRepeatPassword").value;

    if (inputName === "" || inputSurname === "" || inputPassword === "" || inputRepeatPassword === "") {
      setShowAlert(true);
    } else if (inputPassword !== inputRepeatPassword) {
      setPasswordMatch(false);
    } else {
      setShowAlert(false);
      setPasswordMatch(true);
      // Add your form submission logic here
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <form className="m-5" onSubmit={handleSubmit}>
            <div className="text-center mb-4">
              <h1>Hazte voluntario</h1>
            </div>
            {showAlert && (
              <div className="alert alert-danger" role="alert">
                Por favor rellene este campo.
              </div>
            )}
            {!passwordMatch && (
              <div className="alert alert-danger" role="alert">
                Las contraseñas no coinciden.
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">
                Nombre
              </label>
              <input type="text" className="form-control" id="inputName" required />
            </div>
            <div className="mb-3">
              <label htmlFor="inputSurname" className="form-label">
                Apellido
              </label>
              <input type="text" className="form-control" id="inputSurname" required />
            </div>
            <div className="mb-3">
              <label htmlFor="inputUserName" className="form-label">
                Nombre de Usuario
              </label>
              <input type="text" className="form-control" id="inputUserName" required />
            </div>
            <div className="mb-3">
              <label htmlFor="inputEmail" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="inputSurname" required />
            </div>
            <div className="mb-3">
              <label htmlFor="inputPassword" className="form-label">
                Contraseña
              </label>
              <div className="input-group">
                <input type={showPassword ? "text" : "password"} className="form-control" id="inputPassword" required />
               
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="inputRepeatPassword" className="form-label">
                Repita la contraseña
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="inputRepeatPassword"
                  required
                />
                <button className="btn btn-outline-secondary" type="button" onClick={toggleShowPassword}>
                  {showPassword ? (
                    <i className="fa-solid fa-eye-slash"></i>
                  ) : (
                    <i className="fa-solid fa-eye"></i>
                  )}
                </button>
              </div>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Sign up
              </button>
            </div>
          </form>
        </div>
        <div className="col-md-6">
          <img
            className="img-fluid m-5"
            src="https://images.pexels.com/photos/3823497/pexels-photo-3823497.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Volunteer"
          />
        </div>
      </div>
    </div>
  );
};
