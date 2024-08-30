import React from 'react';

const LegalDocs = () => {
  return (
    <div className="container my-5 col-12 col-md-8 mt-5">
      <h2 className="mb-4 text-inicio">Documentación Legal</h2>
      <div className="accordion" id="legalDocsAccordion">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button
              className="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <spam className="fw-medium">Aviso Legal</spam>
            </button>
          </h2>
          <div
            id="collapseOne"
            className="accordion-collapse collapse show"
            aria-labelledby="headingOne"
            data-bs-parent="#legalDocsAccordion"
          >
            <div className="accordion-body">
              <p>
                <h6>Nombre del Proyecto: HablemosUY Salud Mental</h6>
              </p>
              <p>
                <h6>Ubicación: Uruguay</h6>
              </p>
              <p>
                <h6>Email: hablemosuysaludmental@gmail.com</h6>
              </p>
              <p>
                El presente Aviso Legal establece las condiciones generales que regulan el acceso y uso del sitio web de HablemosUY Salud Mental. Al acceder y navegar por este sitio, el usuario acepta las condiciones detalladas en este documento.
              </p>
              <p>
                <h6>Responsabilidad por Contenidos:</h6>
              </p>
              <p>
                HablemosUY Salud Mental no garantiza la exactitud, fiabilidad o actualidad de la información proporcionada en la web. El uso de la información contenida en este sitio es responsabilidad exclusiva del usuario. No nos hacemos responsables por los errores u omisiones en los contenidos, ni por el uso que los usuarios puedan hacer de la misma. En ningún caso HablemosUY Salud Mental será responsable por daños directos, indirectos, incidentales, especiales o consecuentes que resulten del uso o la incapacidad de uso de nuestro sitio web.
              </p>
              <p>
                <h6>Exención de Responsabilidad por Enlaces:</h6>
              </p>
              <p>
                Este sitio puede contener enlaces a otras páginas web que son gestionadas por terceros. HablemosUY Salud Mental no asume ninguna responsabilidad por el contenido, políticas o prácticas de privacidad de estos sitios externos. El usuario accede a estos enlaces bajo su propio riesgo.
              </p>
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
              <spam className="fw-medium">Declaración de Privacidad</spam>
            </button>
          </h2>
          <div
            id="collapseTwo"
            className="accordion-collapse collapse"
            aria-labelledby="headingTwo"
            data-bs-parent="#legalDocsAccordion"
          >
            <div className="accordion-body">
              <p>
                En HablemosUY Salud Mental, la privacidad y seguridad de los datos personales de nuestros usuarios es una prioridad. Este documento explica cómo recopilamos, utilizamos y protegemos la información que nos proporcionan.
              </p>
              <h6>Recopilación de Información:</h6>
              <p>
                Recopilamos datos personales tales como nombre, correo electrónico, y otros detalles proporcionados voluntariamente por los usuarios al registrarse o utilizar nuestros servicios. Esta información se utiliza exclusivamente para los fines de conectar a usuarios con profesionales en psicología y para mejorar nuestros servicios.
              </p>
              <h6>Protección de Datos:</h6>
              <p>
                Adoptamos las medidas de seguridad técnicas y organizativas necesarias para proteger los datos personales contra el acceso no autorizado, uso indebido, pérdida, destrucción o alteración. Sin embargo, no podemos garantizar la seguridad absoluta de los datos en la transmisión a través de Internet y los usuarios aceptan los riesgos inherentes a la transmisión de información en línea.
              </p>
              <h6>Responsabilidad y Exención de Responsabilidad:</h6>
              <p>
                En el improbable caso de una violación de seguridad que comprometa los datos personales de los usuarios, HablemosUY Salud Mental se compromete a informar a los usuarios afectados tan pronto como sea posible y a tomar las medidas necesarias para mitigar cualquier daño. Sin embargo, no asumimos responsabilidad por los daños que puedan surgir como resultado de ataques cibernéticos u otras vulnerabilidades de seguridad que estén fuera de nuestro control razonable.
              </p>
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
              <spam className="fw-medium">Términos y Condiciones de Uso</spam>
            </button>
          </h2>
          <div
            id="collapseThree"
            className="accordion-collapse collapse"
            aria-labelledby="headingThree"
            data-bs-parent="#legalDocsAccordion"
          >
            <div className="accordion-body">
              <p>
                <h6>Aceptación de los Términos:</h6>
                Al acceder y utilizar la plataforma de HablemosUY Salud Mental, el usuario acepta cumplir con los términos y condiciones que se detallan a continuación. Estos términos podrán ser modificados en cualquier momento, y dichas modificaciones serán efectivas a partir de su publicación en el sitio web.
              </p>
              <h6>Responsabilidad del Usuario:</h6>
              <p>
                El usuario se compromete a utilizar la plataforma de manera responsable, proporcionando información veraz y respetando a los demás usuarios y profesionales. El uso indebido de la plataforma, incluyendo la violación de los términos de servicio, puede resultar en la suspensión o terminación de la cuenta del usuario.
              </p>
              <h6>Limitación de Responsabilidad:</h6>
              <p>
                HablemosUY Salud Mental no será responsable por cualquier daño directo o indirecto, lucro cesante, pérdida de datos o cualquier otra pérdida derivada del uso o imposibilidad de uso de nuestros servicios, incluso si hemos sido advertidos de la posibilidad de tales daños. Esto incluye, pero no se limita a, daños causados por errores, omisiones, interrupciones del servicio, fallos de seguridad o acceso no autorizado a nuestros sistemas.
              </p>
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
              <spam className="fw-medium">Cookies</spam>
            </button>
          </h2>
          <div
            id="collapseFour"
            className="accordion-collapse collapse"
            aria-labelledby="headingFour"
            data-bs-parent="#legalDocsAccordion"
          >
            <div className="accordion-body">
              <h6>Uso de Cookies:</h6>
              <p>
                Nuestro sitio utiliza cookies para personalizar y mejorar la experiencia del usuario. Las cookies son pequeños archivos de texto que se almacenan en el dispositivo del usuario para recordar preferencias y facilitar la navegación.
              </p>
              <h6>Tipos de Cookies Utilizadas:</h6>
              <p>
                Utilizamos cookies de sesión, que se eliminan al cerrar el navegador, y cookies persistentes, que permanecen en el dispositivo del usuario por un período determinado. Estas cookies pueden ser utilizadas para recopilar estadísticas de uso, recordar las preferencias del usuario, y facilitar el acceso a funcionalidades del sitio.
              </p>
              <h6>Consentimiento y Gestión de Cookies:</h6>
              <p>
                Al utilizar nuestro sitio, el usuario consiente el uso de cookies de acuerdo con esta política. El usuario puede gestionar y desactivar las cookies desde la configuración de su navegador; sin embargo, esto puede afectar la funcionalidad y la experiencia en el sitio. HablemosUY Salud Mental no se hace responsable por los efectos negativos que puedan derivarse de la desactivación de cookies por parte del usuario.
              </p>
              <h6>Exención de Responsabilidad:</h6>
              <p>
                Aunque hacemos todo lo posible para proteger nuestros sistemas y la información de los usuarios, no podemos garantizar la invulnerabilidad total contra ataques cibernéticos o accesos no autorizados. En caso de que terceros accedan ilegalmente a la información recopilada a través de cookies, HablemosUY Salud Mental no será responsable de los daños y perjuicios que puedan derivarse de dicha situación.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDocs;
