

import React from "react";
import "../../styles/segundoperfil.css";
import "bootstrap/dist/css/bootstrap.min.css"; 

export const SegundoPerfil = () => {
  const profileData = {
    name: "Nombre Prestador",
    jobs: ["Trabajo 1", "Trabajo 2", "Trabajo 3"],
    description: "Descripción/Experiencia/Comuna",
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

  return (<div className="container profile-container">
  <div className="row">
    <div className="col-md-6">
      <div className="photo text-center">
        <div className="photo-text">FOTO</div>
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
        <div className="description">{profileData.description}</div>
      </div>
      <div className="ratings-section">
        <div className="comments-ratings text-center">COMENTARIOS Y CALIFICACIONES</div>

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
          <button className="btn btn-danger logout-text">Salir</button>
        </div>
        <div className="job-search">
          <button className="btn btn-primary job-search-text">Buscar Trabajo</button>
        </div>
      </div>
    </div>
  </div>
</div>

  );

};


