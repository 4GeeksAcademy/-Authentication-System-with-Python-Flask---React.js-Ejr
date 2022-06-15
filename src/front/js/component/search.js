import React from "react";

export const Search = () => {
  return (
    <div className="mask d-flex align-items-center my-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10 col-lg-8 col-xl-12 mx-auto rounded">
            <div className="card mb-2 mb-5">
              <div className="card-body p-2">
                <div className="input-group input-group-lg">
                  <input type="text" className="form-control form-control-lg rounded" placeholder="Busca a tu Influencer" aria-label="Type Keywords" aria-describedby="basic-addon2"/>
                  <span className="input-group-text border-0" id="basic-addon2">
                    <i className="fas fa-search"></i>
                  </span>
                </div>
              </div>
            </div>
            <div className="card bg-dark">
              <div className="card-body p-3">
                <h6 className="text-white">Busqueda Avanzada</h6>
                <div className="row">
                  <div className="col-md-2 mb-2 ms-5">
                    <div class="dropdown">
                      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Sectores</button>
                      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
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
                  <div className="col-md-2 mb-2">
                    <div className="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"> Seguidores </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink1">
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
                  <div className="col-md-3 mb-2">
                    <div className="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"> Precio por Publicación </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink1">
                        <li>
                          <a className="dropdown-item" href="#">
                            0€ - 100€
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            100€ - 300€
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            300€ - 500€
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            + 500€
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-2 mb-2">
                    <div className="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false"> Ubicación </button>
                      <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink2">
                        <li>
                          <a className="dropdown-item" href="#">
                            Andalucía
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Aragón
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Asturias
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Islas Baleares
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Canarias
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Cantabria
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Castilla y León
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Castilla-La Mancha
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Cataluña
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Comunidad Valenciana
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Extremadura
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Galicia
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Comunidad de Madrid
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Región de Murcia
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Comunidad de Navarra
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            País Vasco
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            La Rioja
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Ciudad Autónoma de Ceuta
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="#">
                            Ciudad Autónoma de Melilla
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-md-2 pe-1 ms-5">
                    <button type="button" className="btn btn-link text-white" data-mdb-ripple-color="dark"> Reiniciar </button>
                    <button type="button" className="btn btn-warning fw-bold"> Buscar </button>
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
