import React from 'react';

const PregFrecuentes = () => {
    return (
      <section className="container my-5 col-12 col-md-8">
        <h2 className="mb-4 text-inicio">Preguntas Frecuentes</h2>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingOne">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >
                ¿Cómo puedo registrarme?
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Para registrarte, haz clic en el botón de <a href="/vista-register">"Registrarme"</a> en la parte inferior del formulario de inicio de sesión y completa el formulario con tus datos.
              </div>
            </div>
          </div>
  
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingTwo">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                ¿Cómo puedo recuperar mi contraseña?
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Haz clic en <a href="/vista-login">"Olvidé mi contraseña"</a> en la página de inicio de sesión, ingresa tu correo y recibirás un mail de HablemosUY Salud Mental para restablecer tu contraseña siguiendo las instrucciones desde el enlace.
              </div>
            </div>
          </div>
  
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingThree">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                ¿Qué métodos de pago aceptan?
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Aceptamos todas las tarjetas de crédito principales, <a href="/">PayPal</a> y transferencias bancarias.
              </div>
            </div>
          </div>
  
          <div className="accordion-item">
            <h2 className="accordion-header" id="headingFour">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                ¿Cómo puedo conseguir asistencia de emergencia?
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse"
              aria-labelledby="headingFour"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Accediendo a la <a href="/emergencias">sección de emergencias</a> en la parte superior de la pantalla, encontrarás números telefónicos de asistencia psicológica inmediata y otros datos de interés.
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

export default PregFrecuentes;
