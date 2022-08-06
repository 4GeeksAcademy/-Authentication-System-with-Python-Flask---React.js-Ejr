import React from 'react'

const PerfilUsuario = () => {
    return (

        <div className="container mt-5">
            <div className="row">
                <div className="col-12">
                    <div className="my-5">
                        <h3>Mi Perfil</h3>
                        <hr/>
                    </div>
                    <form className="file-upload">
                        <div className="row mb-5 gx-5">
                            <div className="col-xxl-8 mb-5 mb-xxl-0">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                        <h4 className="mb-4 mt-0">Detalles de Contacto</h4>
                                        <div className="col-md-6">
                                            <label className="form-label">Nombre *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="First name" value="Juan"/>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Apellido *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Last name" value="Perez"/>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Telefono *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Phone number" value="(569) 9874 56XX"/>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Dirección *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Phone number" value="Dirección"/>
                                        </div>
                                        <div className="col-md-6">
                                            <label for="inputEmail4" className="form-label">Email *</label>
                                            <input type="email" className="form-control" id="inputEmail4" value="ejemplo@correo.com"/>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Skype *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Phone number" value="jperez"/>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <div className="col-xxl-4">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                        <h4 className="mb-4 mt-0">Sube tu foto de Perfil</h4>
                                        <div className="text-center">
                                            <div className="square position-relative display-2 mb-3">
                                                <i className="fas fa-fw fa-user position-absolute top-50 start-50 translate-middle text-secondary"></i>
                                            </div>
                                            <input type="file" id="customFile" name="file" hidden=""/>
                                                <label className="btn btn-success-soft btn-block" for="customFile">Subir</label>
                                                <button type="button" className="btn btn-danger-soft">Quitar</button>
                                                <p className="text-muted mt-3 mb-0"><span className="me-1">Nota:</span>Tamaño Minimop 300px x 300px</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 

                        <div className="row mb-5 gx-5">
                            <div className="col-xxl-6 mb-5 mb-xxl-0">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                        <h4 className="mb-4 mt-0">Redes Sociales </h4>
                                        <div className="col-md-6">
                                            <label className="form-label"><i className="fab fa-fw fa-facebook me-2 text-facebook"></i>Facebook *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Facebook" value="http://www.facebook.com"/>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label"><i className="fab fa-fw fa-twitter text-twitter me-2"></i>Twitter *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Twitter" value="http://www.twitter.com"/>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label"><i className="fab fa-fw fa-linkedin-in text-linkedin me-2"></i>Linkedin *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Linkedin" value="http://www.linkedin.com"/>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label"><i className="fab fa-fw fa-instagram text-instagram me-2"></i>Instagram *</label>
                                            <input type="text" className="form-control" placeholder="" aria-label="Instragram" value="http://www.instagram.com"/>
                                        </div>
                                    </div> 
                                </div>
                            </div>

                            <div className="col-xxl-6">
                                <div className="bg-secondary-soft px-4 py-5 rounded">
                                    <div className="row g-3">
                                        <h4 className="my-4">Cambiar Contraseña</h4>
                                        <div className="col-md-6">
                                            <label for="exampleInputPassword1" className="form-label">Contraseña Antigua *</label>
                                            <input type="password" className="form-control" id="exampleInputPassword1"/>
                                        </div>
                                        <div className="col-md-6">
                                            <label for="exampleInputPassword2" className="form-label">Contraseña Nueva *</label>
                                            <input type="password" className="form-control" id="exampleInputPassword2"/>
                                        </div>
                                        <div className="col-md-12">
                                            <label for="exampleInputPassword3" className="form-label">Confirmar Contraseña *</label>
                                            <input type="password" className="form-control" id="exampleInputPassword3"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div className="gap-3 d-md-flex justify-content-md-end text-center">
                            <button type="button" className="btn btn-danger btn-lg">Eliminar Perfil</button>
                            <button type="button" className="btn btn-primary btn-lg">Actualizar Perfil</button>
                        </div>
                    </form> 
                </div>
            </div>
        </div>
    );
}


export default PerfilUsuario;