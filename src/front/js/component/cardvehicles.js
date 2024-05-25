import React from "react";
import { Link } from "react-router-dom";

export const CardVehicles = ({ vehicle }) => {
    const token = localStorage.getItem("token");
    return (
        <div className="vehiculo card col-md-4 mb-4 me-5 mt-4" style={{ width: "22rem", height: "26rem" }}>
            <a className="cardvehicles" href="#">
                <img src={vehicle.url_img1} style={{width: "100%", objectFit: "cover", height: "12rem"}} />
            </a>
            <Link to="/details">
            </Link>
            <div className="card-body p-2">
                <h3 className="card-title mt-2 mb-4 text-success"><strong>{vehicle.marca_modelo.toUpperCase()}</strong></h3>
                <p className="card-text mb-3 fs-5"><strong>Asientos:</strong> {vehicle.asientos}</p>
                <p className="card-text fs-5"><strong>Precio:</strong> {vehicle.precio} €</p>
            </div>
                {token ?
                    <div className="d-flex justify-content-end mt-auto pb-3">
                        <Link to={`/details/${vehicle.id}`}>
                            <button className="btn-success btn-lg border-2 rounded me-3"><strong>Más Detalles</strong></button>
                        </Link>
                        </div>
                    : null
                }
        </div>
    )
};