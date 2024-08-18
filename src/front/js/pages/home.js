import React, { useContext } from "react";
import { useCountUp } from 'use-count-up';
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";
import heroImg from "../../img/hero-img.png";
import worldDottedMap from "../../img/world-dotted-map.png";

export const Home = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const { value: happyClients } = useCountUp({ isCounting: true, end: 1232, duration: 3 });
  const { value: scheduledServices } = useCountUp({ isCounting: true, end: 521, duration: 3 });
  const { value: yearsOfExperience } = useCountUp({ isCounting: true, end: 32, duration: 3 });

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
              <h2 data-aos="fade-up" className="aos-init aos-animate">
                Your Trusted Auto Repair Workshop
              </h2>
              <p
                data-aos="fade-up"
                data-aos-delay="100"
                className="aos-init aos-animate"
              >
                Keep your vehicle in top shape. Book appointments easily and
                manage your car maintenance effortlessly with us. We're your
                reliable partner for all auto repair needs.
              </p>
              <button
                onClick={() => navigate("/bookappointment")}
                className="btn btn-primary w-100 p-3 fw-bold"
              >
                Book Your Appointment at Our Trusted Workshop
              </button>
              <div
                className="row gy-4 aos-init aos-animate"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div className="col-lg-6 col-md-6 col-6 mx-auto my-3">
                  <div className="stats-item text-center w-100 h-100">
                    <span>{happyClients}</span>
                    <p>Happy Clients</p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-6 mx-auto my-3">
                  <div className="stats-item text-center w-100 h-100">
                    <span>{scheduledServices}</span>
                    <p>Scheduled Services</p>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-6 mx-auto my-3">
                  <div className="stats-item text-center w-100 h-100">
                    <span>{yearsOfExperience}</span>
                    <p>Years of Experience</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-5 order-1 order-lg-2 hero-img aos-init aos-animate"
              data-aos="zoom-out"
            >
              <img src={heroImg} className="img-fluid mb-3 mb-lg-0" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
