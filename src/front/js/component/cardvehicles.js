import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "../../styles/home.css";

    export const CardVehicles = ({ vehicle }) => {
    
    const { store, actions } = useContext(Context);

    console.log(store.vehicles);

    // const [detailVehicle, setDetailVehicle] = useState({})
    // const [className, setClassName] = useState("btn btn-outline-warning ms-5")

    // useEffect(() => {
    //     // console.log("llamando Vehiculo con uid: " + vehiculo.uid);
    //     fetch("https://www.swapi.tech/api/vehicles/", {
    //         method: 'GET'
    //     })
    //         .then(res => res.json())
    //         .then(data => setDetailVehicle(data.result.properties))
    //         .catch(err => console.error(err))
    // }, [])

    return (
            <div className="card col-3" style={{ width: "19rem" }}>
                <div className="card">
                    <Link to="/demo">
                        <a className="cardvehicles" href="#">
                            <img className="Vehiculo" src="https://somoselectricos.com/wp-content/uploads/modelos/Audi-e_tron.png" />
                        </a>
                    </Link>
                    <div className="card-body">
                        <h5 className="card-title mb-4">Modelo: {vehicle.marca_modelo}</h5>
                        <p className="card-text mb-1">Matricula: {vehicle.matricula}</p>
                        <p className="card-text mb-1">Motor: {vehicle.motor}</p>
                        <p className="card-text mb-1">Tipo de cambio: {vehicle.tipodecambio}</p>
                        <p className="card-text mb-1">Asientos: {vehicle.asientos}</p>
                        <p className="card-text mb-1">precio: {vehicle.precio}</p>
                    </div>
                    <div className="d-flex justify-content-between mb-4 m-3">
                    </div>
                </div>
            </div>
    )
};

