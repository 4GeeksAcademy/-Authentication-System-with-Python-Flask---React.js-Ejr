import React from "react";

export const Search = () => {
  return (
    <div className="mask d-flex align-items-center">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10 col-lg-8 col-xl-7 mx-auto">
            <div className="card mb-2">
              <div className="card-body p-2">
                <div className="input-group input-group-lg">
                  <input
                    type="text"
                    className="form-control form-control-lg rounded"
                    placeholder="Busca a tu Influencer"
                    aria-label="Type Keywords"
                    aria-describedby="basic-addon2"
                  />
                  <span className="input-group-text border-0" id="basic-addon2">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="card bg-black">
              <div className="card-body p-4">
                <h6 className="text-white">Busqueda Avanzada</h6>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <div class="dropdown">
                      <button
                        class="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Sectores
                      </button>
                      <ul
                        class="dropdown-menu"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <li>
                          <a class="dropdown-item" href="#">
                            Moda
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            Mamá y Premamá
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            Fitness y Salud
                          </a>
                        </li>
                        <li>
                          <a class="dropdown-item" href="#">
                            Automoción
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="dropdown">
                    <button
                        class="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Seguidores
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuLink1"
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            Menos de 100.000
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Hasta 500.000
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Entre 500.000 y 1 millón
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Mas de 1 millón
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="dropdown">
                    <button
                        class="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Ubicación
                      </button>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuLink2"
                      >
                        <li>
                          <a className="dropdown-item" href="#">
                            Madrid
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Barcelona
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Islas Canarias
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mt-4">
                  <div>
                    <button
                      type="button"
                      className="btn btn-link text-white"
                      data-mdb-ripple-color="dark"
                    >
                      Reset
                    </button>
                    <button type="button" className="btn btn-warning">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
