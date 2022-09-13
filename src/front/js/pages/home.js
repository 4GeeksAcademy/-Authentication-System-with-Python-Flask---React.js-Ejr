import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Stark from "../../img/stark.jpg";
import logo from "../../img/logo.png";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div>
      <form id="formulario" className="">
        <bl>
          <br></br>
        </bl>
        <h1 id="title">Consigue la mejor tasa aqui</h1>
        <bl>
          <br></br>
        </bl>
        <div className="mb-3 d-flex mx-4" id="name">
          <label
            id="ingresar-monto"
            for="exampleInputName"
            className="form-label"
          >
            Ingresa un monto
          </label>
          <input type="usuario" className="form-control" id="data" />
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="boton"
            >
              Selecciona divisa
            </button>
            <ul class="dropdown-menu">
              <li>
                <button class="dropdown-item" type="button">
                  USD
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button">
                  CLP
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button">
                  EU
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-3 d-flex mx-4">
          <label
            id="monto-recibir"
            for="exampleInputEmail1"
            className="form-label"
          >
            Monto a recibir
          </label>
          <input type="email" className="form-control" id="data" />
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="boton"
            >
              Selecciona divisa
            </button>
            <ul class="dropdown-menu">
              <li>
                <button class="dropdown-item" type="button">
                  USD
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button">
                  CLP
                </button>
              </li>
              <li>
                <button class="dropdown-item" type="button">
                  EU
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mb-3 d-flex mx-4">
          <label
            id="tipo-cambio"
            for="exampleInputPassword1"
            className="form-label"
          >
            Cambio
          </label>
          <input type="password" className="form-control" id="data" />
          <button type="submit" id="boton2">
            Cambiar
          </button>
        </div>
      </form>
      <div id="cartaCasa" class="card">
        <img
          className="logo"
          class="card-img-top"
          id="fotocartacasa1"
          src={logo}
        />
        <div class="card-body"></div>

        <input type="usuario" className="form-control" id="CambioRecibirCasa" />
        <bl>
          <br></br>
        </bl>
        <input type="usuario" className="form-control" id="infooRecibirCasa" />

        <div class="card-body">
          <button type="submit" href="#" class="card-link" id="botonlinkCCC">
            Ir a casa de cambio
          </button>
        </div>
      </div>
      <div id="cartaCasa2" class="card">
        <img className="logo" id="fotocartacasa2" src={logo} />
        <div class="card-body"></div>

        <input type="usuario" className="form-control" id="CambioRecibirCasa" />
        <bl>
          <br></br>
        </bl>
        <input type="usuario" className="form-control" id="infooRecibirCasa" />

        <div class="card-body">
          <button type="submit" href="#" class="card-link" id="botonlinkCCC">
            Ir a casa de cambio
          </button>
        </div>
      </div>
      <div id="cartaCasa3" class="card">
        <img className="logo" id="fotocartacasa3" src={logo} />
        <div class="card-body"></div>

        <input type="usuario" className="form-control" id="CambioRecibirCasa" />
        <bl>
          <br></br>
        </bl>
        <input type="usuario" className="form-control" id="infooRecibirCasa" />

        <div class="card-body">
          <button type="submit" href="#" class="card-link" id="botonlinkCCC">
            Ir a casa de cambio
          </button>
        </div>
      </div>
    </div>
  );
};
