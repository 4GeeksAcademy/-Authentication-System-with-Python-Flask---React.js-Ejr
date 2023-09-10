import React, { useState } from 'react';
import '../../styles/LoginForm.css'

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
      const response = await fetch('URL_DEL_BACKEND_LOGIN', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginFormData),
      });

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
      const response = await fetch('URL_DEL_BACKEND_REGISTRO', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerFormData),
      });

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
    <section className="vh-100">
      <div className="container py-5 h-100" id='LoginForm'>
        <div className="row d-flex align-items-center justify-content-center h-100" >
          <div className="col-md-8 col-lg-7 col-xl-6" >
            <img
              src="https://ak-static.cms.nba.com/wp-content/themes/nba-global/images/international-league-pass/players.png"
              className="img-fluid"
              alt="Phone image"
            />
          </div>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1" id='LoginForm-Container'>
            <div className="d-flex justify-content-between mb-4">
              <button
                className={`btn ${activeTab === 'login' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleTabChange('login')}
              >
                Login
              </button>
              <button
                className={`btn ${activeTab === 'register' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handleTabChange('register')}
              >
                Register
              </button>
            </div>
            <form>
              {activeTab === 'login' && (
                <div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="loginName">
                      Email o nombre de usuario
                    </label>
                    <input
                      type="email"
                      id="loginName"
                      name="loginName"
                      className="form-control form-control-lg LoginForm "
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
                      className="form-control form-control-lg LoginForm"
                      onChange={handleLoginChange}
                    />
                  </div>

                  <div className="d-flex justify-content-around align-items-center mb-4" id='forgotcontainer'>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="loginCheck"
                        name="loginCheck"
                        defaultChecked
                      />
                      <label className="form-check-label" htmlFor="loginCheck">
                        Recuérdame
                      </label>
                    </div>
                    <a href="#!">Forgot password?</a>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                    onClick={handleLoginSubmit}
                  >
                    Sign in
                  </button>
                </div>
              )}

              {activeTab === 'register' && (
                <div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="registerName">
                      Nombre
                    </label>
                    <input
                      type="text"
                      id="registerName"
                      name="registerName"
                      className="form-control form-control-lg LoginForm"
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
                      className="form-control form-control-lg LoginForm"
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
                      className="form-control form-control-lg LoginForm"
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
                      className="form-control form-control-lg LoginForm"
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
                      className="form-control form-control-lg LoginForm"
                      onChange={handleRegisterChange}
                    />
                  </div>

                  <div className="form-check d-flex justify-content-center mb-4" id='termscheck'>
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="registerCheck"
                      name="registerCheck"
                      defaultChecked
                    />
                    <label className="form-check-label" htmlFor="registerCheck" >
                      He leído y estoy de acuerdo con los términos de servicio
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block mb-3"
                    onClick={handleRegisterSubmit}
                  >
                    Registrarse
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
