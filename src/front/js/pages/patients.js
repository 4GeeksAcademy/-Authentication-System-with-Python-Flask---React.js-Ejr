import "../../styles/home.css";
import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";

export const Patients = () => {
    const { actions } = useContext(Context);
    const [showModal, setShowModal] = useState(false);
    const [userData, setUserData] = useState({
        role_id: 1,
        username: "",
        name: "",
        lastname: "",
        dni: "",
        phone: "",
        email: "",
        virtual_link: ""
    });
 
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            await actions.createUser(
                userData
            );
            closeModal();
            setUserData({
                role_id: 2,
                username: "",
                name: "",
                lastname: "",
                birth_date: "",
                phone: "",
                email: "",
                virtual_link: ""
            });
        } catch (error) {
            console.error("Error al crear usuario:", error.message);
        }
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
                                    <div className="mb-3">
                                        <label htmlFor="userName" className="col-form-label">Nombre de usuario:</label>
                                        <input type="text" className="form-control" id="userName" name="username" value={userData.username} onChange={handleChange} />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">    
                                        <div className="mb-3">
                                            <label htmlFor="name" className="col-form-label">Nombre:</label>
                                            <input type="text" className="form-control" id="name" name="name" value={userData.name} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="lastName" className="col-form-label">Apellido:</label>
                                            <input type="text" className="form-control" id="lastName" name="lastname" value={userData.lastname} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="dni" className="col-form-label">DNI:</label>
                                            <input type="text" className="form-control" id="dni" name="dni" value={userData.dni} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="phone" className="col-form-label">Telefono de contacto:</label>
                                            <input type="text" className="form-control" id="phone" name="phone" value={userData.phone} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="email" className="col-form-label">Email:</label>
                                            <textarea className="form-control" id="email" name="email" value={userData.email} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div className="mb-3">
                                            <label htmlFor="virtual_link" className="col-form-label">Link a sala vitual:</label>
                                            <textarea className="form-control" id="virtual_link" name="virtual_link" value={userData.virtual_link} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};