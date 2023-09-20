import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
        <div className="container-fluid">
          <div className="col d-flex">
            <Link to="/" className="navbar-brand text-white" href="#" onClick={() => { actions.vistaRegistro2() }} >
              Books Market
            </Link>            
            <Link to="/" className="nav-link active text-white" aria-current="page" onClick={() => { actions.vistaRegistro2() }}>
              Home 
            </Link>
          </div>


          {store.registro ? (
            <div className="col">
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-light" type="submit">
                  Search
                </button>
              </form>
            </div>
          ) : (
            <></>
          )}
          <div className="col">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-end">

              {store.registro ? (
                <li className="nav-item">
                  <a className="nav-link active text-white" aria-current="page" href="#">
                    Cart
                  </a>
                </li>
              ) : (
                <></>
              )}
              {store.registro ? (
                <li className="nav-item">
                  <a className="nav-link text-white" href="#">
                    Wish List
                  </a>
                </li>
              ) : (
                <></>
              )}
              {!!store.currentUser ? (
                <>
                  <li className="nav-item">
                    <span className="nav-link active text-white">{store.currentUser.email}</span>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      Mi Perfil
                    </Link>
                  </li>
                  <li>
                    <Link to="/profile" className="dropdown-item">
                      Publicar Libro
                    </Link>
                  </li>
                  <li className="nav-item" /* onClick={() => actions.logout()} */>
                    Cerrar sesión
                  </li>
                </>
              ) : (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {store.registro ? "Iniciar sesión/Registrarse" : "Iniciar sesión"}
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="/login" className="dropdown-item" onClick={() => { actions.vistaRegistro() }}>
                        Iniciar sesión
                      </Link>
                    </li>
                    <li>
                      <Link to="/formularioRegistro" className="dropdown-item" onClick={() => { actions.vistaRegistro() }}>
                        Registrar
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </li>
              )
              }
            </ul>
          </div>
        </div>
      </nav>
      {store.registro ? (
        <nav className="navbar navbar-expand-lg bg-body-tertiary bg-dark">
          <div className="container-fluid d-flex justify-content-around">
            <div className="">
              <Link to="/libroVenta" className="nav-link active text-white" aria-current="page">
                Libros en Venta
              </Link>
            </div>
            <div className="">
              <Link to="/librosIntercambio" className="nav-link active text-white" aria-current="page">
                Libros para intercambio
              </Link>
            </div>
            <div className="">
              <Link to="/masVendidos" className="nav-link active text-white" aria-current="page">
                Libros más vendidos
              </Link>
            </div>
            <div className="">
              <Link to="/donacionesRalizadas" className="nav-link active text-white" aria-current="page">
                Donaciones realizadas
              </Link>
            </div>
          </div>
        </nav>

      ) : (
        <></>
      )}

    </div>
  );
};

