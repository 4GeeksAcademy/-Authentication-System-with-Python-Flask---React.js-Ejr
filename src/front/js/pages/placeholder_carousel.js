import React from "react";
import "/workspaces/Watacar_v2/src/front/styles/profile.css";

export const Placeholder_carousel = () => {
  const generatePlaceholderCards = () => {
    const placeholderCards = [];
    for (let i = 0; i < 5; i++) {
      placeholderCards.push(
        <div className="card mx-3" key={i} aria-hidden="true">
          <div className="image-container">
            <img
              src="https://www.hillbrook.qld.edu.au/wp-content/uploads/2019/12/grey-square.jpg"
              className="card-img-top imagePlaceHolder"
              alt="..."
            />
          </div>
          <div className="card-body justify-content-between d-flex">
            <h5 className="card-title placeholder-glow">
              <span className="placeholder col-6"></span>
            </h5>
            <a className="btn btn-secondary disabled placeholder col-6 me-1"></a>
            <a className="btn btn-primary disabled placeholder col-3"></a>
          </div>
        </div>
      );
    }
    return placeholderCards;
  };

  return (
    <div className="d-flex overflow-auto m-5">
      {generatePlaceholderCards()}
    </div>
  );
};
