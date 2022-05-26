import React, {useContext, useState} from "react";
import "../../styles/login.css";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const UserProfile = () => {

  const { store, actions } = useContext(Context); 
  // console.log(store.currentUser?.email); 


  return(
    <div className="container mt-4">
      <div className="card text-dark bg-light mb-3 mx-auto" style={{maxWidth: "50rem"}}>
        <h4 className="card-header">Perfil de usuario</h4>
        <div className="card-body">
          <h5 className="card-title">Nombre</h5>
          <p className="card-text">{store.currentUser?.name}</p>
          <h5 className="card-title">Apellido</h5>
          <p className="card-text">{store.currentUser?.lastname}</p>
          <h5 className="card-title">Email</h5>
          <p className="card-text">{store.currentUser?.email}</p>
          <h5 className="card-title">Sueldo Liquido</h5>
          <p className="card-text">$ {store.currentUser?.salary}</p>
          <h5 className="card-title">Ingreso Extra</h5>
          <p className="card-text">$ {store.currentUser?.side_income}</p>
          <h5 className="card-title">Deudas mensuales</h5>
          <p className="card-text">$ {store.currentUser?.deudas}</p>
          <a href="#" className="btn btn-primary">Editar Perfil</a>
        </div>
      </div>
    </div>
  )


};


