import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = sessionStorage.getItem("token");
  const history = useHistory();
  console.log("Token", store.token);
  const handleClick = () => {
    actions.login(email, password);
  };

  if (store.token && store.token != "" && store.token != undefined) {
    history.push("/Directorio");
  }

  return (
    <nav className="navbar navbar-light bg-white">
      <div className="container-fluid mx-5">
        <Link to="/">
          <span className="navbar-brand mb-0 h1 text-black">
            <img
              src="https://i.ibb.co/X8KB9ZY/Influe-re.png"
              className="img-fluid shadow-4"
              alt="..."
            />
          </span>
        </Link>
        <div className="ml-auto">
          <Link to="/Directorio">
            <span className="navbar-item mx-2 text-black menu">
              Influencers
            </span>
          </Link>
          <Link to="/formulario-empresas">
            <span className="navbar-item mx-3 text-black">
              Regístrate como Empresa
            </span>
          </Link>
          <Link to="/formulario-influencers">
            <span className="navbar-item mx-3 text-black">
              Regístrate como Influencer
            </span>
          </Link>

          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="far fa-user-circle" id="icono">
              {" "}
              <span className="sesion">Iniciar Sesión</span>
            </i>
          </button>

          <div
            className="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content" id="modal-login">
                <div className="modal-header bg bg-primary text-white">
                  <div className="">
                    <h3 className="modal-title" id="exampleModalLabel">
                      Iniciar Sesión
                    </h3>
                  </div>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body" id="Login-us">
                  <div>
                    <div className="mb-3">
                      <label for="email" className="form-label">
                        Email:
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        aria-describedby="emailHelp"
                      />
                      <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                      </div>
                    </div>
                    <div className="mb-3">
                      <label for="password" className="form-label">
                        Contraseña:
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                      />
                    </div>
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                      />
                      <label className="form-check-label" for="exampleCheck1">
                        Recordar cuenta
                      </label>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        onClick={handleClick}
                        data-bs-dismiss="modal"
                      >
                        Iniciar Sesión
                      </button>
                    </div>
                  </div>
                  <br></br>
                  <br></br>
                  <div
                    className="row"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "end",
                    }}
                  >
                    <div className="col-5">
                      <Link to="/formulario-influencers">
                        <button
                          type="button"
                          class="btn btn-outline-warning"
                          style={{ fontSize: "85%" }}
                          data-bs-dismiss="modal"
                        >
                          Registrar Empresa
                        </button>
                      </Link>
                    </div>
                    <div className="col-5">
                      <Link to="/formulario-empresas">
                        <button
                          type="button"
                          class="btn btn-outline-warning "
                          style={{ fontSize: "85%" }}
                          data-bs-dismiss="modal"
                        >
                          Registrar Influencer
                        </button>
                      </Link>
                    </div>
                    <br></br>
                    <br></br>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
