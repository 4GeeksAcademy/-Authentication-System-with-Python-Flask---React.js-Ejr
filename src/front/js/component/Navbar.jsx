import React, { useContext, useState, useEffect } from "react";
import LogIn from '../pages/LogIn.jsx';
import { Link } from 'react-router-dom';
import { Context } from "../store/appContext";

const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const myToken = localStorage.getItem("myToken");
    const userLoggedIn = !!myToken;
    setIsLoggedIn(userLoggedIn);
  }, []);

  function handleLogout() {
    let isLogged = actions.logout();
    if (isLogged) {
      localStorage.removeItem("myToken");
      setIsLoggedIn(false);
      console.log("session closed");
    }
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: 'rgb(148, 163, 82)' }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to='/'>
          <img src="https://i.ibb.co/C1sDhjs/White-Black-Minimalist-Logo-Distro-Fashion-6.jpg" width="70" height="65" alt="Logo"></img>
        </Link>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
          <ul className="navbar-nav">

          {isLoggedIn? (
              <h3>Hi {data.username}</h3>
            <li>
              <button onClick={handleLogout}>Log Out</button>
            </li>
          ):( 
            <li className="nav-item">
            <a className="nav-link btn" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop">LogIn</a>
          </li>

          )}
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