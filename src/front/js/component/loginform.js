import React, { useState } from "react";
import abueloslogin from "../../img/abueloslogin.png";
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      "email": email,
      "password": password
    };

    try {
      const response = await fetch(process.env.BACKEND_URL + "/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user)
      });

      if (response.ok) {
        setLoginSuccess(true);
        setLoginError(false);
        const data = await response.json();
        const token = data.token;
        const email = data.email;

        localStorage.setItem("miTokenJWT", token);
        localStorage.setItem("loggedUserEmail", email);

        setEmail('');
        setPassword('');
        navigate('/');
      } else {
        setLoginSuccess(false);
        setLoginError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setLoginSuccess(false);
      setLoginError(true);
    }
  };

  return (
    <div className="container">
      <div className="container-form">
        <div className="row">
          <form className="container-login-fom col-md-6" onSubmit={handleSubmit}>
            <div className="login-title mt-5 mb-5">
              <h2>Accede</h2>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="inputEmail" className="form-label">
                    <h5>Email</h5>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="inputEmail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="col-sm-6">
                <div className="form-group">
                  <label htmlFor="inputPassword" className="form-label">
                    <h5>Contraseña</h5>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6 "></div>
              <div className="col-sm-6 mt-2">
                <div className="recoverpassword">
                  <a href="/recoverpassword">
                    <h5>¿Has olvidado tu contraseña?</h5>
                  </a>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-12 mt-4">
                <div className="login-botton">
                  <button type="submit" className="btn btn-primary">
                    <h5>Log in</h5>
                  </button>
                </div>
              </div>
            </div>
          </form>
          <div className="col-md-6">
            <img src={abueloslogin} alt="Abuelos Login" />
          </div>
        </div>
      </div>
    </div>
  );
};