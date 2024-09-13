import React from "react";
import PropTypes from "prop-types";

export const CardComponent = ({ imageSrc, title, content, footerText }) => {
  return (
    <div className="card border-card-match-gamers">
      <img src={imageSrc} className="card-img-top" alt={title} />
      <div className="card-body custom-rounded-bottom">
        <h5 className="card-title text-white">{title}</h5>
      </div>
    </div>
  );
};

CardComponent.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};
