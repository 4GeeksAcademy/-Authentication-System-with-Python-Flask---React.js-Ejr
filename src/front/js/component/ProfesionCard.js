import React from 'react';

export const ProfesionCard = ({ nombre, calificacion, comentarios }) => {
  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row g-0">
        <div className="col-md-4">
          {/* Aquí podrías agregar contenido relacionado con la profesión si es necesario */}
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{nombre}</h5>
            <h6 className="card-subtitle mb-2 text-muted">Calificación: {calificacion}</h6>
            <p className="card-text">Comentarios:</p>
            <ul className="list-group list-group-flush">
              {comentarios.map((comentario, index) => (
                <li key={index} className="list-group-item">{comentario}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
