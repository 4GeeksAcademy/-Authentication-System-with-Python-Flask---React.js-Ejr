import React from "react";
import avatar from "../../img/avatar.jpg";

const imgStlye = {
  width: "100px",
  height: "100px",
  objectFit: "cover",
};

const Reviews = (props) => {
  return (
    <div className="row mt-4 mb-4">
      <div className="col-lg-2">
        <img
          className="rounded-circle mr-2"
          src={props.img}
          style={imgStlye}
          alt={avatar}
        />
      </div>

      <div className="col-lg-8 p-2">
        <div className="row">
          <h3>{props.name}</h3>
        </div>
        <div className="row">
          <h5>{props.comment}</h5>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
