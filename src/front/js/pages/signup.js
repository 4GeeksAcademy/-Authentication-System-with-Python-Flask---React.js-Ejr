import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import "/workspaces/Watacar_v2/src/front/styles/signup.css";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState("");

  const handleChange = (ev) => {
    setData({ ...data, [ev.target.name]: ev.target.value });
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const config = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    fetch(process.env.BACKEND_URL + 'api/signup', config)
    .then((resp) => resp.json())
    .then((resp) => {
      navigate('/login');
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  };

  return (
    <>
      <div className="container d-flex justify-content-center">
        <div className="box mt-5 mb-5">
          <h2 className="text-center mt-3">Únete a WhataCar</h2>

          <form onSubmit={handleSubmit} method="POST">

            <div className="row">
              <div className="col-6">
                <div className="input-box">
                  <label htmlFor="full_name">Nombre y apellidos</label>
                  <input type="text" placeholder="Ramon Gutierrez" name="full_name" onChange={handleChange}/>
                </div>
              </div>

              <div className="col-6">
                <div className="input-box">
                  <label htmlFor="email">Email</label>
                  <input type="email" placeholder="email@example.com" name="email" onChange={handleChange} />
                </div>
              </div>

            </div>


            <div className="row">
              <div className="col-6">
                <div className="input-box">
                  <label htmlFor="password"> Contraseña <FontAwesomeIcon icon={faEnvelope} /> </label>
                  <input type="password" placeholder="******" name="password" onChange={handleChange} />
                </div>
              </div>

              <div className="col-6">
                <div className="input-box">
                  <label htmlFor="phone">Teléfono</label>
                  <input type="number" placeholder="696231829" name="phone" onChange={handleChange} />
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-6">
                <div className="labelbox">
                  <label htmlFor="role">Rol:</label>
                  <select id="role" name="role" onChange={handleChange}>
                    <option value="BUYER">Particular</option>
                    <option value="GARAGE">Taller</option>
                  </select>
                </div>
              </div>

              <div className="col-6">
                <div className="input-box">
                  <label htmlFor="address">Dirección</label>
                  <input type="text" placeholder="Av. del corral 7" name="address" onChange={handleChange} />
                </div>
              </div>
            </div>


            <div className="row">
              <div className="col-6">
                <div className="labelbox">
                  <label htmlFor="document_type">Tipo de documento:</label> 
                  <select id="idDocument" name="document_type" onChange={handleChange}>
                    <option value="DNI">DNI</option>
                    <option value="CIF">CIF</option>
                  </select>
                </div>
              </div>

              <div className="col-6">
                <div className="input-box">
                  <label htmlFor="document_number">Número de documento:</label>
                  <input type="text" id="idNumber" placeholder="123412312H" name="document_number" onChange={handleChange} />
                </div>
              </div>
            </div>

            
            <div className="button mt-4">
              <button className="btn btn-primary btn1">Click Me!</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
