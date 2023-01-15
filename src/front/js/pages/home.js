import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import { Logo } from "../component/Logo";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <form className="contenedor-login">
      <div className="mb-3">
        <Logo />
      </div>
      <div className="mb-3">
        <div className="DATO">
          <h1>Bienvenidos</h1>
          <p>
            Somos una aplicacion destinada a todos nuestros ciclistas que
            requieran ayuda en ruta
          </p>
        </div>
      </div>
      <button
        onClick={() => navigate("/login")}
        type="submit"
        className="btn btn-dark"
      >
        Login
      </button>
      <button
        onClick={() => navigate("/registration")}
        type="submit"
        className="btn btn-dark"
      >
        Registration
      </button>
    </form>
  );
};
