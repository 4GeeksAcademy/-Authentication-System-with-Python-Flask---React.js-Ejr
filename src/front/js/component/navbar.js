import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

    const handleDeleteFavorite = (item) => {
        actions.removeFavorite(item);
    };


  return (
    <nav
      className="navbar"
      style={{ backgroundColor: "#6793AE", height: "120px" }}
    >
      <div className="container-fluid">
        <Link to={""} className="navbar-brand">
          <img
            src="/docs/5.3/assets/brand/bootstrap-logo.svg"
            alt="Bootstrap"
            width="30"
            height="24"
          />
        </Link>

        <div className="navbar navbar-expand-lg ms-auto">
          <div className="container-fluid">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div className="navbar-nav me-auto">
                <Link
                  to={"/"}
                  className="nav-link active me-3"
                  style={{ color: "white" }}
                >
                  INICIO
                </Link>
                {store.programador && (
                  <Link
                    to={"/timeline"}
                    className="nav-link active me-3"
                    style={{ color: "white" }}
                  >
                    OFERTAS
                  </Link>
                )}
                {store.empleador && (
                  <Link
                    to={"/formoffer"}
                    className="nav-link active me-3"
                    style={{ color: "white" }}
                  >
                    CREAR OFERTA
                  </Link>
                )}

                {!store.user ? (
                  <>
                    <button
                      type="button"
                      onClick={() => navigate("/login")}
                      className="btn rounded-pill me-4"
                      style={{
                        backgroundColor: "#70879C",
                        borderColor: "#70879C",
                        color: "white",
                      }}
                    >
                      INICIAR SESIÓN
                    </button>
                    <button
                      type="button"
                      className="btn rounded-pill me-3"
                      style={{
                        backgroundColor: "white",
                        borderColor: "white",
                        color: "#70879C",
                      }}
                      onClick={() => navigate("/register")}
                    >
                      REGISTRARSE
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="btn rounded-pill me-3"
                      style={{
                        backgroundColor: "white",
                        borderColor: "white",
                        color: "#70879C",
                      }}
                    >
                      Usuario: {store.user.name}
                    </button>
                    <button onClick={()=> actions.logOut()}
                      type="button"
                      className="btn rounded-pill me-3"
                      style={{
                        backgroundColor: "#70879C",
                        borderColor: "white",
                        color: "white",
                      }}
                    >
                      Cerrar Sesión
                    </button>
                  </>
                )}
                <div className="dropdown">
                        <button className="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            Favorites <span className="badge badge-light">{store.favorites.length}</span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                            {store.favorites.length === 0 ? (
                                <li><span className="dropdown-item">No favorites</span></li>
                            ) : (
                                store.favorites.map((favorite, index) => (
                                    <li key={index} className="d-flex justify-content-between align-items-center">
                                        <span className="dropdown-item">{favorite}</span>
                                        <button className="btn btn-outline-danger btn-sm" style={{marginRight: "15px"}}onClick={() => handleDeleteFavorite(favorite)}><i className="fa fa-trash"></i></button>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
              </div>
            </div>
          </div>
        </div>

        <button
          className="navbar-toggler navHamburguer"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
        >
          <span className="fa-solid fa-bars text-white"></span>
        </button>
        <div
          className="offcanvas offcanvas-end text-bg-dark"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  style={{ color: "#6793AE", marginTop: "115px" }}
                  aria-current="page"
                  to="/sobrenosotros"
                >
                  Sobre nosotros
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  style={{ color: "#6793AE", marginTop: "20px" }}
                  aria-current="page"
                  to="/contact"
                >
                  Contáctanos
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  style={{ color: "#6793AE", marginTop: "20px" }}
                  aria-current="page"
                  to="/preguntasFrecuentes"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
