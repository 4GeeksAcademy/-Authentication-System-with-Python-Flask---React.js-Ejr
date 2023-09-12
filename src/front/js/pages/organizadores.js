import React from "react";
import "../../styles/organizadores.css";
import img5 from "../../img/organizadores/img5.jpg";
import img6 from "../../img/organizadores/img6.jpg";
import img8 from "../../img/organizadores/img8.jpg";
import { Link } from "react-router-dom";

const Organizadores = () => {

    return (
        <div class="container" id="organizadores">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-6 order-2 order-md-1 mt-4 pt-2 mt-sm-0 opt-sm-0">
                    <div class="row align-items-center">
                        <div class="col-lg-6 col-md-6 col-6">
                            <div class="row">
                                <div class="col-lg-12 col-md-12 mt-4 pt-2">
                                    <div class="card work-desk rounded border-0 shadow-lg overflow-hidden">
                                        <img src={img6} class="img-fluid" alt="Image" />
                                        <div class="img-overlay bg-dark"></div>
                                    </div>
                                </div>

                                <div class="col-12">

                                </div>
                            </div>
                        </div>

                        <div class="col-lg-6 col-md-6 col-6">
                            <div class="row">
                                <div class="col-lg-12 col-md-12">
                                    <div class="card work-desk rounded border-0 shadow-lg overflow-hidden">
                                        <img src={img8} class="img-fluid" alt="Image" />
                                        <div class="img-overlay bg-dark"></div>
                                    </div>
                                </div>

                                <div class="col-lg-12 col-md-12 mt-4 pt-2">
                                    <div class="card work-desk rounded border-0 shadow-lg overflow-hidden">
                                        <img src={img5} class="img-fluid" alt="Image" />
                                        <div class="img-overlay bg-dark"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-6 col-md-6 col-12 order-1 order-md-2">
                    <div class="section-title ml-lg-5">
                        <h5 class="text-custom font-weight-normal mb-3">¿Organizas Eventos Deportivos?</h5>
                        <h4 class="title mb-4">
                            Nuestra misión <br />
                            es hacerte la vida más fácil.
                        </h4>
                        <p class="text-muted mb-0">Crea tus eventos deportivos en nuestra plataforma y organízalos de manera digital.
                            Integra todo en un sólo sitio. Con nuestro plan de comisiones no cobramos cuota por registrarte en nuestro sitio web.</p>
                        <div class="mt-2 text-center">
                            <Link to="/perfil">
                                <a class="btn btn-primary">Regístrate Gratis <i class="mdi mdi-chevron-right"></i></a>
                            </Link>
                        </div>
                        <div class="row">
                            <div class="col-lg-6 mt-4 pt-2">
                                <div class="media align-items-center rounded shadow p-3">
                                    <i class="fa fa-image h4 mb-0 text-custom"></i>
                                    <h6 class="ml-3 mb-0">Publica tus eventos</h6>
                                </div>
                            </div>
                            <div class="col-lg-6 mt-4 pt-2">
                                <div class="media align-items-center rounded shadow p-3">
                                    <i class="fa fa-file-download h4 mb-0 text-custom"></i>
                                    <h6 class="ml-3 mb-0">Registra los equipos</h6>
                                </div>
                            </div>
                            <div class="col-lg-6 mt-4 pt-2">
                                <div class="media align-items-center rounded shadow p-3">
                                    <i class="fa fa-user h4 mb-0 text-custom"></i>
                                    <h6 class="ml-3 mb-0">Cobra la inscripción</h6>
                                </div>
                            </div>
                            <div class="col-lg-6 mt-4 pt-2">
                                <div class="media align-items-center rounded shadow p-3">
                                    <i class="fa fa-play h4 mb-0 text-custom"></i>
                                    <h6 class="ml-3 mb-0">Organiza los juegos</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Organizadores;