import React from "react";
import { Link } from "react-router-dom";

export const EventCard = () => {
  return (
    <div className="card event-card" style={{ width: "18rem" }}>

      <img img id = 'imgShow' src="https://picsum.photos/200/200?random=2" className="card-img-top" alt="..."/>

      <div className="event-card-body">
        <h5 className="event-card-title">Card title</h5>
        <p className="event-card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <Link to="#" className="btn btn-primary custom-btn">More info.</Link>
      </div>

    </div>
  );
};
