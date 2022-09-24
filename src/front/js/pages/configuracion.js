import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/adm.css";
import { Context } from "../store/appContext";

export const Configuracion = () => {
    const { store, actions } = useContext(Context);



    return (
        <div className="d-flex body-adm">
            <div id="sidebar-container" className="bg-primary" >
                <div className="logo">
                    <h4 className="text-light font-weight-bold">Logo</h4>
                </div>
                <div className="menu">
                    <Link to="/adm">
                        <a href="#" className="d-block text-light mr-2 p-3" ><i class="icon ion-md-apps mr-2 lead"></i>Tablero</a>
                    </Link>
                    <Link to="/adm1">
                        <a href="#" className="d-block text-light mr-2 p-3"><i class="icon ion-md-people mr-2 lead"></i>Usuarios</a>
                    </Link>
                    <Link to="/stock"><a href="#" className="d-block text-light mr-2 p-3"><i class="icon ion-md-stats mr-2 lead"></i>Stocks</a></Link>
                    <Link to="/perfil"><a href="#" className="d-block text-light mr-2 p-3"><i class="icon ion-md-person mr-2 lead"></i>Perfil</a></Link>
                    <Link to="/configuracion"><a href="#" className="d-block text-light mr-2 p-3"><i class="icon ion-md-settings mr-2 lead"></i>Configuracion</a></Link>
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
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul class="navbar-nav ml-auto">
                                <li class="nav-item dropdown">
                                    <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-expanded="false">
                                        <i class="icon ion-md-person mr-2 "></i> Usuario
                                    </a>
                                    <div class="dropdown-menu">
                                        <a class="dropdown-item" href="#">Mi perfil</a>
                                        <a class="dropdown-item" href="#">Configuracion</a>
                                        <div class="dropdown-divider"></div>
                                        <a class="dropdown-item" href="#">Cerrar sesion</a>
                                    </div>
                                </li>
                            </ul>

                        </div>

                    </nav>
                    <div className="" id="content">
                        <section className="py-3">
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-9">

                                        <p className="lead text-muted">Estas en Configuracion</p>
                                    </div>
                                    <div className="col-lg-3 d-flex">

                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="tablero-info">


                        </section>
                    </div>
                </div>
            </div>

        </div>

    );
};

