import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setUsuario("");
    setContraseña("");
    setError(""); // Reiniciar el mensaje de error

    // Aquí puedes realizar la lógica de autenticación
    console.log("Usuario:", usuario, "Contraseña:", contraseña);

    // Ejemplo de solicitud POST usando fetch
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
          // Si la respuesta no es exitosa, lanzar un error
          throw new Error("Email y/o contraseña son incorrectos");
        }
        return response.json();
      })
      .then((data) => {
        // Manejar la respuesta del servidor
        console.log("Respuesta del servidor:", data);

        // Si la autenticación fue exitosa, almacenar información del usuario
        if (data.access_token) {
          console.log("Usuario encontrado");

          // Almacena información del usuario en localStorage
          localStorage.setItem("user", JSON.stringify(data.user));
        }
      })
      .catch((error) => {
        // Capturar errores de la solicitud y establecer el mensaje de error
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