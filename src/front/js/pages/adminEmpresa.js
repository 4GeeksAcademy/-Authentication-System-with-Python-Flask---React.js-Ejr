import React from 'react'
import { Link } from 'react-router-dom';


const AdminEmpresa = () => {
    return (

        <div className="container mt-5">
            <div className="row">
                <div className="col-12 mt-5">
                    <div className="my-5">
                        <h3>Admin Empresa</h3>
                        <hr />
                    </div>
                    <form className="file-upload">
                        <div className="row mb-5 gx-5">
                            <div className="col-xxl-8 mb-5 mb-xxl-0">
                                <div className="row g-3 px-4">
                                    <div className="col-md-6">
                                        <label className="form-label">Buscar Empleado </label>
                                        <input type="text" className="form-control" placeholder="" aria-label="First name" value="Buscar" />
                                    </div>
                                </div>

                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                        <h4 className="mb-4 mt-0">Empleado</h4>
                                        <div className="col-md-6">
                                            <label className="form-label">Nombre *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="First name" value="Juan Carlos" />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Apellido *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Last name" value="Perez Moya" />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">RUT *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Phone number" value="16.666.666-6" />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Dirección *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Phone number" value="Dirección" />
                                        </div>

                                        <div className="col-md-6">
                                            <label className="form-label">Telefono *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Phone number" value="(569) 9874 56XX" />
                                        </div>
                                        <div className="col-md-6">
                                            <label for="inputEmail4" className="form-label">Email *</label>
                                            <input type="email" className="form-control" id="inputEmail4" value="ejemplo@correo.com" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="gap-3 d-md-flex justify-content-md-end text-center mb-5">
                            <button type="button" className="btn btn-danger btn-lg">Eliminar Empleado</button>
                            <button type="button" className="btn btn-primary btn-lg">Actualizar / Agregar Empleado</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>



    );
}


export default AdminEmpresa;