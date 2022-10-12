import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext";

export const Demo = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(false); // Si no contiene datos
  const handleClick = (e) => {
    e.preventDefault();
    if (email == "" || password == "") {
      setAlert(true);
    }
    if (email != "" && password != "") {
      actions.Login(email, password);
    }
  };

  return (
    <div class="container login-container">
      <div class="row login-row login">
        <div class="col-md-6 login-form-1" id="form1">
          <h3>Inicia sesión</h3>

          <form class="form-group">
            <input
              id="user"
              type="text"
              class="form-control"
              placeholder="Tu correo electrónico *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div class="form-group">
              <input
                id="pass"
                type="password"
                class="form-control"
                placeholder="Tu contraseña *"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div class="form-group">
              <input
                onClick={(e) => {
                  handleClick(e);
                }}
                type="submit"
                class="btnSubmit"
                value="Login"
              />
              <Link to="/register">
                <input type="submit" class="btnSubmit" value="Regístrate" />
              </Link>
              {alert && (
                <div class="alert alert-danger" id="alertSI" role="alert">
                  Completa datos
                </div>
              )}
            </div>
          </form>
         
          <div>
            <Link to="/loginadm">
              <i class="fa-solid fa-arrow-right casa"></i>
            </Link>
          </div>
        </div>
        <div class="col-md-6 login-form-2">
          <div class="login-logo">
            <Link to="/">
              <i className="fa-solid  fa-house icon-house"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
