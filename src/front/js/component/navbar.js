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
  const [dropMenu, setDropMenu] = useState("container-fluid mx-3");
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
  }, []);
  
  
  
  // Responsive Drop Menu
  const handleToggle = () => {
    if (manuallyClosed==true) { // Agregar condición para verificar si el menú ha sido cerrado manualmente
      setAriaExpanded(!ariaExpanded);
    }
  };



  const handleDropMenu = () => {
    if (ariaExpanded == true) {
      setDropMenu("justify-content-center text-center m-auto mb-5");
      console.log("true")
    } else {
      setDropMenu("container-fluid mx-3");
      console.log("false")
    }
  }
  
  const closeNavbar = () => {
    setAriaExpanded(false);
    setManuallyClosed(true); // Establecer que el menú ha sido cerrado manualmente
  };
  
    
  useEffect(()=> {
    handleDropMenu()
  }), [ariaExpanded]

  

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary py-4">
      <div className={dropMenu}>
        <div className="text-center">
          <Link to="/" className="navbar-brand tittle-nav ms-3" id="tittle-nav" onClick={closeNavbar}>
            WhataCar
          </Link>
        </div>
        <br></br>
        <div className="justify-content-end d-flex mb-2">
          <div className="mx-auto">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded={ariaExpanded}
              onClick={handleToggle}
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
                        className="nav-link active "
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
                        <Link to="/products"
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
                      >
                        <i className="fa-regular fa-user ms-4" id="iconProfile"></i>
                      </Link>
                      <ul className="dropdown-menu ms-3">
                        <li>
                          <Link
                            to="/profile/configuration"
                            className="dropdown-item justify-content-end d-flex"
                          >
                            Mi perfil
                            <i className="fa-solid fa-address-card ms-3 mt-1 profileIcons"></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/profile/configuration"
                            className="dropdown-item justify-content-end d-flex  profileIcons"
                           
                          >
                            Configuración
                            <i className="fa-solid fa-gear ms-2 mt-1 profileIcons" ></i>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/profile/onsale"
                            className="dropdown-item justify-content-end d-flex "
                          >
                            Mis productos
                            <i className="fa-solid fa-car ms-2 mt-1 profileIcons"></i>
                          </Link>
                        </li>
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
