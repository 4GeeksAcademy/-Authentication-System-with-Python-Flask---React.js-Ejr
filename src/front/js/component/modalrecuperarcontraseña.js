import React from "react";


export const ModalRecuperarContraseña = () => {
    return (
        <>
            <span type="button" className="btn text-primary justify-content-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
                ¿Olvidaste tu contraseña?
            </span>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Ayuda de contraseña</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p>Introduzca la dirección de correo electrónico asociado a su cuenta de Friendly Wheels.</p>
                            <label htmlFor="exampleInputEmail1" className="form-label fw-bold">E-mail</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" placeholder="name@example.com"/>
                        </div>
                        <div className="modal-footer justify-content-center">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Recuperar Contraseña</button>
                        </div>
                    </div>
                </div>
            </div> 
        </>
    );
};