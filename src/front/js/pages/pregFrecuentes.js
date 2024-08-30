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
                <span className="fw-medium">¿Cómo puedo registrarme?</span>                
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse"
              aria-labelledby="headingOne"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Para registrarte, haz clic en el botón de <a href="/vista-register">"Registrarme"</a> en la parte inferior del formulario de inicio de sesión o en nuestra página de inicio. Completa el formulario con tus datos y si todo es correcto recibirás un correo con un enlace para activar tu cuenta. Este paso es necesario aunque te registres a través del servicio de registro de Google, este proceso de verificación solo se realizará la primer vez que vayas a iniciar sesión.
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
                <span className="fw-medium">¿Cómo puedo recuperar o cambiar mi contraseña?</span>               
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse"
              aria-labelledby="headingTwo"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
              En nuestra página de inicio de sesión haz clic en <a href="/vista-login">"Olvidé mi contraseña"</a>, se desplegará un modal en el que deberás ingresar tu correo y enviarlo. Recibirás un mail de HablemosUY Salud Mental para restablecer o cambiar tu contraseña siguiendo las instrucciones desde el enlace y una vez completado este proceso ya puedes iniciar sesión con la nueva contraseña que hayas establecido.
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
                <span className="fw-medium">¿Qué métodos de pago aceptamos?</span>               
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse"
              aria-labelledby="headingThree"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Aceptamos todas las tarjetas de crédito, <a href="/">PayPal</a> y transferencias bancarias.
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
                <span className="fw-medium">¿Cómo puedo acceder a asistencia de emergencia?</span>               
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
