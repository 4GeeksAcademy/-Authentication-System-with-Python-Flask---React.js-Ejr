import React, { useContext } from "react";
import { EventCard } from "../component/eventCard";

const PopularEvents = () => {
    return (

        <div className="container-full popular-events grey-background">

            <div clasName ="container">

                <h2>Popular Events Near You</h2>

                <div className="container about">
                    <EventCard />
                    <EventCard />
                    <EventCard />
                    <EventCard />
                </div>

            </div>

        </div>
    );
  };
  
  export default PopularEvents;
  