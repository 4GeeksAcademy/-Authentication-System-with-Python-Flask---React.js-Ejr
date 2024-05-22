import React from "react";
import { Link } from "react-router-dom";

export const CardVehicles = ({ vehicle, imageUrls }) => {
    const token = localStorage.getItem("token");

    return (
        <div className="card col-md-4 mb-4 me-5 mt-4" style={{ width: "22rem", height: "27rem" }}>
            <a className="cardvehicles" href="#">
                {imageUrls.length > 0 && <img className="Vehiculo mt-4" src={imageUrls[0]} />}
            </a>
            <Link to="/details">
            </Link>
            <div className="card-body p-2">
                <h5 className="card-title mt-2 mb-4"><strong></strong> {vehicle.marca_modelo.toUpperCase()}</h5>
                <p className="card-text mb-1"><strong>Matricula:</strong> {vehicle.matricula.toUpperCase()}</p>
                <p className="card-text mb-1"><strong>Precio:</strong> {vehicle.precio} €</p>
                <p className="card-text mb-1"><strong>Asientos:</strong> {vehicle.asientos}</p>
            </div>
                {token ?
                    <div className="d-flex justify-content-end mt-auto pb-3">
                        <Link to={`/details/${vehicle.id}`}>
                            <button className="btn btn-outline-success border-2"><strong>Más Detalles</strong></button>
                        </Link>
                        </div>
                    : null
                }
        </div>
    )
};