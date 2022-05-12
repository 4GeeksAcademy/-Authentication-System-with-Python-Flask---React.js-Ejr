import React from "react";
import "../../styles/login.css";
import { Link } from "react-router-dom";

export const LoginScreen = () => {
  return (
    <div>
      <h3 className="auth__title">Login</h3>
      <form>
        <input
          className="auth__input"
          type="text"
          placeholder="email"
          name="email"
        />
        <input
          className="auth__input"
          type="password"
          placeholder="contraseña"
          name="password"
        />
        <Link to="/user_home">
          <button
            className="btn btn-formulario btn-block"
            type="submit"
            disabled={true}
          >
            Entrar
          </button>
        </Link>
      </form>
    </div>
  );
};
