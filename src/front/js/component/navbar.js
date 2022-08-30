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
  const chatRoute = "/chat";
  const homeO = "/homedueno";
  const homeW = "/homecaminador";
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
  const chat = () => {
    navigate(chatRoute);
  };

  const pfpstyle = {
    width: "75px",
    height: "75px",
  };

  return (
    <div className="container">
      <nav className="navbar navbar-expand-xlg navbar-light">
        <div className="container">
          <Link to={"/"} id="logoText">
            <img id="logo" src={logo} />
            ogger
          </Link>
          <Link to={store.user_type == "owner" ? homeO : homeW}>
            <button type="button" class="btn btn-light">
              home
            </button>
          </Link>
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
                  onClick={store.isLogedIn === false ? login : logout}
                  id="btn1"
                  className="btn rounded-pill m-1 btn-lg p-5s"
                >
                  {store.log}
                </button>
              </li>
              {store.isLogedIn ? (
                <div>
                  <div className="col rounded-circle">
                    <Link to={"/profileUser"}>
                      <img
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
                        <a className="dropdown-item" href="#">
                          Edita tu perfil
                        </a>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li>
                        <button
                          type="button"
                          className="btn btn-primary ms-3"
                          onClick={chat}
                        >
                          mensajes <span className="badge bg-secondary">4</span>
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
