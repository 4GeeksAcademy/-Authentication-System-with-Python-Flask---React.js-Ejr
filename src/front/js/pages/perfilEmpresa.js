import React from "react";
import { Link } from "react-router-dom";

const PerfilEmpresa = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <div className="my-5">
            <h3>Perfil Empresa</h3>
            <hr />
          </div>
          <form className="file-upload">
            <div className="row mb-5 gx-5">
              <div className="col-xxl-8 mb-5 mb-xxl-0">
                <div className="bg-secondary-soft px-4 py-5 rounded">
                  <div className="row g-3">
                    <h4 className="mb-4 mt-0">Detalles de Empresa</h4>
                    <div className="col-md-6">
                      <label className="form-label">Nombre Fantasia *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="First name"
                        value="Thorben"
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Razon Social *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="Last name"
                        value="Thorben SPA"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">RUT *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="Phone number"
                        value="76.777.777.-7"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Dirección *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="Phone number"
                        value="Dirección"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label">Telefono *</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label="Phone number"
                        value="(569) 9874 56XX"
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail4" className="form-label">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail4"
                        value="ejemplo@correo.com"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xxl-4">
                <div className="bg-secondary-soft px-4 py-5 rounded">
                  <div className="row g-3">
                    <h4 className="mb-4 mt-0">Logo Empresa</h4>
                    <div className="text-center">
                      <div className="square position-relative display-2 mb-3">
                        <i className="fas fa-fw fa-user position-absolute top-50 start-50 translate-middle text-secondary"></i>
                      </div>
                      <input
                        type="file"
                        id="customFile"
                        name="file"
                        hidden=""
                      />
                      <label
                        className="btn btn-success-soft btn-block"
                        for="customFile"
                      >
                        Subir
                      </label>
                      <button type="button" className="btn btn-danger-soft">
                        Quitar
                      </button>
                      <p className="text-muted mt-3 mb-0">
                        <span className="me-1">Nota:</span>Tamaño Minimop 300px x
                        300px
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-6">
              <div className="bg-secondary-soft px-4 py-5 rounded">
                <div className="row g-3">
                  <h4 className="my-4">Cambiar Contraseña</h4>
                  <div className="col-md-6">
                    <label for="exampleInputPassword1" className="form-label">
                      Contraseña Antigua *
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="col-md-6">
                    <label for="exampleInputPassword2" className="form-label">
                      Contraseña Nueva *
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword2"
                    />
                  </div>
                  <div className="col-md-12">
                    <label for="exampleInputPassword3" className="form-label">
                      Confirmar Contraseña *
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputPassword3"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="gap-3 d-md-flex justify-content-md-end text-center">
              <button type="button" className="btn btn-danger btn-lg">
                Eliminar Perfil Empresa
              </button>
              <button type="button" className="btn btn-primary btn-lg">
                Actualizar Perfil Empresa
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PerfilEmpresa;
