// 1. Importar react como libreria
import React, { useEffect, useContext, useState } from "react";
import PropTypes, { string } from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

// 2. Crear el componente JSX
export const SimpleCard = (props) => {
    const fechaString = props.fecha;

    // Convertir la cadena en un objeto de fecha
    const fechaObjeto = new Date(fechaString);

    // Formatear la fecha en el formato corto
    const fechaFormateada = fechaObjeto.toLocaleDateString();
    return(
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{props.evento}</h5>
                <p className="card-text">{props.descripcion}</p>
            </div>
            <div className="card-body">
                <p className="card-text">Ciudad: {props.ciudad}</p>
                <p className="card-text">Fecha: {fechaFormateada}</p>
            </div>
        </div>
    );
}

SimpleCard.propTypes = { 
	key: PropTypes.number,
	evento: PropTypes.string,
    descripcion: PropTypes.string,
    ciudad: PropTypes.string,
    fecha: PropTypes.string
}