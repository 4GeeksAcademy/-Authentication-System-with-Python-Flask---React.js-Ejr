import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";




export const Book = () => {
  const { store, actions } = useContext(Context);



  return (
    <div style={{ backgroundColor: '#264653', color: '#000' }}>
      <div className="container">
        <h1 className=" display-4 text-center py-2" >  Our Services</h1>
        <h2 className="text-center py-2"> Full Exterior Detail</h2>
        
        <div className="row align-items-center" >
        <div className="col" >
        <div className="card text-center card border-dark mb-3" style={{ width: "35rem"}}>
          <img src="https://img.freepik.com/fotos-premium/coche-deportivo-compacto-family-sedan-3d-ilustracion_101266-19260.jpg?w=900" className="card-img-top" alt="..." />
          <div className="card-body " style={{ backgroundColor: '#40768C'}}>
            <h5 className="card-title" >Sedan</h5>
            <ul className="list-group list-group-flush" >
              <li className="list-group-item" style={{ backgroundColor: '#40768C'}}>Price 100 USD</li>
              <li className="list-group-item" style={{ backgroundColor: '#40768C'}}>What is about?</li>
            </ul>
            <a href="#" className="btn btn-dark my-2">Add to Cart</a>
          </div>
        </div>
        </div>
        <div className="col" >
        <div className="card text-center card border-dark mb-3" style={{ width: "35rem"}}>
          <img src="https://img.freepik.com/fotos-premium/coche-camioneta-azul-sobre-fondo-blanco-representacion-3d_101266-9327.jpg?w=900" className="card-img-top" alt="..." />
          <div className="card-body " style={{ backgroundColor: '#40768C'}}>
            <h5 className="card-title" >SUV Mediana</h5>
            <ul className="list-group list-group-flush" >
              <li className="list-group-item" style={{ backgroundColor: '#40768C'}}>Price 150 USD</li>
              <li className="list-group-item" style={{ backgroundColor: '#40768C'}}>What is about?</li>
            </ul>
            <button className="btn btn-dark my-2" onClick={() => {actions.addServices(item.name) }}>Add to Cart</button>
          </div>
        </div>
        </div>
        </div>

        <h2 className="text-center py-2"> Full Exterior Detail</h2>
        
        <div className="row align-items-center" >
        <div className="col" >
        <div className="card text-center card border-dark mb-3" style={{ width: "35rem"}}>
          <img src="https://img.freepik.com/fotos-premium/coche-deportivo-compacto-family-sedan-3d-ilustracion_101266-19260.jpg?w=900" className="card-img-top" alt="..." />
          <div className="card-body " style={{ backgroundColor: '#40768C'}}>
            <h5 className="card-title" >Sedan</h5>
            <ul className="list-group list-group-flush" >
              <li className="list-group-item" style={{ backgroundColor: '#40768C'}}>Price 100 USD</li>
              <li className="list-group-item" style={{ backgroundColor: '#40768C'}}>What is about?</li>
            </ul>
            <a href="#" className="btn btn-dark my-2">Add to Cart</a>
          </div>
        </div>
        </div>
        <div className="col" >
        <div className="card text-center card border-dark mb-3" style={{ width: "35rem"}}>
          <img src="https://img.freepik.com/fotos-premium/coche-camioneta-azul-sobre-fondo-blanco-representacion-3d_101266-9327.jpg?w=900" className="card-img-top" alt="..." />
          <div className="card-body " style={{ backgroundColor: '#40768C'}}>
            <h5 className="card-title" >SUV Mediana</h5>
            <ul className="list-group list-group-flush" >
              <li className="list-group-item" style={{ backgroundColor: '#40768C'}}>Price 150 USD</li>
              <li className="list-group-item" style={{ backgroundColor: '#40768C'}}>What is about?</li>
            </ul>
            <button className="btn btn-dark my-2" onClick={() => 
               {actions.addServices(item.name) }}>Add to Cart</button>
          </div>
        </div>
        </div>
        </div>
        
        </div>
      </div>
   
  );
};
