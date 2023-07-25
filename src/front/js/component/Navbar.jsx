import React from 'react';
import LogIn from '../pages/LogIn.jsx';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'rgb(148, 163, 82)' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src="https://i.ibb.co/C1sDhjs/White-Black-Minimalist-Logo-Distro-Fashion-6.jpg" width="70" height="65" alt="Logo"></img>
        </a>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">

              <a className="nav-link btn" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">LogIn</a>
            </li>
            <li className="nav-item dropstart">
              <a className="nav-link" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                &#9776;
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><a className="dropdown-item" href="#">Avisos/Notificaciones</a></li>
                <li><a className="dropdown-item" href="#">Ofertas Favoritas</a></li>
                <li><a className="dropdown-item" href="#">Explora tu siguiente trip</a></li>
                <li><a className="dropdown-item" href="#">Help</a></li>
                <li><a className="dropdown-item" href="#">LogOut</a></li>
              </ul>
            </li>
          </ul>

          <LogIn />

        </div>
      </div>
    </nav>
  );
};

export default Navbar;