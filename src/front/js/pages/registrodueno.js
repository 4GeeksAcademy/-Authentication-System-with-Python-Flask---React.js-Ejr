import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../styles/register.css";
import Shape from "../component/shape";
import { Actions } from "@cloudinary/url-gen";

export const RegistroDueno = () => {
  const dogRegister = "/registroperro";
  let navigate = useNavigate();

  // States for regristration
  const { store, actions } = useContext(Context);
  const [first_name, setFname] = useState("");
  const [last_name, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [verify_password, setVPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState();

  // BackEnd url

  const apiUrl = process.env.BACKEND_URL + "/owners";

  // Handling the values change
  const handleFname = (e) => {
    setFname(e.target.value);
  };
  const handleLname = (e) => {
    setLname(e.target.value);
  };
  const handleUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleVPassword = (e) => {
    setVPassword(e.target.value);
  };

  const handleImage = (e) => {
    setFile(e.target.files[0]);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    console.log(apiUrl);
    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", first_name);
    formData.append("last_name", last_name);
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("file", file);
    formData.append("verify_password", verify_password);

    fetch(apiUrl, {
      method: "POST",
      body: formData,
    })
      .then((result) => {
        return result.json().then((data) => ({ status: result.status, data }));
      })
      .then((data) => {
        if (data.status === 400) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.data.message,
          });
        } else {
          actions.setUserId(data.data.owner_id);

          navigate(dogRegister);
          Swal.fire(
            "Tu cuenta ha sido creada!",
            "Registra un perro!",
            "success"
          );
        }
      })
      .catch((error) => error);
  };

  return (
    <div className="container-fluid">
      <div className="container align-items-center">
        <div className="row d-flex justify-content-center align-items-center h-100 w-75 mx-auto mb-5">
          <div className="col">
            <form
              className="card card-registration my-4 register"
              encType="multipart/form-data"
            >
              <div className="row g-0">
                <div className="col-xl-12">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5">CREA TU CUENTA</h3>
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            onChange={handleFname}
                            value={first_name}
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
                            value={last_name}
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
                        <div className="form-outline">
                          <input
                            onChange={handleVPassword}
                            value={verify_password}
                            type="password"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label">
                            Verificar Contraseña
                          </label>
                        </div>
                      </div>
                      <div className="col-md-6 mb-4">
                        <div className="form-outline">
                          <input
                            onChange={handleUsername}
                            value={username}
                            type="text"
                            className="form-control form-control-lg"
                          />
                          <label className="form-label">
                            Nombre de Usuario
                          </label>
                        </div>
                      </div>
                    </div>
                    <label className="form-label">
                      Sube una foto de perfil:
                    </label>
                    <br></br>
                    <input type="file" name="file" onChange={handleImage} />

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
                          className="btn btn-lg ms-2 rounded-pill text-light"
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

        <Shape />
      </div>
    </div>
  );
};

RegistroDueno.propTypes = {
  match: PropTypes.object,
};
