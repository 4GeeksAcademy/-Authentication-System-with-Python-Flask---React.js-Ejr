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

  useEffect(async() => {
    await actions.validate_token();

    if (store.auth) {
      setLoggedNavbar(true);
      await actions.obtenerInfoUsuario();
      console.log(store.user);
    } else {
      setLoggedNavbar(false);
    }

	},[]);

	return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary px-5">
          <div className="container-fluid d-flex justify-content-between align-item-center col-sm-12 col-md-12 col-lg-12">
            <div className="col-9">
              {/* <a className="navbar-brand text-black fs-2" href="#"><strong>Never Hobby Alone</strong></a> */}

              <img class="img-thumbnail border-0 col-3" src={ Logo } alt="" />

              {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button> */}
      
              {/*Esta parte es la entrada de busqueda */}
              {/* <div className="col-sm-6 col-md-6 col-lg-2">
                <form class="d-flex" role="search">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                </form>
              </div> */}
      
              {/*Esta parte es la otra entrada de busqueda */}
              {/* <div className="col-sm-6 col-md-6 col-lg-2">
                <label class="visually-hidden" for="inlineFormSelectPref">Preference</label>
                <select class="form-select" id="inlineFormSelectPref">
                  <option selected>Choose...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div> */}
            </div>

            {/*Esta parte son los botones de la derecha */}
            {loggedNavbar ? 
            (<div className="collapse navbar-collapse col-3" id="navbarNav">

              <div className="d-flex flex-row justify-content-end align-items-center">
                <img className="img-fluid col-3" src={ ProfilePicture }/>
                <span>{ store.user.name }</span>
              </div>

              <button className="btn-400 px-4 ms-3 rounded" onClick={logOut}>Cerrar sesión</button>
            </div>):
            (<div className="collapse navbar-collapse justify-content-end  col-3" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item flex">
                  <a className="nav-link active fs-5 text-white btn m-1 bg-400" aria-current="page" href="#" onClick={updateModalState}>Log in</a>
                </li>
                <li className="nav-item flex">
                  <a className="nav-link fs-5 text-white btn m-1 bg-300" href="#" onClick={updateModalRegistrerState}>Sign up</a>
                </li>
              </ul>
            </div>)
            }
          </div> 

          <LoginModal show={modalState.showModal} onClose={() => setModalState({ showModal: false })}/>
          <SignUpModal show={modalState.showModalUpdate} onClose={() => setModalState({ showModalUpdate: false })}/>
        </nav>
    
      )
    }