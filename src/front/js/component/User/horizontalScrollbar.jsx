import React from "react";
import BodyPartCard from "./bodyPartCard.jsx";
import "../../../styles/User-styles/horizontalScrollbar.css";

const HorizontalScrollbar = ({ data, bodyParts, bodyPart, setBodyPart }) => {
  return (
    <article className="horizontal-bar">
      {data.map((item) => (
        <div
          key={item.id || item}
          itemID={item.id || item}
          title={item.id || item}
        >
          {bodyParts ? (
            <BodyPartCard
              item={item}
              bodyPart={bodyPart}
              setBodyPart={setBodyPart}
            />
          ) : (
            <ExerciseCard exercise={item} />
          )}
        </div>
      ))}
    </article>
  );
};

export default HorizontalScrollbar;
