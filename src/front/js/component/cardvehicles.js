import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "../../styles/home.css";

    export const CardVehicles = ({ vehicle }) => {
    
    const { store, actions } = useContext(Context);

    console.log(store.vehicles);

    return (
            <div className="card col-3" style={{ width: "19rem" }}>
                <div className="card">
                    <Link to="/demo">
                        <a className="cardvehicles" href="#">
                            <img className="Vehiculo" src="https://somoselectricos.com/wp-content/uploads/modelos/Audi-e_tron.png" />
                        </a>
                    </Link>
                    <div className="card-body">
                        <h5 className="card-title mb-4"><strong></strong> {vehicle.marca_modelo}</h5>
                        <p className="card-text mb-1"><strong>Matricula:</strong> {vehicle.matricula}</p>
                        <p className="card-text mb-1"><strong>Motor:</strong> {vehicle.motor}</p>
                        <p className="card-text mb-1"><strong>Tipo cambio:</strong> {vehicle.tipo_cambio}</p>
                        <p className="card-text mb-1"><strong>Asientos:</strong> {vehicle.asientos}</p>
                        <p className="card-text mb-1"><strong>precio:</strong> {vehicle.precio}</p>
                    </div>
                    {/* PODEMOS USAR PARA EL BOTON DE FAVORITO */}
                    {/* <div className="d-flex justify-content-between mb-4 m-3">
                    </div> */}
                </div>
            </div>
    )
};

