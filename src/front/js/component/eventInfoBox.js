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

    const handleCheckboxChange = () => {
        const adminRouteRequirement = "/api/clickupdate";
        const url = `${process.env.BACKEND_URL}${adminRouteRequirement}`;
        const checkboxState = document.querySelector('#myCheckbox').checked ? 'on' : 'off';

        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ checkbox_state: checkboxState })
        })
        .then(response => response.json())
        .then(data => console.log(data));
    }

    return (
        <div className="EventCard">
            <h3>Upcoming events:</h3>
            <p>Day:{eventDetails.day}</p>
            <p>Time:{eventDetails.hour}</p>
            <p>Location:{eventDetails.location}</p>
            <p>Meeting Point: {eventDetails.meeting_point}</p>
            <label>
                <input type="checkbox" id="myCheckbox" name="myCheckbox" onChange={handleCheckboxChange} />
                Count me in
                </label>
        </div>
    );
};
