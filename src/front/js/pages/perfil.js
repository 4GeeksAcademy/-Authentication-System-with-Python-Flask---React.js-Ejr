import React, { useState } from "react";
import "../../styles/perfil.css";
import "bootstrap/dist/css/bootstrap.min.css"; 

export const Perfil = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    region: " ",
    comuna: "",
    birthDate: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes realizar acciones con los datos del formulario
    console.log(formData);
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
          <label htmlFor="region">Región:</label>
          <input
            type="text"
            id="region"
            name="region"
            value={formData.region}
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

   
      <div className="notices-section">
        <div className="notice">Agenda 1</div>
        <div className="notice">Aviso 2</div>
        <div className="notice">Aviso 3</div>
        <div className="notice">Aviso 4</div>
        <div className="notice">Aviso 5</div>
      </div>
      <div className="services-history">
        <h2>Historial de servicios</h2>
       
      </div>
      <div className="provider-comments">
        <h3>Comentario Prestador 1</h3>
      
      </div>
      <div className="additional-info">
        
   
      </div>
      <div className="actions">
        <button className="action-button">Salir</button>
        <button className="action-button">Buscar Trabajo</button>
      </div>
    </div>
  );
};
