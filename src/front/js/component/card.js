import React from "react";
import "../../styles/card.css";

export const Card = (props) => {
  const { title, description, imgurl, genre } = props

  return (
    <div className="card bg-dark text-white" style={{ width: "15rem" }}>
      <img
        src={imgurl}
        className="card-img-top"
        alt="..."
      />
      <div className="card-body">
        <h5 className="card-title">
          {title}
        </h5>
        <p className="game-genre">
          {genre}
        </p>
        <p className="card-text">
          {description}
        </p>
      </div>
    </div>
  );
};