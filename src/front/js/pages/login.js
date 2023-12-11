import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Cambiado a `useNavigate`

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");
  
  // Utiliza `useNavigate` en lugar de `useHistory`
  const navigate = useNavigate();

  const handleLogin = () => {
    setUsuario("");
    setContraseña("");
    setError("");

    console.log("Usuario:", usuario, "Contraseña:", contraseña);

    fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: usuario,
        password: contraseña,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Email y/o contraseña son incorrectos");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta del servidor:", data);

        if (data.access_token) {
          console.log("Usuario encontrado");

          localStorage.setItem("user", JSON.stringify(data.user));

          // Utiliza `navigate` para redirigir a la página principal después del inicio de sesión
          navigate("/");
        }
      })
      .catch((error) => {
        setError("Email y/o contraseña son incorrectos");
        console.error("Error al enviar la solicitud:", error);
      });
  };

  return (
    <div className="container mt-5">
      <div className="col-md-6 offset-md-3">
        <h2 className="mb-4">Iniciar sesión</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="usuario" className="form-label">
              Usuario:
            </label>
            <input
              type="text"
              className={`form-control ${error ? 'is-invalid' : ''}`}
              id="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="contraseña" className="form-label">
              Contraseña:
            </label>
            <input
              type="password"
              className={`form-control ${error ? 'is-invalid' : ''}`}
              id="contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
            />
            {error && (
              <div className="invalid-feedback">
                {error}
              </div>
            )}
          </div>

          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogin}
          >
            Iniciar sesión
          </button>
          <Link to="/Home">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => window.close()}
            >
              Cerrar
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export { Login };