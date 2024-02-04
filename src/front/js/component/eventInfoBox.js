import React from "react";
import { useState, useEffect } from "react";



export const EventInfoBox = () => {
    const [eventDetails, setEventDetails] = useState({});
    const [clicksCount, setClicksCount] = useState(0);
    const adminRouteRequirement = "/api/events";
    const url = `${process.env.BACKEND_URL}${adminRouteRequirement}`;

    useEffect(() => {
        fetch(url)
            .then(response => response.json())
            .then(data => setEventDetails(data));
    }, []);

    useEffect(() => {
        const clicksApiUrl = `${process.env.BACKEND_URL}/api/clicks`;
        fetch(clicksApiUrl)
            .then(response => response.json())
            .then(newData => setClicksCount(newData))
            .catch(error => console.error('Error:', error));
    }, []);

    const handleCheckboxChange = () => {
        const token = localStorage.getItem('userToken');
        if (!token) {
        alert("Please log in to use the checkbox");
        return;
    }
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
        .then(() => {
            const clicksApiUrl = `${process.env.BACKEND_URL}/api/clicks`;
            fetch(clicksApiUrl)
                .then(response => response.json())
                .then(newData => setClicksCount(newData))
                .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error:', error));
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
                Count me in<p>Smilers in: {clicksCount}</p>
            </label>
        </div>
    );
};
