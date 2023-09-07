import React, { useState } from 'react';
import '../../styles/LoginForm.css';
import axios from 'axios'; // Importa Axios

function LoginForm() {
  const [activeTab, setActiveTab] = useState('login');
  const [loginFormData, setLoginFormData] = useState({
    loginName: '',
    loginPassword: '',
  });
  const [registerFormData, setRegisterFormData] = useState({
    registerName: '',
    registerUsername: '',
    registerEmail: '',
    registerPassword: '',
    registerRepeatPassword: '',
    registerCheck: true,
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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('URL_DEL_BACKEND_LOGIN', loginFormData);

      if (response.status === 200) {
        // El inicio de sesión fue exitoso, puedes mostrar un mensaje de éxito al usuario
        console.log('Inicio de sesión exitoso');
      } else {
        // Puedes manejar errores aquí
        console.error('Credenciales incorrectas');
      }
    } catch (error) {
      // Puedes manejar errores aquí
      console.error('Error al iniciar sesión', error);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('URL_DEL_BACKEND_REGISTRO', registerFormData);

      if (response.status === 200) {
        // El registro fue exitoso, puedes mostrar un mensaje de éxito al usuario
        console.log('Registro exitoso');
      } else {
        // Puedes manejar errores aquí
        console.error('Error al registrar');
      }
    } catch (error) {
      // Puedes manejar errores aquí
      console.error('Error al registrar', error);
    }
  };

  return (
    <div>
      <ul className="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
        <li className="nav-item" role="presentation">
          <a
            className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
            id="tab-login"
            onClick={() => handleTabChange('login')}
            role="tab"
            aria-controls="pills-login"
            aria-selected={activeTab === 'login'}
          >
            Login
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
            Register
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
            <label className="form-label" htmlFor="loginName">
              Email o nombre de usuario
            </label>

            <div className="form-outline mb-4">
              <input
                type="email"
                id="loginName"
                name="loginName"
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
                <a href="#!">¿Olvidaste la contraseña?</a>
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

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="registerName">
                Nombre
              </label>
              <input
                type="text"
                id="registerName"
                name="registerName"
                className="form-control white-background-input"
                onChange={handleRegisterChange}
              />
            </div>

            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="registerUsername">
                Nombre de usuario
              </label>
              <input
                type="text"
                id="registerUsername"
                name="registerUsername"
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
                value=""
                id="registerCheck"
                name="registerCheck"
                defaultChecked
              />
              <label className="form-check-label" htmlFor="registerCheck">
                He leído y estoy de acuerdo con los términos de servicio
              </label>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-3">
              Registrarse
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
