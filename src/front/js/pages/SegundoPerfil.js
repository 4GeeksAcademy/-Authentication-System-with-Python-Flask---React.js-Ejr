import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import "../../styles/segundoperfil.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./../component/Buscador.jsx";
import "./../pages/home.js";

export const SegundoPerfil = () => {
  const data = {
    name: "Nombre Prestador",
    apellido: "Apellido Prestador",
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
    ],
  };
  const { actions } = useContext(Context);
  const [profileData, setData] = useState(data);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        let perfil = await actions.cargarPerfil();
        setData((prevData) => ({
          ...prevData,
          name: perfil.firstName,
          apellido: perfil.apellido,
          comuna: perfil.comuna,
          description: perfil.rubro,
        }));
      } catch (error) {

        console.error("Error al cargar el perfil:", error);

        console.error('Error al cargar el perfil:', error);

      }
    };

    fetchData();
  }, []);

  return (
    <div className="container profile-container">
      <div className="row">
        <div className="col-md-6">
          <div className="photo text-center">
            <label
              htmlFor="upload-photo"
              className="photo-text"
              style={{ color: "grey" }}
            >
              {image ? (
                <img
                  src={image}
                  alt="uploaded"
                  className="uploaded-image img-fluid"
                />
              ) : (
                "Click para ingresar una foto"
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
                <input
                  type="text"
                  className="job-text"
                  value={job}
                  onChange={(e) => {
                    const newJobs = [...profileData.jobs];
                    newJobs[index] = e.target.value;
                    setData((prevData) => ({
                      ...prevData,
                      jobs: newJobs,
                    }));
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="col-md-6">
          <div className="description-wrapper mt-4">
            <div className="description">
              {" "}
              {profileData.description}, <strong>Comuna:</strong>{" "}
              {profileData.comuna}
            </div>
          </div>
          <div className="ratings-section">
            <div className="comments-ratings">COMENTARIOS Y CALIFICACIONES</div>
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
              <Link to="/generadorPublicacion">

                <button
                  className="btn btn-primary logout-text"
                  style={{ marginTop: "95px" }}
                >
                  Publicar Trabajo
                </button>

              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
