import React, { useState, useEffect, useContext } from "react"; // Importación de React y algunos hooks
import { Link } from "react-router-dom"; // Importación de Link para la navegación
import { Context } from "../store/appContext"; // Importación del contexto
import styles from "./Home.module.css"; // Importación de estilos CSS






const Users = () => {
    const {store, actions}=useContext(Context)
    useEffect (()=>{
        actions.getUsers()
    },[])
    console.log(store.users)
  return (
    <div>
      <div className="d-flex justify-content-center">
     
      </div>
      
     
       
       
      
    </div>
  );
};

export default Users;