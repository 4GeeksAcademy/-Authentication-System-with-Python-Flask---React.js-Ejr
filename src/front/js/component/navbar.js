import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactSwitch from "react-switch";
import { ThemeContext } from "../layout";
import { Context } from "../store/appContext";
import ReactModal from 'react-modal'
import { useNavigate } from "react-router-dom";
import { Login } from "../pages/login";
import { SwitchLight } from "./switchLight";
import  "../../styles/navbar.css"
import  "../../styles/index.css"

export const Navbar = () => {
  const { store, actions, token } = useContext(Context);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [dropMenu, setDropMenu] = useState("container-fluid mx-1");
  const [ariaExpanded, setAriaExpanded] = useState(false);
  const [manuallyClosed, setManuallyClosed] = useState(false); // Nueva variable de estado

  
  
  
  
//Modal 
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

  useEffect(() => {
    actions.getToken()
    actions.getUser()
  }, []);
  
  
     
 
  const closeForceNavbar = () => {
    setAriaExpanded(false)
  }

  const closeMenuOnItemClick = () => {
    setManuallyClosed(true); // Establecer que el menú ha sido cerrado manualmente
    setAriaExpanded(false); // Cerrar el menú
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary py-4">
      <div className={dropMenu} >
        <div className="text-center lightSpeedIn customDiv">
          <a href="/" className="navbar-brand tittle-nav ms-1 " id="tittle-nav" onClick={closeMenuOnItemClick}>
            WhataCar
          </a>
        </div>
        <br></br>
        <div className="justify-content-end d-flex mb-2 ">
          <div className="mx-auto">
            <button
              className="navbar-toggler  ms-5"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded={ariaExpanded}             
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNavDropdown"
            >
              <ul className="navbar-nav ml-auto align-items-end">
                {!store.token ? (
                  <>
                    <li className="nav-item">
                      <Link
                        className="nav-link actived me-3"
                        style={{ color: "rgb(15, 76, 117)" }}
                        aria-current="page"
                        to="/signup"
                        onClick={closeMenuOnItemClick}
                        
                      >
                        Registro
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        className="nav-link actived me-3"
                        style={{ color: "rgb(15, 76, 117)" }}
                        aria-current="page"
                        to="/login"
                        onClick={closeMenuOnItemClick}
                      
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
                        className="nav-link "
                        id="heart"
                        href="#"
                        role="button"
                        aria-expanded="page"
                        to="/profile/favorites"
                      >
                        <span>Favoritos</span> {""}
                        <i className="fa-regular fa-heart"></i>
                      </Link>
                    </li>
                    <li className="nav-item">
                      {!store.token ? (
                        
                        <button
                          className="nav-link btn-plus mb-2 me-3"
                          onClick={openModal}
                        >
                          <i className="fa-solid fa-plus"></i>
                        </button>
                      ) : (
                        <Link to="/upload-car"
                        style={{width: 38, height: 35, background: '#0F4C75', borderRadius: 8}}
                        className="nav-link btn-plus btn_mucho mb-2 ms-4">
                       
                          
                         
                            <i className="fa-solid fa-plus m-auto"></i>
                       
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
                        onClick={closeMenuOnItemClick}
                      >
                        <i className="fa-regular fa-user ms-4 jello-vertical" id="iconProfile"></i>
                      </Link>
                      <ul className="dropdown-menu ms-3">
                        <li>
                          <Link
                            to="/profile/configuration"
                            className="dropdown-item justify-content-end d-flex"
                            onClick={closeMenuOnItemClick}
                          >
                            Mi perfil
                            <i className="fa-solid fa-address-card ms-2 mt-1 profileIcons"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/profile/configuration"
                            className="dropdown-item justify-content-end d-flex  profileIcons"
                            onClick={closeMenuOnItemClick}
                           
                          >
                            Configuración
                            <i className="fa-solid fa-gear ms-2 mt-1 profileIcons" ></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/profile/onsale"
                            className="dropdown-item justify-content-end d-flex "
                            onClick={closeMenuOnItemClick}
                          >
                            Mis productos
                            <i className="fa-solid fa-car ms-2 mt-1 profileIcons"></i>
                          </Link>
                        </li>

                        {/* Cuando se inicia la aplicación hay que quitar esto, loguearte reescribirlo y recargar */}
                         {/* {store.user.role === "GARAGE" && (
                            <li>
                              <Link
                                to="/profile/garage"
                                className="dropdown-item justify-content-end d-flex"
                              >
                                Mi Taller
                                <i className="fa-solid fa-wrench ms-2 mt-1"></i>
                              </Link>
                            </li>
                          )} */}

                        <li>
                          <hr className="dropdown-divider" />
                        </li>

                        <li>
                          <Link
                            className="dropdown-item justify-content-end d-flex "
                            to="/"
                            style={{ color: "red" }}
                            onClick={handleLogOut}
                          >
                      
                            Salir
                            <i className="fa-solid fa-right-from-bracket ms-3 mt-1 "></i>
                          </Link>
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
