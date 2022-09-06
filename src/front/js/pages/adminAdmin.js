import React from 'react'

const ResumenPanelAdmin = () => {
    return (

        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <div className="my-5">
                        <h3>Resumen Panel Admin</h3>
                        <hr />
                    </div>
                    <form className="file-upload">
                        <div className="row mb-5 gx-5">
                            <div className="col-xxl-8 mb-5 mb-xxl-0">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                        <h4 className="mb-4 mt-0">Detalles de Ordenes</h4>
                                        <div className="col-md-7">
                                            <label className="form-label">Cantidad de Ordenes </label>
                                            <input type="text" className="form-control" placeholder="" aria-label="First name" value="4XX" />
                                        </div>
                                        <div className="col-md-7">
                                            <label className="form-label">Cantidad de Usuarios</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Last name" value="4XX" />
                                        </div>

                                        <div className="col-md-7">
                                            <label className="form-label">Cantidad de Empresas</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Phone number" value="4XX" />
                                        </div>

                                        <div className="col-md-7">
                                        <p>Direcciones de Usuario</p>
                                            <div className="gap-3 d-inline-flex  justify-content-md-end text-center">
                                                <button type="button" className="btn btn-success btn-lg">Ver Direcciones de Usuario</button>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>


                        </div>
    
                    </form>
                </div>
            </div>
        </div>



    );
}


export default ResumenPanelAdmin;