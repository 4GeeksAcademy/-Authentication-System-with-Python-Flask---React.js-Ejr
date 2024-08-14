import React from "react";
import "../../styles/discover.css";

const Discover = () => {
  return (
    <div className="gallery">
      <h1>Descubre eventos</h1>
      <div className="gallery-grid">
        <div className="gallery-item">
          <img
            src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Blue Concert Crowd"
            className="gallery-item-image"
          />
          <div className="gallery-item-content">
            <h2>Blue Concert</h2>
            <p>Prepárate para sumergirte en una experiencia musical inolvidable en el "Blue Concert", donde la magia de la música se fusiona con la serenidad del color azul.</p>
            <button>Purchase Tickets</button>
          </div>
        </div>
        <div className="gallery-item">
          <img
            src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Blue Concert Crowd"
            className="gallery-item-image"
          />
          <div className="gallery-item-content">
            <h2>Blue Concert</h2>
            <p>Prepárate para sumergirte en una experiencia musical inolvidable en el "Blue Concert", donde la magia de la música se fusiona con la serenidad del color azul.</p>
            <button>Purchase Tickets</button>
          </div>
        </div>
        <div className="gallery-item">
          <img
            src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Blue Concert Crowd"
            className="gallery-item-image"
          />
          <div className="gallery-item-content">
            <h2>Blue Concert</h2>
            <p>Prepárate para sumergirte en una experiencia musical inolvidable en el "Blue Concert", donde la magia de la música se fusiona con la serenidad del color azul.</p>
            <button>Purchase Tickets</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discover;

