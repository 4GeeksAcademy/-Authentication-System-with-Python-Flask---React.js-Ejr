import React from "react";
import ServicesLeft from "../../../img/services-left.png";
import ServicesRight from "../../../img/services-right.png";
import "../../../styles/Landing-styles/services.css";

const Services = () => {
  return (
    <section className="services-container">
      <div className="left-services">
        <img src={ServicesLeft} alt="basic fitnes section image" />
        <h4>
          Basic <span className="green-text">Fitness</span>
        </h4>
        <ul>
          <li>Stretching and flexibility</li>
          <li>Aerobic exercise</li>
          <li>Strength training</li>
          <li>Sports nutrition</li>
        </ul>
      </div>
      <div className="right-services">
        <img src={ServicesRight} alt="Body building section image" />
        <h4>
          Body <span className="green-text">Body</span>
        </h4>
        <ul>
          <li>Professional bodybuilding</li>
          <li>Classic physique</li>
          <li>Men's physique</li>
          <li>Women's physique</li>
        </ul>
      </div>
    </section>
  );
};

export default Services;
