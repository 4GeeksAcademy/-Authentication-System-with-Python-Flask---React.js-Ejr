import React from "react";
import EquipmentImage from "../../../img/equipment.png"
import BodyPartImage from "../../../img/body-part.png"
import TargetImage from "../../../img/target-image.png"

const Detail = ({ exerciseDetail }) => {
  const { bodyPart, gifUrl, name, target, equipment } = exerciseDetail;

  const extraDetail = [
    {
      icon: BodyPartImage,
      name: bodyPart,
    },
    {
      icon: TargetImage,
      name: target,
    },
    {
      icon: EquipmentImage,
      name: equipment,
    },
  ];

  return (
    <div className="detail-container">
      <img src={gifUrl} alt={name} loading="lazy" className="detail-img" />
      <div>
        <h3>{name}</h3>
        <h6>
          Exercises keep you strong.<span style={{ textTransform: "capitalize" }}>{name}</span> bup is one
          of the best <br /> exercises to target your {target}. It will help you
          improve your
          <br /> mood and gain energy.
        </h6>
        {extraDetail?.map((item) => (
          <div key={item.name}>
            <button>
              <img
                src={item.icon}
                alt={bodyPart}
                style={{ width: "50px", height: "50px" }}
              />
            </button>
            <h5>{item.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;
