import React from "react";
import BodyPartCard from "./bodyPartCard.jsx";

const HorizontalScrollbar = ({ data }) => {
  return (
    <div>
      {data.map((item) => (
        <article
          key={item.id || item}
          itemId={item.id || item}
          title={item.id || item}
        >
          <BodyPartCard
            item={itme}
            bodyPart={bodyPart}
            setBodyPart={setBodyPart}
          />
        </article>
      ))}
    </div>
  );
};

export default HorizontalScrollbar;
