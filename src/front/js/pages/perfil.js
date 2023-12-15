import React, { useState, useEffect, useContext } from "react";
import "../../styles/perfil.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
// import "./../component/Buscador.jsx";
import { Context } from "../store/appContext.js";

export const Perfil = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    telefono: "",
    comuna: ""
  });

useEffect(() => {
  let token = localStorage.getItem("token")
  console.log(token)
  let user = JSON.parse(localStorage.getItem("user"))
  console.log(user)
  fetch("http://localhost:3001/api/perfil_logeado", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //"Authorization": "Bearer " + token
    },
    body: JSON.stringify({email: user.email})
  })
  .then(response => response.json())
  .then(data => {
   setFormData({
      ...formData,
      firstName: data.usuario.nombre,
      lastName: data.usuario.apellido,
      email: data.usuario.email,
      comuna: data.usuario.comuna,
      telefono: data.usuario.telefono
    })
  })
  .catch(error => console.log (error))
},[])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/perfil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Manejar la respuesta exitosa del servidor
        const data = await response.json();
        console.log("Registro exitoso:", data);
      } else {
        // Manejar errores
        console.error("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  return (
    <div className="profile-container mt-4">
      <div className="header">
        <h1 className="profile-name">Nombre Cliente</h1>
      </div>

      {/* Formulario de datos */}
      <form className="data-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">Nombre:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="lastName">Apellido:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="comuna">Telefono:</label>
          <input
            type="text"
            id="comuna"
            name="comuna"
            value={formData.telefono}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mt-2">
          <label htmlFor="comuna">Comuna:</label>
          <input
            type="text"
            id="comuna"
            name="comuna"
            value={formData.comuna}
            onChange={handleInputChange}
          />
        </div>
      </form>
      <div className="button-container">
        <button
          className="action-button custom-button"
          style={{
            borderRadius: "12px",
            borderColor: "white",
            backgroundColor: "#2c94da",
            height: "40px",
            color: "black",
            textAlign: "center",
          }}
          type="submit"
        >
          Guardar
        </button>
        <Link to="/generadorPublicacion">
          <button
            className="action-button custom-button"
            style={{
              borderRadius: "12px",
              borderColor: "white",
              backgroundColor: "#2c94da",
              height: "40px",
              color: "black",
              textAlign: "center",
            }}
          >
            Publicar Trabajo
          </button>
        </Link>
        <Link to="/">
          {" "}
          <button
            className="action-button custom-button"
            style={{
              fontFamily: "fantasy",
              borderRadius: "12px",
              borderColor: "white",
              backgroundColor: "#d74338",
              height: "40px",
              color: "black",
              textAlign: "center",
            }}
          >
            Salir
          </button>
        </Link>
      </div>
    </div>
  );
};
