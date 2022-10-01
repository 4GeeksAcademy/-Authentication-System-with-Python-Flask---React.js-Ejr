import React, { useContext } from "react";
import { Context } from "../store/appContext";

import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
export const Aprobado = () => {
  const { store, actions } = useContext(Context);

  return (
    <div class="row imghome">
      <Navbar />
      <div class="col-sm-6">
        <div class="card-body">
          <h1 class="card-title razones">Felicidades! Pago Aprobado!</h1>
          <ol>
            <li>
              {" "}
              "Estimado(a), En nombre de CocinaFacil, queremos agradecer
              inmensamente por la decisión de adquirir nuestro Plan. Confiamos
              en que tendremos una eperiencia exitosa.
            </li>

            <li>
              ¡Si necesitas ayuda no dudes en Contactarnos <a href="contacto">aquí!</a>{" "}
              
            </li>
            <li mt-1>
            <Link to="/sub">
                    <button className="btn btn-secondary">Sigue comprando...</button>
                  </Link>
              
            </li>
          </ol>
        </div>
      </div>
      <Footer />
    </div>
  );
};
