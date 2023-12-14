import React, { useState, useEffect, useContext } from "react";
import "../../styles/perfil.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import "./../component/Buscador.jsx";
import { Context } from "../store/appContext.js";

export const Perfil = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    region: "",
    comuna: "",
    birthDate: "",
  });

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
    <div className="profile-container">
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
        <div className="form-group">
          <label htmlFor="lastName">Apellido:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="comuna">Comuna:</label>
          <input
            type="text"
            id="comuna"
            name="comuna"
            value={formData.comuna}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
          />
        </div>
        <button className="action-button" type="submit">
          Guardar
        </button>
      </form>
      <div className="additional-info"></div>
      <div className="actions">
        <Link to="/Buscador">
          <button className="action-button">Publicar Trabajo</button>
        </Link>
        <Link to="/">
          {" "}
          <button className="action-button">Salir</button>
        </Link>
      </div>
    </div>
  );
};
