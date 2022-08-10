import React from "react";
import dogpic from "../../img/dog1.jpg";

const Card = (props) => {
  let style1 = {
    width: "18rem",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    border: "none",
  };

  let imageStyle = {
    height: "100%",
    display: "block",
    objectFit: "cover",
    width: "100%",
    overflow: "hidden",
    position: "relative",
  };

  return (
    <div className="position-absolute ">
      <div className="card" style={style1}>
        <img
          src={dogpic}
          className="card-img-top"
          alt="..."
          style={imageStyle}
        />
      </div>
    </div>
  );
};
export default Card;
