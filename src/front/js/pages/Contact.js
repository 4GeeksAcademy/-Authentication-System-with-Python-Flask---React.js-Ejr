import React from 'react';
import heroImg from "../../img/hero-img.png";
import worldDottedMap from "../../img/world-dotted-map.png";
import "../../styles/home.css";

const Contact = () => {

  const handleEmailClick = () => {
    window.location.href = "mailto:info@example.com";
  };

  return (
    <>
      <section id="hero" className="hero section dark-background snipcss-OOBoC">
        <img
          src={worldDottedMap}
          alt=""
          className="hero-bg aos-init aos-animate"
          data-aos="fade-in"
        />
        <div className="container">
          <div className="row gy-4 d-flex justify-content-between">
            <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
              <button
                onClick={handleEmailClick}
                className="btn btn-primary w-100 p-3 fw-bold"
              >
                Contact by email click here
              </button>
              <img src={heroImg} className="img-fluid mb-3 mb-lg-0 imgContact" alt="" />
            </div>
            <div
              className="col-lg-5 order-1 order-lg-2 hero-img aos-init aos-animate"
              data-aos="zoom-out"
            >
              <h2 data-aos="fade-up" className="aos-init aos-animate">
                Repair Workshop
              </h2>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d179.57283464912325!2d-6.233494991739129!3d53.33863809049381!2m3!1f0!2f44.96106715296226!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x48670eebbdb7aaab%3A0x906808e57905dbe!2s16%20Gordon%20St%2C%20Dublin%204%2C%20D04%20FD90%2C%20Irlanda!5e1!3m2!1ses!2ses!4v1722956195920!5m2!1ses!2ses"
                width="600"
                height="450"
                style={{border:0}}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
