import React, { useContext } from "react";
import { EventCard } from "../component/EventCard";

const PopularCategories = () => {
  return (
    <div className="container-fluid popular-events grey-two-background d-flex align-items-center justify-content-center">
      <div className="container">

        <div className="section-header">
        <h2 className="text-center mt-4 mb-3">Popular Categories Near You</h2>
        </div>
        

        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4">
            <EventCard />
          </div>
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

export default PopularCategories;
