import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import "../../styles/segundoperfil.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../component/Buscador.jsx"
import "./../pages/home.js"

export const SegundoPerfil = () => {
  const data = {
    name: "Nombre Prestador",
    jobs: ["Trabajo 1", "Trabajo 2", "Trabajo 3"],
    description: "Descripción/Experiencia/Comuna",
    comuna: "Comuna",
    ratings: [
      {
        comment: "¡Gran trabajo! Muy profesional.",
        rating: 5,
      },
      {
        comment: "Buen servicio, lo recomiendo.",
        rating: 4,
      },
      // Puedes agregar más comentarios y calificaciones según sea necesario
    ],
  };
  const {actions} = useContext(Context)
  const [profileData, setData] = useState (data)
useEffect(async ( ) => {
  let perfil = await actions.cargarPerfil()
  setData ({...profileData, name:perfil.firstName, comuna:perfil.comuna, description:perfil.rubro})
}, [])

  // const uploadImageToServer = async (image) => {
  //   try {
  //     const formData = new FormData();
  //     formData.append('file', image); // 'file' debe coincidir con el nombre del campo que espera la API
  
  //     const response = await fetch('URL_DE_TU_API', {
  //       method: 'POST',
  //       body: formData,
  //       // Puedes agregar encabezados adicionales aquí, como headers, si la API lo requiere
  //     });
  
  //     if (response.ok) {
  //       const data = await response.json();
  //       // Realiza acciones con la respuesta si es necesario
  //       console.log('Imagen subida exitosamente:', data);
  //     } else {
  //       console.error('Error al subir la imagen:', response.statusText);
  //     }
  //   } catch (error) {
  //     console.error('Error de red:', error);
  //   }
  // };
  
  // // Suponiendo que tienes la imagen guardada en 'imageFile'
  // uploadImageToServer(imageFile);

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Realizar validaciones o acciones con la imagen seleccionada, por ejemplo:
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container profile-container">
      <div className="row">
        <div className="col-md-6">
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
          <div className="provider-name text-center">
            <div className="provider-name-text">{profileData.name}</div>
          </div>
          <div className="jobs">
            {profileData.jobs.map((job, index) => (
              <div className={`job job-${index + 1}`} key={index}>
                <div className="job-text">{job}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <div className="description-wrapper">
            <div className="description">{profileData.description}, Comuna: {profileData.comuna}</div>
          </div>
          <div className="ratings-section">
            <div className="comments-ratings text-center">
              COMENTARIOS Y CALIFICACIONES
            </div>

            <div className="ratings-list">
              {profileData.ratings.map((item, index) => (
                <div className="rating-item" key={index}>
                  <div className="comment">{item.comment}</div>
                  <div className="rating">Calificación: {item.rating}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="action-buttons text-center">
            <div className="logout">
              <Link to= "/"><button className="btn btn-danger logout-text">Salir</button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};