import React, { useState, useContext } from "react";
import { useNavigate, Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { Context } from "../store/appContext";

export const Login = () => {
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { actions } = useContext(Context); // Usa el contexto para obtener acciones
  const navigate = useNavigate(); // Para redirigir a otra página después del inicio de sesión

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email === "" || formData.password === "") {
      setError(true);
      return;
    }
    setError(false);

    try {
      const result = await actions.login(formData); // Usa `actions.login` para manejar el inicio de sesión
      if (result && result.token) {
        alert('Login successful!');
        navigate('/dashboard'); // Redirige al usuario a otra página después del inicio de sesión
      } else {
        alert('Login failed: ' + result.msg);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert('An error occurred during login.');
    }
  }

  const respuestaGoogle = (response) => {
    console.log(response);
    if (response.profileObj) {
      alert('Google login successful!');
      navigate('/dashboard'); // Redirige a otra página después del inicio de sesión
    } else {
      alert('Google login failed.');
    }
  }

  return (
    <div className="container">
      <GoogleLogin
        clientId="953402330168-infsbkt3uifhc81i1ohvn4oiq8dl596t.apps.googleusercontent.com"
        buttonText="Iniciar sesión con Google"
        onSuccess={respuestaGoogle} // Cambia `onSuccess` a `onSuccess` y `onFailure` a `onFailure`
        onFailure={respuestaGoogle}
        cookiePolicy={'single_host_origin'}
      />
      <h1>Welcome Back!</h1>
      <h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</h5>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Email address"
          />
          <div id="emailHelp" className="form-text"></div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
          />
          <p>Forgot your password?</p>
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        {error && <p className="text-danger">Todos los campos son obligatorios</p>}
      </form>
      <p>
        <Link className="link-opacity-50-hover" to="/Register">
          Not a member? Sign Up
        </Link>
      </p>
    </div>
  );
};
