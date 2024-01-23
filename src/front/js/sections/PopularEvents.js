import React, { useContext } from "react";
import { EventCard } from "../component/EventCard";

const PopularEvents = () => {
  return (
    <div className="container-fluid popular-events grey-background d-flex align-items-center justify-content-center">
      <div className="container text-center section-header">

        <div className="section-header">
        <h2 className="text-center mt-4 mb-3">Events Near You</h2>
        </div>

        <div className="row d-flex justify-content-center">
          <div className="col-lg-3 col-md-6 mb-4">
            <EventCard />
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <EventCard />
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <EventCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularEvents;
