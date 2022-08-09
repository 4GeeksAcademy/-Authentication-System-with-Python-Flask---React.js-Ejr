import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSeedling } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../img/logo_nav.png";

function NavbarUser() {
  return (
    <nav className="navbar bg-success fixed-top">
      <div className="container-fluid">
        <div className="nav-item dropdown">
          <div className="row">
            <div className="col d-flex justify-content-betweenn">
              <img src={Logo} className='w-25 border border-success rounded' alt='logo' />
              <a
                className="nav-link dropdown-toggle text-light"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              ></a>
                <ul className="dropdown-menu bg-success">
                <li>
                <a className="dropdown-item text-light bg-success" href="/">
                    Ver menú esta semana
                </a>
                </li>
                <li>
                <a className="dropdown-item text-light bg-success" href="/">
                    Ver menú próxima semana
                </a>
                </li>
            </ul>
                </div>
            </div>

        
        </div>
        <button
          className="navbar-toggler btn btn-dark"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-end bg-success"
          tabIndex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5
              className="offcanvas-title text-light"
              id="offcanvasNavbarLabel"
            >
              Casino Corporativo <FontAwesomeIcon icon={faSeedling} />
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
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
              <li className="nav-item">
                <a className='nav-link text-light' href='/'>Logout <FontAwesomeIcon icon={faArrowRightToBracket} /></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavbarUser;
