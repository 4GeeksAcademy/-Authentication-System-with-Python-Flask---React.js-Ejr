import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactSwitch from "react-switch";
import { ThemeContext } from "../layout";
import { Context } from "../store/appContext";
import ReactModal from 'react-modal'
import { useNavigate } from "react-router-dom";
import { Login } from "../pages/login";
import { SwitchLight } from "./switchLight";

export const Navbar = () => {
  const { store, actions, token } = useContext(Context);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const handleLogOut = () => {
    localStorage.removeItem("token")
    store.token = ""
  }

  const handleEmailChange = e => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = e => {
    setPassword(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await actions.login(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
      navigate("/notfound");
    }
  };

  useEffect(() => {
    const checkScreenWidth = () => {
      setIsSmallScreen(window.innerWidth < 993);
    };

    checkScreenWidth();
    window.addEventListener("resize", checkScreenWidth);

    return () => {
      window.removeEventListener("resize", checkScreenWidth);
    };
  }, []);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const showSwitchBigScreen = () => {
    return window.innerWidth >= 993 && <SwitchLight />;
  }

  const showSwitchMobile = () => {
    return isSmallScreen && <SwitchLight />;
  }

  const showModal = () => {
    return (
      <div className="modalLogin">
        <ReactModal
          style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(170, 190, 214, 0.75)',
              backdropFilter: 'blur(8px) saturate(180%)',
              WebkitBackdropFilter: 'blur(16px) saturate(180%)',
            },
            content: {
              position: 'absolute',
              top: '40px',
              left: '40px',
              right: '40px',
              bottom: '40px',
              border: '1px solid rgba(209, 213, 219, 0.3)',
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              borderRadius: '12px',
              outline: 'none',
              padding: '20px',
              overflow: 'auto',
              WebkitOverflowScrolling: 'touch',
            },
          }}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Login Modal"
        >
          <Login onSubmit={handleSubmit} />
        </ReactModal>
      </div>
    );
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid mx-3">
        <div>
          <a className="navbar-brand tittle-nav" id="tittle-nav" href="/">
            WhataCar
          </a>
        </div>

        <div className="justify-content-end d-flex">
          <div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNavDropdown"
            >
              <ul className="navbar-nav ml-auto align-items-end">
                {!token ? (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link active me-3"
                        style={{ color: "rgb(15, 76, 117)" }}
                        aria-current="page"
                        to="/signup"
                      >
                        Registro
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link active me-3"
                        style={{ color: "rgb(15, 76, 117)" }}
                        aria-current="page"
                        to="/login"
                      >
                        Accede
                      </Link>
                    </li>
                    {showSwitchMobile()}
                  </>
                ) : (
                  <>
                    <li className="nav-item ">
                      <Link
                        className="nav-link active me-3"
                        id="heart"
                        href="#"
                        role="button"
                        aria-expanded="page"
                        to="/profile"
                      >
                        <i className="fa-regular fa-heart"></i>
                      </Link>
                    </li>

                    <li className="nav-item">
                      {!token ? (
                        <button
                          className="nav-link btn-plus mb-2 me-3"
                          onClick={openModal}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      ) : (
                        <Link to="/products">
                          <button className="nav-link btn-plus mb-2">
                            <i className="fa-solid fa-plus"></i>
                          </button>
                        </Link>
                      )}
                    </li>
                    {showSwitchMobile()}
                    <li className="nav-item dropdown me-3">
                      <Link
                        className="nav-link dropdown-toggle justify-content-end d-flex "
                        href="#"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        to="profile"
                      >
                        <i className="fa-regular fa-user" id="iconProfile"></i>
                      </Link>
                      <ul className="dropdown-menu ">
                        <li>
                          <a
                            className="dropdown-item justify-content-end d-flex "
                            href="/profile"
                          >
                            Mi perfil
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item justify-content-end d-flex "
                            href="/configuration"
                          >
                            Configuración
                          </a>
                        </li>
                        <li>
                          <a
                            className="dropdown-item justify-content-end d-flex "
                            href="favorites"
                          >
                            Favoritos
                          </a>
                        </li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <a
                            className="dropdown-item justify-content-end d-flex "
                            href="/"
                            style={{ color: "red" }}
                            onClick={handleLogOut}
                          >
                            Salir
                          </a>
                        </li>
                      </ul>
                    </li>
                  </>
                )}
              </ul>
              
            </div>
          </div>
          {showSwitchBigScreen()}
        </div>
      </div>
      {modalIsOpen && showModal()}
    </nav>
  );
};
