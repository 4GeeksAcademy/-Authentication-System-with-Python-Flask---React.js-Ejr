import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { LoginModal } from "./LoginModal";
import Context from "../store/appContext";

export const Navbar = () => {

  const {store, actions} = useContext(Context);
  const [loggedNavbar, setLoggedNavbar] = useState(false);
  const [modalState, setModalState] = useState({
		showModal: false,
		showModalUpdate: false,
	});

  function updateModalState() {
    setModalState({ showModal: true });
  }

  function logOut() {
    localStorage.removeItem("token");
    window.location.reload();
  }

  useEffect(() => {
    if(!store.auth) {
      setLoggedNavbar(true);

    } else {
      setLoggedNavbar(false);
    }
	},[]);

	return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid col-sm-12 col-md-12 col-lg-12">
            <a className="navbar-brand text-black fs-2" href="#"><strong>Never Hobby Alone</strong></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
    
            {/*Esta parte es la entrada de busqueda */}
            <div className="col-sm-6 col-md-6 col-lg-2">
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            </form>
            </div>
    
            {/*Esta parte es la otra entrada de busqueda */}
            <div className="col-sm-6 col-md-6 col-lg-2">
              <label class="visually-hidden" for="inlineFormSelectPref">Preference</label>
              <select class="form-select" id="inlineFormSelectPref">
                <option selected>Choose...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
            </div>
    
    
            {/*Esta parte son los botones de la derecha */}
            {loggedNavbar ? 
            (<div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item flex">
                  <a className="nav-link active fs-3 text-white btn btn-lg m-1 bg-400" aria-current="page" href="#" onClick={updateModalState}>Log in</a>
                </li>
                <li className="nav-item flex">
                  <a className="nav-link fs-3 text-white btn btn-lg m-1 bg-300" href="#">Sign up</a>
                </li>
              </ul>
            </div>) :             
            (<div className="collapse navbar-collapse justify-content-end" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item flex">
                  <p>El nombre del usuario</p>
                </li>
                <li className="nav-item flex">
                  <p>Imagen</p>
                </li>
              </ul>
              <button onClick={logOut}>Cerrar sesión</button>
            </div>)
            }
          </div> 

          <LoginModal show={modalState.showModal} onClose={() => setModalState({ showModal: false })}/>
        </nav>
    
      )
    }