import React, { useContext } from "react";
import { Link } from "react-router-dom";
import rigoImageUr from "../../img/LogoSample_ByTailorBrands.jpg";
import { Context } from "../store/appContext";
import { Contacto } from "../pages/contacto";

import emailjs from "@emailjs/browser";



export const NavbarL = () => {
  const { store, actions } = useContext(Context);
  return (
    <nav className="navbar" id="navbar">
      <div className="container coco d-flex justify-content-center">
        <div className="fle">
          <Link to="/">
            <button type="button" class="btn coc ">
              HOME
            </button>
          </Link>
          <Link to="/productos">
            <button type="button" class="btn coc ">
              RECETAS
            </button>
          </Link>
          <Link to="/sub">
            <button type="button" class="btn coc ">
              PLANES
            </button>
          </Link>
          <Link to="/contacto">
            <button type="button" class="btn coc ">
              CONTACTO
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
