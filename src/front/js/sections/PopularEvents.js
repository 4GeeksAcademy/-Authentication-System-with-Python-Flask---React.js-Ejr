import React, { useContext } from "react";
import { EventCard } from "../component/EventCard";

const PopularEvents = () => {

  const imageUrl01 = "https://picsum.photos/200/150?random=1";
  const imageUrl02 = "https://picsum.photos/200/150?random=2";
  const imageUrl03 = "https://picsum.photos/200/150?random=3";

  return (
    <div className="container-fluid popular-events grey-background d-flex align-items-center justify-content-center">
      <div className="container text-center section-header">

        <div className="section-header">
        <h2 className="text-center mt-4 mb-3">Popular Events Near You</h2>
        </div>

        <div className="row d-flex justify-content-center">

          <div className="col-lg-3 col-md-6 mb-4">
          <EventCard imageUrl={imageUrl01} />
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4">
          <EventCard imageUrl={imageUrl02} />
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4">
          <EventCard imageUrl={imageUrl03} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default PopularEvents;
