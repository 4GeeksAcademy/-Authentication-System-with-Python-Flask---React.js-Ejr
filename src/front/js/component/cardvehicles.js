import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const CardVehicles = ({ vehicle }) => {

    const { store, actions } = useContext(Context);
    const token = localStorage.getItem("token");

    console.log(store.vehicles);

    return (
        <div className="card col-md-4 mb-4 me-5 mt-4" style={{ width: "22rem", height: "26rem" }}>
            <a className="cardvehicles" href="#">
                <img className="Vehiculo mt-4" src="https://somoselectricos.com/wp-content/uploads/modelos/Audi-e_tron.png" />
            </a>
            <Link to="/details">
            </Link>
            <div className="card-body p-2">
                <h5 className="card-title mt-2 mb-4"><strong></strong> {vehicle.marca_modelo.toUpperCase()}</h5>
                <p className="card-text mb-1"><strong>Matricula:</strong> {vehicle.matricula}</p>
                <p className="card-text mb-1"><strong>precio:</strong> {vehicle.precio}</p>
                </div>
                {token ?
                    <div className="d-flex justify-content-end mt-auto mb-5 pb-5">
                        <Link to={`/details/${vehicle.id}`}>
                            <button className="btn btn-outline-success border-2"><strong>More Details</strong></button>
                        </Link>
                        </div>
                    : null
                }
            </div>
    )
};