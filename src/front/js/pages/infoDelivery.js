import React from "react";
import { Link } from "react-router-dom";

const DireccionesUsuario = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12 mt-5">
          <div className="my-5">
            <h3>Direcciones de Usuario</h3>
            <hr />
          </div>
          <form className="file-upload">
            <div className="row mb-5 gx-5">
              <div className="col-xxl-8 mb-5 mb-xxl-0">
                <div className="bg-secondary-soft px-4 py-5 rounded">
                  <div className="row g-3">
                    <div className="col-md-7">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Apellido</th>
                            <th scope="col">Dirección</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Juan</td>
                            <td>Perez</td>
                            <td>Perico Los Palotes #4564, Melipilla</td>
                          </tr>
                        </tbody>
                      </table>

                      <hr />
                      <div className="gap-3 d-inline-flex  justify-content-md-end text-center">
                        <button
                          type="button"
                          className="btn btn-success btn-lg"
                        >
                          Volver
                        </button>
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
};

export default DireccionesUsuario;
