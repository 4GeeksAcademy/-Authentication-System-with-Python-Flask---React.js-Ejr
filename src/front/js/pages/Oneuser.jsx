import React, { useState, useEffect, useContext } from "react"; // Importación de React y algunos hooks
import { Link, useParams } from "react-router-dom"; // Importación de Link para la navegación
import { Context } from "../store/appContext"; // Importación del contexto
import styles from "./Home.module.css"; // Importación de estilos CSS






const Oneuser = () => {
    const params=useParams()
  const { store, actions } = useContext(Context)
  useEffect(() => {
    actions.getOneuser(params.id)
  }, [])
  //console.log(store.users)
  return (
    <div className="container">
     <h1>hola</h1>





    </div>
  );
};

export default Oneuser;