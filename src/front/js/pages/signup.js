import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "/workspaces/Watacar_v2/src/front/styles/signup.css";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [eye, setEye] = useState(true); // Estado para controlar la visibilidad de la contraseña

  const handleChange = (ev) => {
    setData({ ...data, [ev.target.name]: ev.target.value });
  };

  const handleEye = () => {
    setEye(!eye);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const config = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(process.env.BACKEND_URL + "api/signup", config)
      .then((resp) => resp.json())
      .then((resp) => {
        Swal.fire({
          icon: 'success',
          title: 'Usuario Creado con éxito',
        
        });
        navigate("/login");
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Faltan algunos datos',
        });
        console.error("Error:", error);
      });
  };

  return (
    <>
      <div className="container col-12 my-5 justify-content-center ">
        <div className="box my-5 ">
          <h2 className="text-center mt-2 pt-3">Únete a WhataCar</h2>

          <form onSubmit={handleSubmit} method="POST">
            <div className="row mx-1 justify-content-around text-center">
              <div className="col-xs-10 col-sm-10 col-md-10 col-lg-5 ">
                <div className="input-box">
                  <label className="form-floating" htmlFor="full_name">Nombre y apellidos
                  {""} <i className="input-with-icon2 fa-solid fa-user"></i></label>
                  <div>
                    <input type="text" placeholder="Ramon Gutierrez" name="full_name" onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className="col-xs-10 col-sm-10 col-md-10 col-lg-5  ">
                <div className="input-box">
                  <label className="form-floating me-4" htmlFor="email">Email <FontAwesomeIcon className="input-with-icon2"icon={faEnvelope} /></label>
                  <div>
                    <input type="email" placeholder="email@example.com" name="email" onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>

            <div className="row  mx-1  justify-content-around text-center ">
              <div className="col-xs-10 col-sm-10 col-md-10 col-lg-5 ">
                <div className="input-box">
                  <label className="form-floating" htmlFor="password"> Contraseña {""} 
                  <i className="input-with-icon2 fa-solid fa-lock"></i>  </label>
                  <div className="input-with-icon">
                    <input
                      type={eye ? "password" : "text"} // Cambiar el tipo de entrada en función del estado de 'eye'
                      placeholder="******"
                      id="password"
                      name="password"
 
                      onChange={handleChange}
                    />
                    <FontAwesomeIcon
                      icon={eye ? faEye : faEyeSlash} // Cambiar el ícono en función del estado de 'eye'
                      className="eye-icon"
                      onClick={handleEye}
                    />
                  </div>
                </div>
              </div>

              <div className="col-xs-10 col-sm-10 col-md-10 col-lg-5 ">
                <div className="input-box">
                  <label className="form-floating" htmlFor="phone">Teléfono{""} <i className="input-with-icon2 fa-solid fa-phone"></i></label>
                  <div>
                    <input type="number" placeholder="696231829" name="phone" onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mx-1 justify-content-around text-center">
              <div className="col-xs-12 col-sm-10 col-md-10 col-lg-5 ">
                <div className="labelbox">
                  <label className="form-floating" htmlFor="role">Rol Usuario
                  {""} <i className="input-with-icon2 fa-solid fa-screwdriver-wrench"></i></label>
                  <div>
                    <select id="role" name="role" onChange={handleChange}>
                      <option value="COMMON_USER">Particular</option>
                      <option value="GARAGE">Taller</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-xs-10 col-sm-10 col-md-10 col-lg-5">
                <div className="input-box">

                  <label className="form-floating" htmlFor="address">Dirección {""} <i className="input-with-icon2 fa-solid fa-map-location"></i></label>
                  <div>
                    <input type="text" placeholder="Av. del corral 7" id="address" name="address" onChange={handleChange} />
                  </div>
                </div>

              </div>
            </div>

            <div className="row mx-1 justify-content-around text-center">
              <div className="col-xs-10 col-sm-10 col-md-10 col-lg-5 mx-1">
                <div className="labelbox">
                  <label className="form-floating" htmlFor="document_type">Tipo de documento
                  {""} <i className="input-with-icon2 fa-solid fa-square-check"></i></label>
                  <div>
                    <select id="idDocument" name="document_type" onChange={handleChange}>
                      <option value="DNI">DNI</option>
                      <option value="CIF">CIF</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-xs-12 col-sm-4 col-md-10 col-lg-5 mb-5">
                <div className="input-box">
                  <label className="form-floating" htmlFor="document_number">Número de documento {""} 
                  <i className="input-with-icon2 fa-solid fa-id-card"></i></label>
                  <div>
                    <input type="text" id="idNumber" placeholder="123412312H" name="document_number" onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>

            <h6 className="text-center mt-5">
              <strong>* Todos los campos deben ser rellenados</strong>
            </h6>
            <div className="button mt-5 py-5">
              <button className="btn btn-primary btn1">Registrar Usuario</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
