import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/adm.css";
import { Context } from "../store/appContext";

export const Perfil = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="d-flex body-adm">
      <div id="sidebar-container" className="bg-primary">
        <div className="logo">
          <h4 className="text-light font-weight-bold">Logo</h4>
        </div>
        <div className="menu">
          <Link to="/adm">
            <a href="#" className="d-block text-light mr-2 p-3">
              <i class="icon ion-md-apps mr-2 lead"></i>Tablero
            </a>
          </Link>
          <Link to="/adm1">
            <a href="#" className="d-block text-light mr-2 p-3">
              <i class="icon ion-md-people mr-2 lead"></i>Usuarios
            </a>
          </Link>
          <Link to="/stock">
            <a href="#" className="d-block text-light mr-2 p-3">
              <i class="icon ion-md-stats mr-2 lead"></i>Stocks
            </a>
          </Link>
          <Link to="/perfil">
            <a href="#" className="d-block text-light mr-2 p-3">
              <i class="icon ion-md-person mr-2 lead"></i>Perfil
            </a>
          </Link>
          <Link to="/configuracion">
            <a href="#" className="d-block text-light mr-2 p-3">
              <i class="icon ion-md-settings mr-2 lead"></i>Configuracion
            </a>
          </Link>
        </div>
      </div>
      {store.registros.map((e, i) => {
        return (
          <li key={i}>
            <ul>
              <h1>{e.name}</h1>
              <h1>{e.id}</h1>
              <h1>{e.password}</h1>
              <h1>{e.direccion}</h1>
              <h1>{e.telefono}</h1>
            </ul>
          </li>
        );
      })}
    </div>
  );
};
