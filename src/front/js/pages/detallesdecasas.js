import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { useParams, useLocation } from 'react-router-dom';
import diego from "../../img/diego.jpg";

function Details() {





  return (
    <div className="card" style={{ width: "18rem" }}>
      <img src="https://www.decorablog.com/wp-content/2011/06/Casa-lujosa-Singapur-3.jpg" className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">Punta Ballena, estudio con vista y patio</h5>
        <p className="text-white bg-azul-oscuro d-flex justify-content-center">Alquiler</p>
        <p className="card-text"><strong>Alojamiento entero: departamento con servicios incluidos. <br/>Anfitrión: Armando A.</strong></p>
        <p className='detalle'>4 habitaciones - 1 baño - 250mt2 </p>

      </div>
      <ul className="list-group list-group-flush">
        <div className='d-flex justify-content-between'>
          <p className='ms-4 mt-4'><strong>$50.000 mensual<br/> </strong><p className='disponible'>Disponible ahora</p></p><button type="submit" className="text-white bg-azul-oscuro  gap-2 me-4 mt-4">reservar</button>
        </div>
        <li className="list-group-item mt-4">Hermoso y amplio estudio de 40m2 para 4 personas, situado en el lomo de Punta Ballena, un lugar único y de los más bellos del país.

          Desde un patio generoso propio con piscina, se obtienen unas increíbles vistas al mar y a Punta del Este.

          Cuenta con servicio de mucama diario incluido. </li>
          <div className='d-flex mt-4'>
        <div className='ms-3'>
          <li className="list-group-item duenio">Dueño: Pablo Bullor <br />
          <p className='registro'>Se registró en mayo del 2015</p>
          </li>
          </div>
        
        <img src={diego} style={{ width: "50px", height: "50px" }} className="rounded-circle ms-4" alt="..." />
        </div>
       
        <li className="list-group-item mt-4">Soy de Uruguay, Sudamérica

          Alterno viviendo entre la capital Montevideo y Punta del Este en el departamento de Maldonado. Punta Ballena es uno de los lugares más bonitos de Sudamérica en Punta del Este.</li>
      </ul>
      <div><h5 className='ms-3 mt-3'>Comentarios:</h5></div>
      <ul>
        <li className="d-flex justify-content-start"><img src={diego} style={{ width: "50px", height: "50px" }} className="rounded-circle me-3" alt="..." /> Un lugar increíble, Armando estuvo pendiente de nosotros para que estemos como en Casa.




        </li>


      </ul>

    </div>
  )
};
export default Details
