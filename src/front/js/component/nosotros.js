import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Nosotros = () => {
    const containerStyle = {
      display: 'flex',
      textAlign: 'center',
      backgroundColor: '#d1efea',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      margin: 'auto',
      };
    
      const headingStyle = {
        color: '#333',
        textAlign: 'center',
      };
    
      const paragraphStyle = {
        color: '#555',
        fontSize: '1.1em',
        lineHeight: '1.6',
        textAlign: 'center',
      };
    
      return (
        <div className="container mt-4" style={containerStyle}>
          <div className="row">
            <div className="col-md-8 offset-md-2">
              <h1 style={headingStyle}>Nosotros</h1>
              <p style={paragraphStyle}>
                Somos una plataforma dedicada a conectar a profesionales de diversos oficios como gasfitería, electricidad, pintura y más, con personas y empresas que requieren sus servicios. Nuestra misión es facilitar la contratación de trabajadores capacitados y confiables para cualquier tipo de proyecto o reparación.
              </p>
              <p style={paragraphStyle}>
                En nuestra marketplace, podrás encontrar una amplia variedad de profesionales verificados y calificados. Ofrecemos un entorno seguro y fácil de usar donde podrás publicar trabajos, recibir presupuestos, comparar perfiles y seleccionar al experto que mejor se adapte a tus necesidades.
              </p>
              <p style={paragraphStyle}>
                ¡Confía en nosotros para encontrar al profesional adecuado y realizar tus proyectos con éxito!
              </p>
            </div>
          </div>
        </div>
      );
    };