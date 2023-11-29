import React from 'react';
import { ProfesionCard } from './ProfesionCard';
import "../../styles/home.css";



export const Landing = () => {
  const profesiones = [
    {
      nombre: 'Gasfiter',
      calificacion: 4.5,
      comentarios: ['Excelente trabajo!', 'Lo recomiendo.']
    },
    {
      nombre: 'Electricista',
      calificacion: 4.8,
      comentarios: ['excelente persona.', 'Siempre cumple.']
    },
    {
      nombre: 'Electricista',
      calificacion: 4.8,
      comentarios: ['excelente persona.', 'Siempre cumple.']
    }
  ];

  return (
    <div className="landing-page">
      <div className="landing-page__header">
        <div className="container">
          <h1>Trabaja Con Nosotros</h1>
          <p>Some inspiring subheading goes here.</p>
          <a href="#" className="btn btn-primary btn-lg custom-button">¡Comienza ahora!</a>
        </div>
      </div>

      <div className="container">
        <h1>Nosotros</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="card mb-4">
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4">
              <img src="..." className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              </div>
            </div>
          </div>
        </div>
        {/* anexa las tarjetas de profesiones */}
        <div className="row">
          {profesiones.map((profesion, index) => (
            <div className="col-md-4" key={index}>
              <ProfesionCard
                nombre={profesion.nombre}
                calificacion={profesion.calificacion}
                comentarios={profesion.comentarios}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
