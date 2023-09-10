import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

export const MetodoEnvio = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container-fluid">


            <div className="text-center m-3 mb-5">
                <h1>METODOS DE ENVIOS</h1>
            </div>
            <div className="d-flex justify-content-center">
                <img src="https://comprosmart.com/sos//vistas/contenidos/images/envio-entregas/1.png" alt="Descripción de la imagen" />
            </div>
            <div className="d-flex justify-content-center mt-5">
                <img src="https://media.biobiochile.cl/wp-content/uploads/2019/10/s_cxp_c.png" alt="Descripción de la imagen" />
            </div>
            <div className="mx-5 mt-5">
                <p>Nuestros libros viajan a tu hogar gracias a las mejores agencias envíos de chile:</p>
                <p>1.Starken.</p>
                <p>2.Chilexpress.</p>
                <p>3.Correos de Chile.</p>
            </div>


        </div >
    );
};