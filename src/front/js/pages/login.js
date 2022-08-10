import React from "react";
import Logo from "../../img/logo.png";
import "../../styles/login.css";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

const Login = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleClick = () => {
    actions.login(email, password);
    //.then(() => {});
  };

  if (store.token &&store.token !="" && store.token != undefined ) navigate('/');

  return (
    <div className="container w-25 mt-5">
      <div className="row">
        <img className="mt-5" src={Logo} />
      </div>
      <div className="container shadow-lg p-3 mb-5 bg-white rounded  mt-5">
        <div className="row ">
          <div className="col mt-4">
            <input
              className="input w-100"
              type="text"
              placeholder="Usuario o email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
               
            />
            <input
              className="input mt-3 w-100"
              type="password"
              placeholder="Contraseña"
             value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-4">
          <div className="col mt-3">
            <button  onClick={handleClick} type="button" className="btn btn-success w-100">
              Entrar
            </button>
            <p className="text-center">¿Olvidaste tu contraseña?</p>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <p className="text-center mb-2">
              Si eres empresa y quieres contratar nuestros servicios
            </p>
            <button  type="button" className="btn btn-success w-100 mb-4">
              Contactar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
