import React from "react";

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

  return (
    <div className="detail-container">
      <img src={gifUrl} alt={name} loading="lazy" className="detail-img" />
    </div>
  );
};

export default Detail;
