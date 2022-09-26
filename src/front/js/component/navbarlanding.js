import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import facebook from "../../img/facebook.png";
import google from "../../img/google.png";
import inicio from "../../img/inicio.png";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


export const Navbarlanding = () => {
  const [show, setShow] = useState(false);
  const [dato, setDato] = useState({
    email: "",
    contraseña:""
  })
  const datocliente = (event) => {
    //console.log (event.target.value)
    setDato({
      ...dato,
      [event.target.name] : event.target.value
    })
  }
  const enviardatos = (event) => {
       event.preventDefault();
       //console.log (dato.email+""+dato.contraseña)
  } 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  
 const info = (event) => {
  setDato(event.target.value)
 };

  return (
    <nav className="navbar fixed-top">
      <div className="container-fluid">
        <div className="brand">
          <Link to="/">
            <img className="logo" src={logo} />
            <span className="nombre">CoinChange</span>
          </Link>
        </div>

        <div className="ml-auto">
          
      <Button variant="primary" onClick={handleShow} className="buttonNavbar">
        Iniciar sesión
      </Button>
		  <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton variant="white" style={{backgroundColor:"#2B3E84",width:"100%"}}>
          <Modal.Title ><h5
                    className="modal-title fw-bold"
                    id="modalTitle"
                    style={{
                      color: "#ffffff",
                      "margin-left": "180px",
                    }}
                  >
                    Bienvenido
                  </h5></Modal.Title>
        </Modal.Header>
        <Modal.Body><div className="container">
                  <div className="row">
                    <div className="col p-5">
                      <div className="text-start">
                        <img
                          className="logo"
                          src={logo}
                          style={{ width: "70px", height: "70px" }}
                        />
                      </div>
                      <form action="#"  onSubmit = {enviardatos}>
                        <div className="mb-4">
                          <label for="email" className="form-label">
                            Correo electrónico
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            name="email"
                            onChange={datocliente}
                          ></input>
                        </div>
                        <div className="mb-4">
                          <label for="contraseña" className="form-label">
                            Contraseña
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            name="contraseña"
                            onChange={datocliente}
                          ></input>
                        </div>
                        <div className="mb-4 form-check">
                          <input
                            type="checkbox"
                            name="connected"
                            className="form-check-input"
                            id=""
                          />
                          <label for="connected" className="form-check-label">
                            Mantenerme conectado
                          </label>
                        </div>
                        <div className="d-grid">
                          <button
                            type="submit"
                            style={{
                              backgroundColor: "#2B3E84",
                              color: "#ffffff",
                              "margin-bottom": "10px",
                              "border-radius": "8px",
                            }}
                          >
                            Iniciar Sesión
                          </button>
                        </div>
                        <div className="my-3">
                          <span>
                            ¿No tienes cuenta? <a href="#">Regístrate</a>
                          </span>
                          <br></br>
                          <span>
                            <a href="#">Recuperar contraseña</a>
                          </span>
                        </div>
                        <div className="container w-100 my-5">
                          <div className="row text-center">
                            <div className="col-12">Iniciar sesión</div>
                          </div>
                          <div className="row">
                            <div className="col">
                              <button className="btn btn-outline-primary w-100 my-1">
                                <div className="row align-items-center">
                                  <div className="col-2">
                                    <img
                                      src={facebook}
                                      style={{ width: "28px" }}
                                    />
                                  </div>
                                  <div className="col-10 text-center">
                                    Facebook
                                  </div>
                                </div>
                              </button>
                            </div>
                            <div className="col">
                              <button className="btn btn-outline-danger w-100 my-1">
                                <div className="row align-items-center">
                                  <div className="col-2">
                                    <img
                                      src={google}
                                      style={{ width: "28px" }}
                                    />
                                  </div>
                                  <div className="col-10 text-center">
                                    Google
                                  </div>
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div></Modal.Body>
      </Modal>
          <Link to="/registro">
          <Button variant="primary" onClick={handleShow} className="buttonNavbar">
          Registrarse
          </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
