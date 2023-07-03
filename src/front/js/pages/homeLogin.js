import React, { useState } from "react";
import CanchaCard from "../component/CanchaCard";
import BigCardInformation from "../component/BigCardInformation";
import BigCardInformation2 from "../component/BigCardInformation2";
import { Barousel } from "../component/carousel";

export const HomeLogin = () => {
    const [comunasRegion, setcomunasRegion] = useState([])
    const comunas = [
        {
            region: "metropolitana",
            comunas: [
                "la florida", "puente alto", "ñuñoa", "santiago"
            ]
        },

        {
            region: "valparaiso",
            comunas: [
                "valparaiso", "viña del mar", "reñaca", "limache"
            ]
        }
    ]
    function buscarComunas(e) {
        e.preventDefault()
        if (e.target.value == "7") {
            let comunasSelect = comunas[0].comunas
            setcomunasRegion([...comunasSelect])
        }

        if (e.target.value == "6") {
            let comunasSelect = comunas[1].comunas
            setcomunasRegion([...comunasSelect])
        }


    }
    return (
        <div className="container">
            <div className="searchForm">
                <button type="button" className="btn btn-primary">Search</button>
                <select className="form-select" aria-label="Default select example" onChange={e => buscarComunas(e)}>
                    <option selected>Region</option>
                    <option value="1">Arica y Parinacota</option>
                    <option value="2">Tarapaca</option>
                    <option value="3">Antofagasta</option>
                    <option value="4">Atacama</option>
                    <option value="5">Coquimbo</option>
                    <option value="6">Valparaíso</option>
                    <option value="7">Metropolitana</option>
                    <option value="8">O'Higgins</option>
                    <option value="9">Maule</option>
                    <option value="10">Ñuble</option>
                    <option value="11">Bío Bío</option>
                    <option value="12">La Araucanía</option>
                    <option value="13">Los Ríos</option>
                    <option value="15">Los Lagos</option>
                    <option value="16">Aysén</option>
                    <option value="17">Magallanes</option>
                </select>
                <select className="form-select" aria-label="Default select example">
                    <option selected>Comuna</option>
                    {
                        comunasRegion.map((comuna) =>
                            <option value={comuna}>{comuna}</option>
                        )
                    }

                </select>
                <select className="form-select" aria-label="Default select example">
                    <option selected>Deporte</option>
                    <option value="1">Tenis</option>
                    <option value="2">Futbol</option>
                    <option value="3">Paddle</option>
                    <option value="4">Básquetbol</option>
                    <option value="5">Baby Futbol</option>
                </select>
            </div>
            <button type="button" className="btn btn-primary">Administra Tus Canchas</button>

            <Barousel />

        </div>


    )

};