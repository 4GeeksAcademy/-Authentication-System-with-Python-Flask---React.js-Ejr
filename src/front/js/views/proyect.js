import React from "react";
import { Link } from "react-router-dom";
import { UserHomeList } from "../component/userHomeList";

export const Proyect = () => {
  return (
    <div className="container mt-4 p-0">
      <h2>Siena Parque Quillayes</h2>
      <div className="row">
        <div className="col-12 col-lg-8 p-0">
        <div className="card">
        <div id="demo" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#demo"
              data-bs-slide-to={0}
              className="active"
            />
            <button type="button" data-bs-target="#demo" data-bs-slide-to={1} />
            <button type="button" data-bs-target="#demo" data-bs-slide-to={2} />
          </div>
          {/* The slideshow/carousel */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://exxacon.cl/content/uploads/2019/06/p-proyectos-inmobiliarios.jpg-1.jpeg" alt="Los Angeles" className="d-block w-100" />
            </div>
            <div className="carousel-item">
              <img src="https://exxacon.cl/content/uploads/2019/06/p-proyectos-inmobiliarios.jpg-1.jpeg" alt="Chicago" className="d-block w-100" />
            </div>
            <div className="carousel-item">
              <img src="https://exxacon.cl/content/uploads/2019/06/p-proyectos-inmobiliarios.jpg-1.jpeg" alt="New York" className="d-block w-100" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev"><span className="carousel-control-prev-icon" /></button>
          <button className="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next"><span className="carousel-control-next-icon" /></button>
        </div>
      </div>
        </div>
        <div className="col-12 col-lg-4">
          <h2>Detalles: </h2>
          <div className="row">
            <div className="col-6 ">
              <p>Venta: </p>
              <p>Precio desde: </p>
              <p>Dormitorios: </p>
              <p>Superficie desde:</p>
              <p>Empresa: </p>
            </div>
            <div className="col-6 ">
              <p>Verde </p>
              <p>UF 2.364</p>
              <p>1, 2, 3</p>
              <p>38.63 m<sup>2</sup></p>
              <p>TuInmobiliaria</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid p-0 d-flex justify-content-center mt-4">
        <button type="button mx-auto" class="btn btn-primary">Postula Acá</button>
      </div>

      <div className="container-fluid p-0">
        <h4>Ubicación</h4>
        <p>A pasos de la estación de metro Los Quillayes Ciclovía al exterior que conecta con red de ciclovías Rápido acceso a Autopistas.</p>
        <h4>Descripción</h4>
        <p>Vive en Edificio Parque Quillayes. Conoce Edificio Parque Quillayes. Ubicado en Distrito Quillayes, a pasos de Metro Los Quillayes. Vive en un edificio con todo incluido: Parque interior con más de 2.000 mts2 de áreas verdes que incluyen Quincho, zonas deportivas, zona de juegos y piscina. Distrito Quillayes cuenta con Boulevard de locales comerciales y acceso a supermercado, completamente separado del edificio residencial. Departamentos de 1, 2 y 3 dormitorios con amplias terrazas para disfrutar todos los días. Ventanas termopanel con marco aluminio. Cocinas integradas con horno, campaña y encimera eléctrica.</p>
        <h4>Equipamiento</h4>
        <p>Más de 2.000 mts2 de áreas verdes que incluyen: piscina, zona de quinchos, área deportiva outdoor, juegos de niños y senderos con pérgolas para caminar. Salones de eventos y gran Espacio Cowork con terraza habilitada. Bodegas e commerce para recibir tus encomiendas con seguridad.</p>
      </div>

    </div>




  );
};
