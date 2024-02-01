import React from "react";
import { useState, useEffect } from "react";



export const EventInfoBox = () => {
    const [eventDetails, setEventDetails] = useState({});
    const adminRouteRequirement = "/api/events";
    const url = `${process.env.BACKEND_URL}${adminRouteRequirement}`;
  
    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setEventDetails(data));
    }, []);

    return (
        <div className="EventCard">
            <h3>Upcoming events:</h3>
            <p>Day:{eventDetails.day}</p>
            <p>Time:{eventDetails.hour}</p>
            <p>Location:{eventDetails.location}</p>
            <p>Meeting Point: {eventDetails.meeting_point}</p>

        </div>
    );
};
