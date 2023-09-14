import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";
import '../../styles/LoginForm.css';
import { Link } from "react-router-dom";
import ResetPass from '../pages/resetpass';


function LoginForm() {

  const {store, actions} = useContext(Context);
  const navigate =useNavigate()

  useEffect(()=>{
    //Si existe un token está iniciada la sesión
    if(store.accessToken){
      //ir a la página de los datos del usuario
      console.log("IR A DEMO", store.accessToken)
      //navigate("/demo")
      navigate("/perfilorganizador")
    }
  }, [store.accessToken])

  const [activeTab, setActiveTab] = useState('login');
  const [loginFormData, setLoginFormData] = useState({
    loginEmail: '',
    loginPassword: '',
  });
  const [registerFormData, setRegisterFormData] = useState({
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerRepeatPassword: '',
    registerCheck: false,
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterFormData({
      ...registerFormData,
      [name]: value,
    });
  };

  async function handleLoginSubmit(e){
    e.preventDefault()
    const data = new FormData(e.target)
    const email = data.get("loginEmail")
    const password = data.get("loginPassword")
    console.log(email, password)
    if (email=="" || password==""){
      //MODAL
      alert("No debe de haber datos vacíos")
    } else {
      const {login} = actions
      let resp = await login(email, password)
      console.log({resp})
      //si no existe el usuario enviamos un error
      if (resp.code!=200){
        //MODAL
        alert("Credenciales inválidas, verifique nombre de usuario y contraseña")
      } else {
        //entramos a la página de datos del usuario
        alert("login successfull")
        window.location.reload(false)
      }
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target)
    const name = data.get("registerName")
    const email = data.get("registerEmail")
    const password = data.get("registerPassword")
    const pass2 = data.get("registerRepeatPassword")
    const checkData = data.get("registerCheck")
    if (email=="" || password=="" || pass2=="" || name==""){
      //MODAL
      alert("No debe de haber datos vacíos")
    } else if (name.length <10) {
      alert("El nombre debe tener al menos 10 caracteres")
    } else if (password.length < 5){
      alert("La contraseña debe debe tener al menos 5 caracteres")
    } else if (!checkData){
        alert("Confirme los términos")
    } else if (password!=pass2){
        alert("El password debe coincidir")
    } else {
        const {signup} = actions
        console.log(email, password, name)
        let resp = await signup(email, password, name)
        console.log({resp})
        //si ya existe el usuario enviamos un error
        if (resp.code!=201){
          //MODAL
          alert("El usuario ya está registrado")
        } else {
          //entramos a la página de datos del usuario
          alert("Signup successfull")
        }
    }
  };

  return (
              <div className="row d-flex align-items-center justify-content-center h-100">
                <div className="col-md-8 col-lg-7 col-xl-6">
                  <img src="https://ak-static.cms.nba.com/wp-content/themes/nba-global/images/international-league-pass/players.png"
                    className="img-fluid" alt="Phone image"></img>
                </div>
                <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                <div>
                  <ul className="nav nav-pills nav-justified" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                      <a
                        className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                        id="tab-login"
                        onClick={() => handleTabChange('login')}
                        role="tab"
                        aria-controls="pills-login"
                        aria-selected={activeTab === 'login'}
                      >
                        Ingresar
                      </a>
                    </li>
                    <li className="nav-item" role="presentation">
                      <a
                        className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                        id="tab-register"
                        onClick={() => handleTabChange('register')}
                        role="tab"
                        aria-controls="pills-register"
                        aria-selected={activeTab === 'register'}
                      >
                        Registro
                      </a>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div
                      className={`tab-pane fade ${activeTab === 'login' ? 'show active' : ''}`}
                      id="pills-login"
                      role="tabpanel"
                    >
                      {/* Formulario de login */}
                      <form onSubmit={handleLoginSubmit}>
                        <div className="text-center mb-3">
                          <p>Ingresa con:</p>
                          <button type="button" className="btn btn-secondary btn-floating mx-1">
                            <i className="fab fa-facebook-f"></i>
                          </button>

                          <button type="button" className="btn btn-secondary btn-floating mx-1">
                            <i className="fab fa-google"></i>
                          </button>

                          <button type="button" className="btn btn-secondary btn-floating mx-1">
                            <i className="fab fa-twitter"></i>
                          </button>

                          <button type="button" className="btn btn-secondary btn-floating mx-1">
                            <i className="fab fa-github"></i>
                          </button>
                        </div>

                        <p className="text-center">O</p>
                        <label className="form-label" htmlFor="loginEmail">
                          Email
                        </label>

                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="loginEmail"
                            name="loginEmail"
                            className="form-control white-background-input"
                            onChange={handleLoginChange}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="loginPassword">
                            Contraseña
                          </label>
                          <input
                            type="password"
                            id="loginPassword"
                            name="loginPassword"
                            className="form-control white-background-input"
                            onChange={handleLoginChange}
                          />
                        </div>

                        <div className="row mb-4">
                          <div className="col-md-6 d-flex justify-content-center">
                            <div className="form-check mb-3 mb-md-0">
                              <label className="form-check-label" htmlFor="loginCheck">
                                Recuérdame
                              </label>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="loginCheck"
                                name="loginCheck"
                                defaultChecked
                              />
                            </div>
                          </div>

                          <div className="col-md-6 d-flex justify-content-center">
                            <ResetPass/>
                          </div>

                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4">
                          Iniciar Sesión
                        </button>

                        <div className="text-center">
                          <p>
                            ¿Todavía no eres miembro? <a href="#!">Regístrate</a>
                          </p>
                        </div>
                      </form>
                    </div>
                    <div
                      className={`tab-pane fade ${activeTab === 'register' ? 'show active' : ''}`}
                      id="pills-register"
                      role="tabpanel"
                    >
                      {/* Formulario de registro */}
                      <form onSubmit={handleRegisterSubmit}>
                        <div className="text-center mb-3">
                          <p>Regístrate con:</p>
                          <button type="button" className="btn btn-secondary btn-floating mx-1">
                            <i className="fab fa-facebook-f"></i>
                          </button>

                          <button type="button" className="btn btn-secondary btn-floating mx-1">
                            <i className="fab fa-google"></i>
                          </button>

                          <button type="button" className="btn btn-secondary btn-floating mx-1">
                            <i className="fab fa-twitter"></i>
                          </button>

                          <button type="button" className="btn btn-secondary btn-floating mx-1">
                            <i className="fab fa-github"></i>
                          </button>
                        </div>

                        <p className="text-center">O</p>

                        <label className="form-label" htmlFor="registerName">
                              Nombre
                        </label>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="registerName"
                            name="registerName"
                            className="form-control white-background-input"
                            onChange={handleRegisterChange}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="registerEmail">
                            Email
                          </label>
                          <input
                            type="email"
                            id="registerEmail"
                            name="registerEmail"
                            className="form-control white-background-input"
                            onChange={handleRegisterChange}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="registerPassword">
                            Contraseña
                          </label>
                          <input
                            type="password"
                            id="registerPassword"
                            name="registerPassword"
                            className="form-control white-background-input"
                            onChange={handleRegisterChange}
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="registerRepeatPassword">
                            Confirmar contraseña
                          </label>
                          <input
                            type="password"
                            id="registerRepeatPassword"
                            name="registerRepeatPassword"
                            className="form-control white-background-input"
                            onChange={handleRegisterChange}
                          />
                        </div>

                        <div className="form-check d-flex justify-content-center mb-4">
                          <input
                            className="form-check-input me-2"
                            type="checkbox"
                            value="on"
                            id="registerCheck"
                            name="registerCheck"
                            onChange={(e) => e.target.value=="true"? e.target.value="false":e.target.value="true"}
                          />
                          <label className="form-check-label" htmlFor="registerCheck">
                            He leído y estoy de acuerdo con los términos
                          </label>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-3">
                          Registrarse
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                </div>
              </div>
  );
}

export default LoginForm;
