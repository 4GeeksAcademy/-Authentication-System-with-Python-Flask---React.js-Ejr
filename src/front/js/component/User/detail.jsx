import React from "react";

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
        <h2>{name}</h2>

        <h3>
          Exercises keep you strong.{" "}
          <span style={{ textTransform: "capitalize" }}>{name}</span> bup is one
          of the best <br /> exercises to target your {target}. It will help you
          improve your
          <br /> mood and gain energy.
        </h3>
        {extraDetail?.map((item) => (
          <div key={item.name}>
            <button>
              <img
                src={item.icon}
                alt={bodyPart}
                style={{ width: "50px", height: "50px" }}
              />
            </button>
            <h4>{item.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Detail;
