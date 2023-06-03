import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";




export const Services = () => {
  const { store, actions } = useContext(Context);



  return (
    <div style={{ backgroundColor: '#264653', color: '#000'}}>
    <div className="container">
      <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col">
        <div class="card text-center border-dark m-3" style={{ width: "18rem" }}>
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body ">
            <h5 class="card-title">Full Exterior Detail</h5>
            <p class="card-text">En tu auto hay la misma cantidad de gérmenes que en un baño público. Elimina el 99,9% de olores, hongos, virus y bacterias con una limpieza profunda detallada. Tu auto acumula contaminación en el sistema de ventilación</p>
            <div class="card-footer">
              <a href="#" class="btn btn-primary">Book Now</a>
            </div>
          </div>
        </div>
        </div>
        <div class="col">
        <div class="card text-center border-dark m-3" style={{ width: "18rem" }}>
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body ">
            <h5 class="card-title">Full Interior Detail</h5>
            <p class="card-text">El lavado de motor es una de nuestras especialidades por los buenos acabados que dejamos, realizamos lavado de motor con agua a presión, pero solo a vehículos que lo resistan o el cliente lo solicite.</p>
            <div class="card-footer">
              <a href="#" class="btn btn-primary">Book Now</a>
            </div>
          </div>
        </div>
        </div>
        <div class="col">
        <div class="card text-center border-dark m-3" style={{ width: "18rem" }}>
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body ">
            <h5 class="card-title">Correccion Profesional de Pintura</h5>
            <p class="card-text">Se realiza el servicio de pulido profesional o corrección de pintura, para recuperar y revitalizar la carrocería eliminando muchas marcas que se depositan en el auto y recuperando el brillo y la intensidad del color perdido.</p>
            <div class="card-footer">
              <a href="#" class="btn btn-primary">Book Now</a>
            </div>
          </div>
        </div>
        </div>
        </div>
        <div class="row row-cols-1 row-cols-md-3 g-4">
        <div class="col">
        <div class="card text-center border-dark m-3" style={{ width: "18rem" }}>
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body ">
            <h5 class="card-title">Full Exterior Detail</h5>
            <p class="card-text">En tu auto hay la misma cantidad de gérmenes que en un baño público. Elimina el 99,9% de olores, hongos, virus y bacterias con una limpieza profunda detallada. Tu auto acumula contaminación en el sistema de ventilación</p>
            <div class="card-footer">
              <a href="#" class="btn btn-primary">Book Now</a>
            </div>
          </div>
        </div>
        </div>
        <div class="col">
        <div class="card text-center border-dark m-3" style={{ width: "18rem" }}>
          <img src="..." class="card-img-top" alt="..." />
          <div class="card-body ">
            <h5 class="card-title">Limpieza Profunda</h5>
            <p class="card-text">En tu auto hay la misma cantidad de gérmenes que en un baño público. Elimina el 99,9% de olores, hongos, virus y bacterias con una limpieza profunda detallada. Tu auto acumula contaminación en el sistema de ventilación</p>
            <div class="card-footer">
              <a href="#" class="btn btn-primary">Book Now</a>
            </div>
          </div>
        </div>
        </div>
    
       
    
    
      </div>
    </div>
    </div>
  );
};
