// 1. Importar react como libreria
import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

// 2. Crear el componente JSX
export const Card = (props) => {
    const fechaString = props.fecha;

    // Convertir la cadena en un objeto de fecha
    const fechaObjeto = new Date(fechaString);

    // Formatear la fecha en el formato corto
    const fechaFormateada = fechaObjeto.toLocaleDateString();
    return(
        <div className="card" >
            <img src="https://i.pinimg.com/564x/e6/c3/4a/e6c34afdf235e76c31344d6a933cae27.jpg" className="card-img-top" alt="..."/>
            <div className="card-body" style={{height:"100px"}}>
                <h5 className="card-title">{props.evento}</h5>
                <p className="card-text">{props.descripcion}</p>
            </div>
            <div className="card-body">
                <p className="card-text">Ciudad: {props.ciudad}</p>
                <p className="card-text">Fecha: {fechaFormateada}</p>
            </div>
            <button type="button" className= "bg-300 col-5 m-auto mb-3 rounded">
				See details!
			</button>
        </div>
    );
}

Card.propTypes = { 
	key: PropTypes.number,
	evento: PropTypes.string,
    descripcion: PropTypes.string,
    ciudad: PropTypes.string,
    fecha: PropTypes.instanceOf(Date)
}
