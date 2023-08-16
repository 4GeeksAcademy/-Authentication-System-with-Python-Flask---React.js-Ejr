import React from 'react';

const AboutUs = () => {
  return (
    <>
      <div className='about-content'>
        <img src="/src/front/img/trip.jpg" alt="logo trip nexus" />
      </div>
      <div className="card card-about">
        <div className="card-body ">
          <h2 className='title-about'>Sobre Nosotros</h2>
          <p className='text-about'>"¡Bienvenido a Trip Nexus, tu puerta hacia experiencias inolvidables! Nuestro exclusivo sistema premium está diseñado para ofrecerte los mejores precios en tus viajes y hacer que cada aventura sea inigualable. Conéctate al mundo a través de nuestro innovador servicio, donde las empresas destacadas muestran sus ofertas de primera clase, asegurando que siempre encuentres las mejores opciones. ¡Viaja con ventaja y descubre destinos fascinantes con Trip Nexus! Únete a nosotros y déjanos convertir cada viaje en una experiencia extraordinaria."</p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;