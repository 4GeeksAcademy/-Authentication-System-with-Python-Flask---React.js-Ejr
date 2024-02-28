import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { LoginModal } from "./LoginModal";
import { SignUpModal } from "./SignUpModal";
import Logo from "../../img/logo.png";
import ProfilePicture from "../../img/profile-picture.jpg";

export const Navbar = () => {

  const { store, actions } = useContext(Context);

  const [loggedNavbar, setLoggedNavbar] = useState(false);
  const [modalState, setModalState] = useState({
		showModal: false,
		showModalUpdate: false,
	});

  function updateModalState() {
    setModalState({ showModal: true });
  }

  function updateModalRegistrerState() {
    setModalState({ showModalUpdate: true });
  }

  function logOut() {
    localStorage.removeItem("token");
    actions.validate_token();
    window.location.reload();
  }

  useEffect(() => {
    if (store.auth) {
      setLoggedNavbar(true);
      actions.obtenerInfoUsuario();
    } else {
      setLoggedNavbar(false);
    }
	},[store.auth]);

	return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light bg-white">
              <div className="container d-flex justify-content-between">
                <div className="navbar-brand col-xl-3 col-lg-3 col-md-6 col-8">
                  <img className="img-thumbnail border-0" src={Logo} alt="" />
                </div>
                
              {/*Esta parte son los botones de la derecha */}
              {loggedNavbar ? 
                (
                  <div className="dropdown d-flex justify-content-end mt-2">
                    <button className="btn btn-400 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <i className="fa fa-3x fa-user me-2"></i>
                      <h3>{ store.user.name }</h3>
                    </button>
                    <ul className="dropdown-menu border-0">
                      <li><button className="dropdown-item btn-400 mb-2 rounded">Usuario</button></li>
                      <li><button className="dropdown-item btn-400 rounded" onClick={logOut}>Cerrar sesión</button></li>
                    </ul>
                  </div>
                ):
                (<div>
                  <button className="navbar-toggler p-2 me-2" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <a className="nav-link fs-5 text-white btn bg-400 p-2 me-2 mb-2" href="#" onClick={updateModalState}>Log in</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link fs-5 text-white btn bg-300 p-2 me-2" href="#" onClick={updateModalRegistrerState}>Sign up</a>
                    </li>
                  </ul>
                </div>
                </div>
                )
              }
            </div> 

            <LoginModal show={modalState.showModal} onClose={() => setModalState({ showModal: false })}/>
            <SignUpModal show={modalState.showModalUpdate} onClose={() => setModalState({ showModalUpdate: false })}/>
        </nav>
    
      )
    }