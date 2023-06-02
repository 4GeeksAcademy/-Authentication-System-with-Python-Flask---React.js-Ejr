import React from "react";
import { Link } from "react-router-dom";

export const Modal = () => {
	return (
		<div className="container">
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content bg-success" style={{background: "-webkit-linear-gradient(#4CB944, #4472CA)"}}>
                    <div className="modal-header">
                        <h1 className="modal-title text-light fs-5" id="exampleModalLabel">Inicia sesión!</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3 row">
                            <label htmlFor="inputEmail" className="col-sm-2 col-form-label text-light">Email</label>
                            <div className="col-sm-10">
                                <input type="email" className="form-control" id="inputEmail" placeholder="Escribe tu correo"></input>
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="inputPassword" className="col-sm-2 col-form-label text-light">Contraseña</label>
                            <div className="col-sm-10">
                                <input type="password" className="form-control" id="inputPassword" placeholder="Escribe tu contraseña"></input>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button px-4" className="btn btn-outline-warning" data-bs-dismiss="modal" style={{borderRadius:"33% 67% 32% 68% / 90% 9% 91% 10% "}}>Close</button>
                        <button type="button" className="btn btn-outline-info" style={{borderRadius:"33% 67% 32% 68% / 90% 9% 91% 10% "}}>Save changes</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>
	);
};
export default Modal;