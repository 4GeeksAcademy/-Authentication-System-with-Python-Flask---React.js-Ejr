import React from "react";
import { DESCRIPTION_DATA } from "./data/descriptionData";
import "../../styles/ruteDescription.css";

const RouteDescription = () => {
  return (
    <>
      {DESCRIPTION_DATA.map((description) => (
        <div className="description mx-5 my-5">
          <header className="d-flex my-4 justify-content-between">
            <h5>{description.title}</h5>
            <span>Valoración</span>
          </header>
          <div className="tags d-flex my-4">
            <span>
              {description.tags.map((tag) => (
                <button className="tag mx-2 rounded-pill py-1 px-4">
                  {tag}
                </button>
              ))}
            </span>
          </div>
          <section>
            <h5>{description.duration}</h5>
            <p>{description.body}</p>
          </section>
        </div>
      ))}
    </>
  );
};

export default RouteDescription;
