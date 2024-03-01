import React, { useEffect, useContext, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const EventDescriptionCard = (props) => {

    console.log(props.data);


    const fechaString = props.fecha;

    // Convertir la cadena en un objeto de fecha
    const fechaObjeto = new Date(fechaString);

    // Formatear la fecha en el formato corto
    const fechaFormateada = fechaObjeto.toLocaleDateString();
    return (
        <div className="d-flex  flex-column" style={{ maxWidth: "840px" }}>

            <div className="card  ms-5 " style={{ maxWidth: "840px" }}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={props.img} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{props.evento}</h5>
                            <p className="card-text">{props.fecha}</p>
                            <p className="card-text"><small className="text-body-secondary">{fechaFormateada}</small></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="d-flex justify-content-center mb-3 gap-1" >
                <div className="p-2 flex-grow-1  ms-5" >
                    <button type="button" className="btn btn-primary btn-lg ">JOIN EVENT</button>
                </div>

                <div className="p-2">
                    <button type="button" className="btn btn-primary ">
                        <span className="badge text-bg-secondary">{props.asistentes}</span>
                    </button>
                </div>
                <div className="p-2">
                    <p>of</p>
                </div>
                <div className="p-2">
                    <button type="button" className="btn btn-primary ">
                        <span className="badge text-bg-secondary">{props.maximo}</span>
                    </button>
                </div>
                <div className="p-2">
                    <p>To complete</p>
                </div>

            </div>

            <div className="ms-5" >
                <h3>Description</h3>
                <p>{props.descripcion}</p>
            </div>







        </div>
    );
}

EventDescriptionCard.propTypes = {

    evento: PropTypes.string,
    descripcion: PropTypes.string,
    asistentes: PropTypes.number,
    maximo: PropTypes.number,
    fecha: PropTypes.string,
    img: PropTypes.string
}