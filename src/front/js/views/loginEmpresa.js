import React from "react";
import { Link } from "react-router-dom";
import "../../styles/login.css";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom"
import { useContext } from "react";
import { useState } from "react";


export const LoginEmpresa = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = sessionStorage.getItem("token");
  const history = useHistory();

  const handleClick = () => {
    actions.companyLogin(email, password).then(() => {
      history.push("/company_dashboard");
    });
  };

  return (
    <div id="login my-5">
      {store.token && store.token !== "" && store.token !== undefined ? (
        <div>
          <h3 className="text-center">Ya ingresaste!</h3>
          <h4 className="text-center my-5">Por favor, anda a Home!</h4>
          <Link to="/user_home" className="d-flex justify-content-center">
            <button className="mx-auto my-5">Ir a Home!</button>
          </Link>
        </div>
      ) : (
        <div className="container my-5">
          <div
            id="login-row"
            className="row justify-content-center align-items-center"
          >
            <div id="login-column" className="col-md-6">
              <div id="login-box" className="col-md-12">
                <form id="login-form" className="form">
                  <h3 className="text-center text-info">Login Empresa</h3>
                  <div className="form-group">
                    <label className="text-info">Email:</label>
                    <br />
                    <input
                      type="text"
                      name="companyEmail"
                      id="companyEmail"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password" className="text-info">
                      Contraseña:
                    </label>
                    <br />
                    <input
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type="password"
                      name="companyPassword"
                      id="companyPassword"
                      className="form-control"
                    />
                  </div>
                  <br />
                  <div className="form-group">
                    <button
                      type="button"
                      name="submit"
                      className="btn btn-info btn-md"
                      value="submit"
					  onClick={handleClick}
                    >
                      Entrar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
