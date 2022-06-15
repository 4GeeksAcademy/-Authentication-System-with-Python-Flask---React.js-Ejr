import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-dark">
      <div className="container-fluid mx-5">
        <Link to="/">
          <span className="navbar-brand mb-0 h1 text-white">
            <img
              src="https://i.ibb.co/Kh1cTp0/Disen-o-sin-ti-tulo.png"
              className="img-fluid shadow-4"
              alt="..."
            />
          </span>
        </Link>

        <div className="ml-auto">
          <span className="navbar-item mx-2 text-white">Influencers</span>
          <span className="navbar-item mx-3 text-white">Registrate</span>
          <button className="btn btn-primary">Iniciar Sesión</button>
        </div>
      </div>
    </nav>
  );
  return (
    <nav className="navbar navbar-light bg-dark">
      <div className="container-fluid mx-5">
        <Link to="/">
          <span className="navbar-brand mb-0 h1 text-white">Influĕre</span>
        </Link>
        <div className="ml-auto">
          <Link to="/Directorio">
            <span className="navbar-item mx-2 text-white">Influencers</span>
          </Link>
          <span className="navbar-item mx-3 text-white">Registrate</span>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i className="far fa-user-circle " id="icono">
              {" "}
              Iniciar Sesión
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
                  <form>
                    <div className="mb-3">
                      <label for="exampleInputEmail1" className="form-label">
                        Email:
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                      <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                      </div>
                    </div>
                    <div className="mb-3">
                      <label for="exampleInputPassword1" className="form-label">
                        Contraseña:
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
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
                      <button type="submit" className="btn btn-primary">
                        Iniciar Sesión
                      </button>
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
                        <button
                          type="button"
                          class="btn btn-outline-warning"
                          style={{ fontSize: "85%" }}
                        >
                          <a href={"/registrarEmp"}>Registrar Empresa</a>
                        </button>
                      </div>
                      <div className="col-5">
                        <button
                          type="button"
                          class="btn btn-outline-warning "
                          style={{ fontSize: "85%" }}
                        >
                          <a href={"/registrarUs"}>Registrar Influencer</a>
                        </button>
                      </div>
                      <br></br>
                      <br></br>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
