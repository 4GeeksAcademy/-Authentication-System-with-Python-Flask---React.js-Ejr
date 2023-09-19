import React from 'react';
import ComponentifyLogoOrange from "../../img/componentify-logo-orange.png";
import "../../styles/intro.css";

const IntroView = () => {
  return (
<div className="container-fluid fondo-difuminado">
<div className="context">
</div>
<div className="area" >
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
    </div >
  <div className="d-flex align-items-center justify-content-center vh-20">
    <div className="jumbotron-content text-center">
    
    <img
  src={ComponentifyLogoOrange}
  alt="Logo"
  width="265"
  height="239"
  className="mt-4 rotate-animation  logo-with-border"
/>


<div className="container"  style={{ width: '70%' }}>

      <h1 style={{ fontSize: "5rem" }}>
        <strong>Powerful components for your website</strong>
      </h1>

      <p style={{ fontSize: "1.3rem", marginTop: "20px" }}>
        "A potent, adaptable, and feature-rich frontend toolkit. Construct and
        personalize using Sass, make the most of prebuilt grid systems and
        components, and breathe life into your projects with robust JavaScript
        plugins."
      </p>

      <div className="d-flex justify-content-center mt-3">
        <div
       class="c-alert c-alert-fog" role="alert"

          style={{ height: '60px', fontSize: '17px' }}
        >
          $ npm i componentify 5.3.2   .

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-clipboard-minus"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M5.5 9.5A.5.5 0 0 1 6 9h4a.5.5 0 0 1 0 1H6a.5.5 0 0 1-.5-.5z"
            />
            <path
              d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"
            />
            <path
              d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"
            />
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
              className="bi bi-book-half"
              viewBox="0 0 16 16"
            >
              <path
                d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.350-2.107-.692-3.287-.810-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.810 4.287.940c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.020 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.020A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"
              />
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