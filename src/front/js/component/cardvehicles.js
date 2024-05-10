import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const CardVehicles = () => {

    // const { store, actions } = useContext(Context);
    return (
            <div className="card col-3" style={{ width: "19rem" }}>
                <div className="card">
                    <Link to="/demo">
                        <a className="cardvehicles" href="#">
                            <img className="Vehiculo" src="https://somoselectricos.com/wp-content/uploads/modelos/Audi-e_tron.png" />
                        </a>
                    </Link>
                    <div className="card-body">
                        <h5 className="card-title mb-4">Audi e-tron GT</h5>
                        <p className="card-text mb-1">MODELO</p>
                        <p className="card-text mb-1">PRECIO</p>
                    </div>
                    <div className="d-flex justify-content-between mb-4 m-3">
                    </div>
                </div>
            </div>
    )
};

