import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/adm.css";
import { Context } from "../store/appContext";

export const Adm = () => {
  const { store, actions } = useContext(Context);



  return (
    <div className="d-flex body-adm">
      <div id="sidebar-container" className="bg-primary" >
        <div className="logo">
          <h4 className="text-light font-weight-bold">Logo</h4>
        </div>
        <div className="menu">
        <div class="navbar-collapse text-light mr-2 p-3" id="navbarSupportedContent">
              <ul class="navbar-nav ml-auto">
                <li class="nav-item dropdown">

                  <a class="nav-link dropdown-toggle" role="button" data-toggle="dropdown" aria-expanded="false">
                    <i class="icon ion-md-person mr-2 "></i> Perfil
                  </a>
                  <div class="dropdown-menu">
                    <a class="dropdown-item" href="#">Mi perfil</a>
                    <a class="dropdown-item" href="#">Configuracion</a>
                    <div class="dropdown-divider"></div>
                    <Link to="/demo">
                    <a class="dropdown-item" href="#">Cerrar sesion</a>
                    </Link>
                  </div>
                </li>
              </ul>

            </div>
            <hr className="loco"></hr>
          <Link to="/adm">
            <a href="#" className="d-block text-light mr-2 p-3" ><i class="icon ion-md-apps mr-2 lead"></i>Tablero</a>
          </Link>
          <Link to="/adm1">
            <a href="#" className="d-block text-light mr-2 p-3"><i class="icon ion-md-people mr-2 lead"></i>Usuarios</a>
          </Link>
          <Link to="/stock"><a href="#" className="d-block text-light mr-2 p-3"><i class="icon ion-md-stats mr-2 lead"></i>Stocks</a></Link>


          


        </div>
        
      </div>
      <div className="w-100">
        <div className="container">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">

            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <form class="form-inline my-2 d-inline-block position-relative">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
              <button class="btn btn-search position-absolute" type="submit"><i class="icon ion-md-search"></i></button>
            </form>
              <p className="popo">Comer es mejor , si lo haces a tu gusto !</p>
           
          </nav>
          <div className="" id="content">
            <section className="py-3">
              <div className="container">
                <div className="row">
                  <div className="col-lg-9">
                    <h1 className="font-weight-bold-mb-0">Bienvenido al portal ADM</h1>
                    <p className="lead text-muted">Revisa tu informacion</p>
                  </div>
                  <div className="row row-panel">
                    <div className="col-md-9">
                      <div className="panel panel-default">
                        <div className="panel-heading">

                        </div>
                        <div className="panel panel-body">
                          <div className="col-md-3 info">
                            <div className="well dash-box">
                              <h2 className="name-info"><i class="icon ion-md-person"></i>&nbsp;508</h2>
                              <h4>Usuarios</h4>
                            </div>
                          </div>
                          <div className="col-md-3 info">
                            <div className="well dash-box">
                              <h2 className="name-info"><i class="icon ion-md-filing"></i>&nbsp;508</h2>
                              <h4>Productos</h4>
                            </div>
                          </div>
                          <div className="col-md-3 info">
                            <div className="well dash-box">
                              <h2 className="name-info"><i class="icon ion-md-card"></i>&nbsp;508</h2>
                              <h4>Ventas</h4>
                            </div>
                          </div>
                          <div className="col-md-3 info">
                            <div className="well dash-box">
                              <h2 className="name-info"><i class="icon ion-md-stats md-lead"></i>&nbsp;508</h2>
                              <h4>Visitantes</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 d-flex">

                  </div>
                </div>
              </div>
            </section>
            <section className="tablero">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
        </div>
      </div>

    </div>

  );
};

