import React, {useContext, useState} from "react";
import "../../styles/login.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const UserProfile = () => {

  

  return (

    <div className="container mt-4">
      <div className="card text-dark bg-light mb-3 mx-auto" style={{maxWidth: "50rem"}}>
        <h4 className="card-header">Perfil de usuario</h4>
        <div className="card-body">
          <h5 className="card-title">Nombre</h5>
          <p className="card-text">Juanito</p>
          <h5 className="card-title">Apellido</h5>
          <p className="card-text">Perez</p>
          <h5 className="card-title">Email</h5>
          <p className="card-text">Juanito.perez@correo.cl</p>
          <h5 className="card-title">Sueldo Liquido</h5>
          <p className="card-text">$ 1.200.000</p>
          <h5 className="card-title">Profesion</h5>
          <p className="card-text">Programador Full Stack Developer</p>
          <h5 className="card-title">Tipo de Contrato</h5>
          <p className="card-text">Indefinido</p>
          <a href="#" className="btn btn-primary">Editar Perfil</a>

        </div>
      </div>
    </div>


  );
};