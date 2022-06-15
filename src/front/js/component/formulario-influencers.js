import React, { Component } from "react";

export const FormInfluencers = () => (
    <div className="container-fluid m-0 p-0">
        <div className="container-fluid m-auto row" id="influencer-bg">
            <div className="col-6"></div>
            <div className="col-6 m-auto "><p className="h2 text-end">¡Enhorabuena!<br />Estás a un paso de que<br />empresas afines a tí<br />te encuentren</p></div>
        </div>
        <div className="container-fluid pt-5">
            <p class="h1 text-center my-5">Tus Datos</p>
            <div className="container row d-flex justify-content-center text-end mx-auto mb-3">
                <div className="col">
                    <div class="mb-3 row">
                        <label for="email" class="col-sm-3 col-form-label">Email</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="email" />
                        </div>

                    </div>
                    <div class="mb-3 row">
                        <label for="apellidos" class="col-sm-3 col-form-label">Apellidos</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="apellidos" />
                        </div>

                    </div>
                    <div class="mb-3 row">
                        <label for="categoria" class="col-sm-3 col-form-label">Categoria</label>
                        <div class="col-sm-9">
                            <input type="text" class="form-control" id="categoria" />
                        </div>

                    </div>

                </div>
                <div className="col">
                    <div class="mb-3 row">
                        <label for="password" class="col-sm-5 col-form-label">Contraseña</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="password" />
                        </div>

                    </div>
                    <div class="mb-3 row">
                        <label for="nombre" class="col-sm-5 col-form-label">Nombre</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="nombre" />
                        </div>

                    </div>
                    <div class="mb-3 row">
                        <label for="pais" class="col-sm-5 col-form-label">País</label>
                        <div class="col-sm-7">
                            <input type="text" class="form-control" id="pais" />
                        </div>

                    </div>

                </div>
                <div className="col">
                    <div class="mb-3 row">
                        <label for="rep-password" class="col-sm-6 col-form-label">Repite contraseña</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="rep-password" />
                        </div>

                    </div>
                    <div class="mb-3 row">
                        <label for="ig-user" class="col-sm-6 col-form-label">Usuario Instagram</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="ig-user" />
                        </div>

                    </div>
                    <div class="mb-3 row">
                        <label for="ciudad" class="col-sm-6 col-form-label">Ciudad</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="ciudad" />
                        </div>

                    </div>

                </div>
            </div>
            <div className="container row d-flex justify-content-center mx-auto my-5 py-3">
                <div className="col-8">
                    <p className="text-center">Enlace a posts de promociones que hayas hecho como influencer (máximo 6)</p>
                    <div className="d-flex ">
                        <input class="form-control" type="text" placeholder="Pega aquí el enlace a tu post" aria-label="default input example" id="ig-link" /><i class="fas fa-plus m-auto ms-3"></i>
                    </div>

                    <div className="text-center mt-3" id="mostrar-ig-links">
                    </div>

                </div>
            </div>
            <div className="container-fluid row text-center mx-0 py-3">
                <div class="mb-3 col-8 mx-auto">
                    <label for="exampleFormControlTextarea1" class="form-label">Cuéntanos un poco más de ti</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
            </div>
            <div className="button-container my-5 d-flex justify-content-center pb-5">
                <button type="button" class="btn btn-danger btn-sm col-1 me-3">Borrar</button>
                <button type="button" class="btn btn-success btn-sm col-1 ms-3">Enviar</button>
            </div>
        </div>
    </div>
);
