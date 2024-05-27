import React from "react";
import { Link } from "react-router-dom";

export const CardVehicles = ({ vehicle }) => {
    const token = localStorage.getItem("token");
    return (
        <div className="vehiculo card col-md-4 mb-4 me-5 mt-4" style={{ width: "22rem", height: "27rem" }}>
            <div>
                <a className="cardvehicles" href="#">
                    <img className="imagen1" src={vehicle.url_img1} style={{width: "100%", objectFit: "cover", height: "12rem"}} />
                </a>
            </div>
            <div className="card-body ms-2 p-2">
                <h3 className="card-title mt-2 mb-4 text-success"><strong>{vehicle.marca_modelo.toUpperCase()}</strong></h3>
                <p className="card-text mb-3 fs-5"><strong>Asientos:</strong> {vehicle.asientos}</p>
                <p className="card-text fs-5 mb-3"><strong>Precio:</strong> {vehicle.precio} €</p>
            </div>
                {token ?
                    <div className="d-flex justify-content-end mb-5 me-4">
                        <Link to={`/details/${vehicle.id}`}>
                            <button className="btn-success btn-lg border-2 rounded-4"><strong>Más Detalles</strong></button>
                        </Link>
                        </div>
                    : null
                }
        </div>
    )
};