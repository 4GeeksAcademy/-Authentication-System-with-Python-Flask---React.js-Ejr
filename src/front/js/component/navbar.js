import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faMobileScreen } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../img/logo_nav.png";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const { store, actions } = useContext(Context);

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-success">
      <div className="container-fluid">
        <a className="" href="/">
          <img
            src={Logo}
            className="w-25 border border-success rounded"
            alt="logo"
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNavAltMarkup"
        >
          <div className="navbar-nav">
            {!store.token ? (
              <Link to="/login">
                <a className="nav-link text-light" href="/">
                  Login <FontAwesomeIcon icon={faArrowRightToBracket} />
                </a>
              </Link>
            ) : (
              <a
                onClick={() => actions.logout()}
                className="nav-link text-light"
                href="/"
              >
                Log Out <FontAwesomeIcon icon={faArrowRightToBracket} />
              </a>
            )}

            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <a className="nav-link text-light" href="/">
                  Contacto <FontAwesomeIcon icon={faMobileScreen} />
                </a>

                <li className="nav-item">
                  <a className="nav-link text-light" href="/">
                    Perfil <FontAwesomeIcon icon={faAddressCard} />
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-light" href="/">
                    Reportar un problema{" "}
                    <FontAwesomeIcon icon={faCircleExclamation} />
                  </a>
                </li>
                {/* <li className="nav-item">
                <a className='nav-link text-light' href='/'>Logout <FontAwesomeIcon icon={faArrowRightToBracket} /></a>
              </li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
