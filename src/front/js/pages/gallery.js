import React from "react";
import "../../styles/gallery.css";

const Gallery = () => {
  return (
    <div className="gallery">
      <h1>Galería de Eventos</h1>
      <div className="gallery-grid">
        <div className="gallery-item">Event 1</div>
        <div className="gallery-item">Event 2</div>
        <div className="gallery-item">Event 3</div>
      </div>
    </div>
  );
};

export default Gallery;