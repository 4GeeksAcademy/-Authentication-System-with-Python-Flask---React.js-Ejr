import React, { useContext, useState, useEffect } from "react";
import LogIn from '../pages/LogIn.jsx';
import { Link } from 'react-router-dom';
import { Context } from "../store/appContext";

const Navbar = () => {
  const { store, actions } = useContext(Context);

  function handleLogout() {
    actions.logout()
    window.location.reload();
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'>
          <img src="https://i.ibb.co/C1sDhjs/White-Black-Minimalist-Logo-Distro-Fashion-6.jpg" width="70" height="65" alt="Logo"></img>
        </Link>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav">

            {store.auth ? (
              <>
                <h3>Hi, {store.user.username ? store.user.username : store.business_user?.business_name} </h3>




              </>

            ) : (
              <li className="nav-item">
                <a className="nav-link btn" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">LogIn</a>
              </li>

            )}
            <li className="nav-item dropstart">
              <a className="nav-link" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                &#9776;
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <li><Link className="dropdown-item">Avisos/Notificaciones</Link></li>
                <li><Link to='/reviews' className="dropdown-item">Reseñas</Link></li>
                <li><Link to='/business_offers' className="dropdown-item">Ofertas</Link></li>
                <li><Link className="dropdown-item">Favoritos</Link></li>
                <li><Link to='/trips' className="dropdown-item">Explora tu siguiente trip</Link></li>
                <li><Link to='//user/private' className="dropdown-item">Mi Area privada</Link></li>
                <li><Link className="dropdown-item">Ayuda</Link></li>
                {store.auth ? (
                  <li><button className="dropdown-item" onClick={handleLogout}>LogOut</button></li>

                ) : (<li><Link className="dropdown-item signup" to='/signup'>Sign Up</Link></li>)}
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