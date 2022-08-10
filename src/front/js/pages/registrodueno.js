import React, { useState } from "react";
import PropTypes from "prop-types";
import "../../styles/register.css";

export const RegistroDueno = () => {
  // States for regristration
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // BackEnd url
  const apiUrl =
    "https://3001-ramsescode-doggerapp-k2okksf28g3.ws-us59.gitpod.io/owners";

  const createOwner = () => {
    fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify([]),
      headers: { "Content-Type": "application/json" },
    })
      .then((result) => result.json())
      .then((data) => data)
      .catch((error) => error);
  };

  // Handling the values change
  const handleFname = (e) => {
    setFname(e.target.value);
    setSubmitted(false);
  };
  const handleLname = (e) => {
    setLname(e.target.value);
    setSubmitted(false);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
    setSubmitted(false);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // States for checking the errors
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (fname === "" || lname === "" || email === "" || password === "") {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
  };

  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? "" : "none",
        }}
      >
        <h1>User {fname} successfully registered!!</h1>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? "" : "none",
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    );
  };

  return (
    <div className="container-fluid">
      <div className="container align-items-center ">
        <div className="row d-flex justify-content-center align-items-center h-100 w-50 mx-auto">
          <div className="col">
            <div className="messages">
              {errorMessage()}
              {successMessage()}
            </div>
            <form className="card card-registration my-4 register">
              <div className="row g-0">
                <div className="col-xl-12">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5">CREA TU CUENTA</h3>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            onChange={handleFname}
                            value={fname}
                            type="text"
                            className="form-control form-control-lg"
                            id="first_name"
                          />
                          <label className="form-label" htmlFor="first_name">
                            Nombre
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            onChange={handleLname}
                            value={lname}
                            type="text"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label">Apellido</label>
                        </div>
                      </div>
                    </div>

                    <div className="form-outline mb-4">
                      <input
                        onChange={handleEmail}
                        value={email}
                        type="email"
                        className="form-control form-control-lg"
                      />
                      <label className="form-label">Email</label>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            onChange={handlePassword}
                            value={password}
                            type="password"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label">Contraseña</label>
                        </div>
                      </div>
                    </div>

                    <h3 className="mb-5">REGISTRA A TU MASCOTA</h3>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label">Nombre</label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label">Raza</label>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label">Edad</label>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-check mb-5">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                          />
                          <label className="form-check-label">
                            Acepto{" "}
                            <a href="#!" className="text-body">
                              <u>Términos y Condiciones</u>
                            </a>
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 ">
                        <button
                          onClick={handleSubmit}
                          type="submit"
                          className="btn btn-lg ms-2 rounded-pill"
                          id="btn_register"
                        >
                          Registrarse
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        <br></br>
        <br></br>

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

RegistroDueno.propTypes = {
  match: PropTypes.object,
};
