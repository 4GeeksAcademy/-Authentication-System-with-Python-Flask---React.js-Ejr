import "../../styles/home.css";
import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";

export const Patients = () => {
    const [showModal, setShowModal] = useState(false);
    const openModal = () => {
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end mb-3">
                <button type="button" className="btn btn-primary" onClick={openModal}>Agregar Paciente</button>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Fecha de Nacimiento</th>
                        <th>Contacto</th>
                        <th>Sala Virtual</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>20/05/1992</td>
                        <td>123-456-7890</td>
                        <td></td>
                        <td>Activo / Inactivo</td>
                    </tr>
                    <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>20/05/1992</td>
                        <td>123-456-7890</td>
                        <td></td>
                        <td>Activo / Inactivo</td>
                    </tr>
                    <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>20/05/1992</td>
                        <td>123-456-7890</td>
                        <td></td>
                        <td>Activo / Inactivo</td>
                    </tr>
                    <tr>
                        <td>John</td>
                        <td>Doe</td>
                        <td>20/05/1992</td>
                        <td>123-456-7890</td>
                        <td></td>
                        <td>Activo / Inactivo</td>
                    </tr>
                </tbody>
            </table>

            <div className={`modal fade ${showModal ? 'show' : ''}`} style={{ display: showModal ? 'block' : 'none' }} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Nuevo paciente</h1>
                            <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="row">
                                    <div className="col-6">    
                                        <div className="mb-3">
                                            <label htmlFor="name" className="col-form-label">Nombre:</label>
                                            <input type="text" className="form-control" id="name" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="lastName" className="col-form-label">Apellido:</label>
                                            <input type="text" className="form-control" id="lastName" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="birth_date" className="col-form-label">Fecha de nacimiento:</label>
                                            <input type="text" className="form-control" id="birth_date" />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="phone" className="col-form-label">Telefono de contacto:</label>
                                            <input type="text" className="form-control" id="phone" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="email" className="col-form-label">Email:</label>
                                            <textarea className="form-control" id="email"></textarea>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="virtual_link" className="col-form-label">Link a sala vitual:</label>
                                            <textarea className="form-control" id="virtual_link"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary">Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};