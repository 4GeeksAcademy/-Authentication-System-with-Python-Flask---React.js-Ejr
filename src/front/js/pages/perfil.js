import React, { useState, useEffect, useContext } from "react";
import "../../styles/perfil.css";
import "bootstrap/dist/css/bootstrap.min.css"; 
import { Link } from "react-router-dom";
import "./../component/Buscador.jsx"
import { Context } from "../store/appContext.js";

export const Perfil = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    region: "",
    comuna: "",
    tipoUsuario: "" ,
    birthDate: ""
  });

  const { store, actions } = useContext(Context);

  useEffect(() => {
    const fetchPerfil = async () => {
      console.log("cualquiera");
      let perfil = await actions.cargarPerfil(store.id);
      if (perfil?.firstName) {
        setFormData(perfil);
      }
    };

    fetchPerfil();
  }, [store.id, actions]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api/perfil", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registro exitoso:", data);
      } else {
        console.error("Error al registrar usuario");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Calificaciones del SegundoPerfil
  const ratings = [
    {
      comment: "¡Gran trabajo! Muy profesional.",
      rating: 5,
    },
    {
      comment: "Buen servicio, lo recomiendo.",
      rating: 4,
    },
    // Puedes agregar más comentarios y calificaciones según sea necesario
  ];
  return (
    <div className="profile-container">
     
      <div className="header">
        <h1 className="profile-name"  onSubmit={handleSubmit}> 
          {formData.firstName}
            {handleInputChange}</h1>
            </div>
            
      <div className="photo text-center">
        <label htmlFor="upload-photo" className="photo-text">
          {image ? (
            <img src={image} alt="uploaded" className="uploaded-image" />
          ) : (
            "FOTO"
          )}
        </label>
        <input
          type="file"
          id="upload-photo"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>

      {/* Mostrar calificaciones */}
      <div className="ratings-section">
        <div className="comments-ratings text-center">COMENTARIOS Y CALIFICACIONES</div>
        <div className="ratings-list">
          {ratings.map((item, index) => (
            <div className="rating-item" key={index}>
              <div className="comment">{item.comment}</div>
              <div className="rating">Calificación: {item.rating}</div>
            </div>
          ))}
        </div>
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
            type= "text"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleInputChange}
          />
        </div>
        {formData.tipoUsuario === "prestador" && (
        <div className="form-group">
          <label htmlFor="rubro">Rubro:</label>
          <input
            type="text"
            id="rubro"
            name="rubro"
            value={formData.rubro}
            onChange={handleInputChange}
          />
        </div>
      )}
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
      <div className="additional-info"></div>
      <div className="actions">
       <Link to="/"> <button className="action-button">Salir</button></Link>
       <Link to= "/Buscador"><button className="action-button">Buscar Trabajo</button></Link> 
      </div>
    </div>
  );
};