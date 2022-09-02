import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/navbar.css";
import logo from "../../img/dogger_logo.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const home = "/";
  const login_page = "/login";
  const homeO = "/homedueno";
  const homeW = "/homecaminador";
  const chat = "/chat";
  const profile = "/userinfo";
  const reviewUrl = process.env.BACKEND_URL + "/api/reviews/";
  let navigate = useNavigate();

  const logout = () => {
    let token = localStorage.getItem("token");
    localStorage.removeItem("token");

    actions.handleLogOut();
    navigate(home);
  };
  const login = () => {
    navigate(login_page);
  };
  const msg = () => {
    navigate(chat);
  };
  const info = () => {
    navigate(profile);
  };

  const pfpstyle = {
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    objectFit: "cover",
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-xlg navbar-light">
        <div className="container">
          <div className="w-50">
            <Link to={"/"} id="logoText">
              <img id="logo" src={logo} />
              ogger
            </Link>
            <Link to={store.user_type == "owner" ? homeO : homeW}>
              <button
                type="button"
                className={
                  store.isLogedIn ? "btn btn-outline-secondary ms-3" : "d-none"
                }
              >
                Inicio
              </button>
            </Link>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-lg-0 align-items-end">
              <li className="nav-item">
                <button
                  onClick={login}
                  id="btn1"
                  className={
                    store.isLogedIn == true
                      ? "d-none"
                      : "btn rounded-pill m-1 btn-lg p-5s"
                  }
                >
                  Iniciar sesión
                </button>
              </li>
              {store.isLogedIn ? (
                <div>
                  <div className="col">
                    <Link to={"/profileUser"}>
                      <img

                        onClick={
                          store.user_type == "walker"
                            ? (actions.getReviews(reviewUrl, store.user.id),
                              actions.getUsers())
                            : ""
                        }
                        className="col rounded-circle"
                      
                        src={`${process.env.BACKEND_URL}/${store.user_type}/download/${store.user.file}`}
                        style={pfpstyle}
                      ></img>
                    </Link>
                  </div>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="navbarDropdown"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Perfil
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdown"
                    >
                      <li>
                        <button
                          className="dropdown-item text-muted"
                          onClick={info}
                        >
                          Edita tu perfil
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-muted"
                          onClick={msg}
                        >
                          Mensajes
                        </button>
                      </li>

                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-muted"
                          onClick={logout}
                        >
                          cerrar sesión
                        </button>
                      </li>
                    </ul>
                  </li>
                </div>
              ) : (
                <li className="nav-item">
                  <Link to={"/registrodueno"}>
                    <button
                      id="btn2"
                      className="btn rounded-pill m-1 btn-lg pr-1 pl-1"
                    >
                      Registrarse
                    </button>
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <hr className="light" />
    </div>
  );
};
