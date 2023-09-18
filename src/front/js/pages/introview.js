import React from 'react';
import ComponentifyLogoOrange from "../../img/componentify-logo-orange.png";
import "../../styles/intro.css";



const IntroView = () => {
  return (
<div className="text-center">
  <div className="container-fluid fondo-difuminado">
    <div className="context"></div>
    <div className="area">
      <ul class="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <div className="d-flex justify-content-center align-items-center"> {/* Modificación aquí */}
      <div className="jumbotron-content text-center">
        <img
          src={ComponentifyLogoOrange}
          alt="Logo"
          width="265"
          height="239"
          className="mt-4"
        />

        <h1 style={{ fontSize: "5rem" }}>
          <strong>Powerful components for your website</strong>
        </h1>

        <p style={{ fontSize: "1.3rem", marginTop: "10px" }}>
          "A potent, adaptable, and feature-rich frontend toolkit. Construct and
          personalize using Sass, make the most of prebuilt grid systems and
          components, and breathe life into your projects with robust JavaScript
          plugins."
        </p>

        <div className="d-flex justify-content-center mt-3">
          <div
            class="c-alert c-alert-componentify"
            role="alert"
            style={{ height: '60px', fontSize: '17px' }}
          >
            $ npm i componentify5.3.2
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-clipboard-minus"
              viewBox="0 0 16 16"
            >
              {/* ... (Código del icono) */}
            </svg>
          </div>

          <a
            href="#learn"
            type="button"
            className="btn btn-info mx-1 text-white"
            style={{
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '19px',
            }}
          >
            <strong>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-book-half"
                viewBox="0 0 16 16"
              >
                {/* ... (Código del icono) */}
              </svg>{' '}
              Read the docs
            </strong>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default IntroView;