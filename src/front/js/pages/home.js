import React from "react";
import "../../styles/home.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSignInAlt, faInfoCircle } from "@fortawesome/free-solid-svg-icons";


export const Home = () => {
  return (
    <div className="mushoChoiceDrivenUserExpe">
      <section className="typefullSize">
        <div className="copyContainer">
          <div className="copyComponent">
            <div className="headingText">
              <h1 className="heading">Bienvenido a PhysioCareSync</h1>
              <h3 className="subheading">
			  Su hogar para servicios profesionales de atención médica.
              </h3>
            </div>
            <button className="ctaButton">
              <div className="textContainer2">
                <b className="cta2">Iniciar una sesión</b>
              </div>
            </button>
          </div>
        </div>
        <img className="imageContainerIcon" alt="" src="https://situ.care/salud/wp-content/uploads/2022/12/old-man-in-nursing-home-helped-by-female-doctor-to-take-his-medicine.jpg" />
      </section>
      <section className="property1comprehensive">
        <div className="headingWrapper">
          <div className="headingContainer">
            <div className="copyComponent1">
              <div className="headingText">
                <h1 className="howItWorks">Proceso simple</h1>
                <div className="howItWorks1">
				Atención médica a tu alcance en tres sencillos pasos.
                </div>
              </div>
              <button className="ctaButton1">
                <div className="textContainer">
                  <b className="howItWorks2">Aprende más</b>
                </div>
              </button>
            </div>
            <img className="imageDalle" alt="" src="/image--dalle@2x.png" />
          </div>
        </div>
        <div className="stepsWrapper">
          <div className="howItWorksGrid">
            <div className="step">
            <i class="fa-regular fa-comment"></i>
              <b className="featureTitle">Inicio de sesión del paciente</b>
              <div className="stepDescription">
			  Inicie sesión como paciente y busque profesionales.
              </div>
            </div>
            <div className="step">
            <i class="fa-solid fa-camera" ></i>
              <b className="featureTitle">Inicio de sesión profesional</b>
              <div className="stepDescription">
			  Inicia sesión como profesional y encuentra trabajo.
              </div>
            </div>
            <div className="step">
             <i class="fa-solid fa-plus"></i>
              <b className="featureTitle">Crea una cuenta</b>
              <div className="stepDescription">
			  ¿Nuevo en HealthPro? Comience creando una cuenta.
              </div>
            </div>
            <div className="step">
            <i class="fa-solid fa-magnifying-glass-chart"></i>
              <b className="featureTitle">Contratar a un profesional</b>
              <div className="stepDescription">
			  Encuentre y contrate fisioterapeutas y enfermeras cerca de usted.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="typesimpleCta">
        <div className="container">
          <div className="textContent">
            <div className="copy">
              <h1 className="heading1">"¡Regístrate como Especialista Ahora!"</h1>
            </div>
            <button className="buttonCombo">
              <div className="button2">
                <div className="textContainer">
                  <b className="howItWorks2">Regístrate hoy</b>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
