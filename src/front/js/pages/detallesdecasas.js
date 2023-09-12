import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext";
import { useParams, useLocation } from 'react-router-dom';
import diego from "../../img/diego.jpg";

function Details() {
  const { store, actions } = useContext(Context)
  useEffect(() => {
		actions.getAlquileres()
	}, [])




  return (
    <div className='row'>
    {store.alquileres.map((item, index) => {return (
    <div className="col-12" key= {index} style={{ width: "150rem" }}>
      
      <img src="https://www.decorablog.com/wp-content/2011/06/Casa-lujosa-Singapur-3.jpg" className="card-img-top" alt="..." />
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        
        <p className="text-white bg-azul-oscuro d-flex justify-content-center">{item.category}</p>
        <h6 className='disponible'>Localización: {item.location}</h6>
        <p className="card-text"><strong>Alojamiento entero: departamento con servicios incluidos. <br/>Anfitrión: Armando A.</strong></p>
        <p className='detalle'>{item.numberOfRooms} Habitaciones - {item.numberOfBathrooms} Baños - 250mt2 </p>

      </div>
      <ul className="list-group list-group-flush">
        <div className='d-flex justify-content-between'>
          <p className='ms-4 mt-4'><strong>${item.price} Mensual<br/> </strong><p className='disponible'>Disponible ahora</p></p><button type="submit" className="text-white bg-azul-oscuro  gap-2 me-4 mt-4">Alquilar</button>
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
      <h5 className='ms-3 mt-3'>Comentarios:</h5>
      <div className="d-flex " style={{ overflowX: 'scroll', scrollSnapType: 'x mandatory'}}>
      <div className="d-flex "><img src={diego} style={{ width: "150px", height: "50px" }} className="rounded-circle me-3" alt="..." /> <p>Un lugar increíble, Armando estuvo pendiente de nosotros para que estemos como en Casa.</p></div>
      <div className="d-flex "><img src={diego} style={{ width: "150px", height: "50px" }} className="rounded-circle me-3" alt="..." /> <p>Un lugar increíble, Armando estuvo pendiente de nosotros para que estemos como en Casa.</p></div>
      <div className="d-flex "><img src={diego} style={{ width: "150px", height: "50px" }} className="rounded-circle me-3" alt="..." /> <p>Un lugar increíble, Armando estuvo pendiente de nosotros para que estemos como en Casa.</p></div>


       


      </div>
      
    </div>
    )})}</div>
  );
    };
    




export default Details
