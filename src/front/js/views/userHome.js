import React from "react";
import "../../styles/login.css";
import { Link } from "react-router-dom";

export const UserHome = () => {
  return (
    <div className="container mt-2">
    <select className="form-select w-50 mb-2" aria-label="Default select example">
      <option selected="">Ordenar por: </option>
      <option value={1}>Valor Mayor</option>
      <option value={2}>Valor Menor</option>
      <option value={3}>Fecha de publicacion</option>
    </select>
    <div className="row row-cols-1 row-cols-md-2 g-4">
      <div className="col">
        <div className="card">
          <img src="https://exxacon.cl/content/uploads/2019/06/p-proyectos-inmobiliarios.jpg-1.jpeg" className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">Siena Parque Quillayes</h5>
            <p className="card-text mb-0"><small className="text-muted">Departamentos en La Florida</small></p>
            <p className="card-text"><small className="text-muted">Av. Vicuña Mackenna 10811</small></p>
            <div className="container-fluid p-0">
              <div className="row">
                <div className="col-6">
                  <p className="mb-0">Dormitorios: </p>
                  <p className="mb-0">Baños: </p>
                  <p>Superficie: </p>
                </div>
                <div className="col-6">
                  <p className="mb-0">1,2,3</p>
                  <p className="mb-0">1,2</p>
                  <p>38.63 m<sup>2</sup></p>
                </div>
              </div>
            </div>
            <div class="alert alert-secondary" role="alert">Desde UF 2.364 - $76.736.480</div>
            <a href="#" class="btn btn-primary">Ir al Proyecto</a>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card">
          <img src="https://exxacon.cl/content/uploads/2019/06/p-proyectos-inmobiliarios.jpg-1.jpeg" className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">Siena Parque Quillayes</h5>
            <p className="card-text mb-0"><small className="text-muted">Departamentos en La Florida</small></p>
            <p className="card-text"><small className="text-muted">Av. Vicuña Mackenna 10811</small></p>
            <div className="container-fluid p-0">
              <div className="row">
                <div className="col-6">
                  <p className="mb-0">Dormitorios: </p>
                  <p className="mb-0">Baños: </p>
                  <p>Superficie: </p>
                </div>
                <div className="col-6">
                  <p className="mb-0">1,2,3</p>
                  <p className="mb-0">1,2</p>
                  <p>38.63 m<sup>2</sup></p>
                </div>
              </div>
            </div>
            <div class="alert alert-secondary" role="alert">Desde UF 2.364 - $76.736.480</div>
            <a href="#" class="btn btn-primary">Ir al Proyecto</a>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card">
          <img src="https://exxacon.cl/content/uploads/2019/06/p-proyectos-inmobiliarios.jpg-1.jpeg" className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">Siena Parque Quillayes</h5>
            <p className="card-text mb-0"><small className="text-muted">Departamentos en La Florida</small></p>
            <p className="card-text"><small className="text-muted">Av. Vicuña Mackenna 10811</small></p>
            <div className="container-fluid p-0">
              <div className="row">
                <div className="col-6">
                  <p className="mb-0">Dormitorios: </p>
                  <p className="mb-0">Baños: </p>
                  <p>Superficie: </p>
                </div>
                <div className="col-6">
                  <p className="mb-0">1,2,3</p>
                  <p className="mb-0">1,2</p>
                  <p>38.63 m<sup>2</sup></p>
                </div>
              </div>
            </div>
            <div class="alert alert-secondary" role="alert">Desde UF 2.364 - $76.736.480</div>
            <a href="#" class="btn btn-primary">Ir al Proyecto</a>
          </div>
        </div>
      </div>
      <div className="col">
        <div className="card">
          <img src="https://exxacon.cl/content/uploads/2019/06/p-proyectos-inmobiliarios.jpg-1.jpeg" className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">Siena Parque Quillayes</h5>
            <p className="card-text mb-0"><small className="text-muted">Departamentos en La Florida</small></p>
            <p className="card-text"><small className="text-muted">Av. Vicuña Mackenna 10811</small></p>
            <div className="container-fluid p-0">
              <div className="row">
                <div className="col-6">
                  <p className="mb-0">Dormitorios: </p>
                  <p className="mb-0">Baños: </p>
                  <p>Superficie: </p>
                </div>
                <div className="col-6">
                  <p className="mb-0">1,2,3</p>
                  <p className="mb-0">1,2</p>
                  <p>38.63 m<sup>2</sup></p>
                </div>
              </div>
            </div>
            <div class="alert alert-secondary" role="alert">Desde UF 2.364 - $76.736.480</div>
            <a href="#" class="btn btn-primary">Ir al Proyecto</a>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
