import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import EventSingle from "../component/EventSingle";
import PopularEvents from "../sections/PopularEvents";

const Single = ({ event }) => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        // Fetch single event data from the backend API based on the ID in the URL params
        fetch(`${process.env.BACKEND_URL}/api/event/${params.id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch single event");
                }
                return response.json();
            })
            .then(data => {
                setEventData(data.event);
            })
            .catch(error => {
                console.error("Error fetching single event:", error);
            });
    }, [params.id]);

    return (
        <div className="container-full black-background">
            <div className="container event-single d-flex justify-content-center align-items-center">
                {/* Left Column - Image */}
                <div className="col-md-5 image-container">
                    <img src={eventData?.image} className="img-fluid" alt="Event Image" />
                </div>

                {/* Right Column - Event Details */}
                <div className="col-md-6">
                    <div className="mb-4">
                        {/* Event Title */}
                        <h3 className="mb-4">{eventData?.name}</h3>

                        {/* Event Description */}
                        <p>{eventData?.description}</p>
                    </div>

                    {/* Event Date */}
                    <div className="d-flex align-items-center mb-3">
                        <i className="fas fa-calendar-alt"></i>
                        <span>{eventData?.date}</span>
                    </div>

                    {/* Event Location */}
                    <div className="d-flex align-items-center mb-3">
                        <i className="fa-solid fa-location-dot"></i>
                        <span>{eventData?.location}</span>
                    </div>

                    {/* Ticket Price */}
                    <div className="d-flex align-items-center mb-4">
                        <i className="fa-solid fa-ticket"></i>
                        <span>Ticket Price: £{eventData?.price}</span>
                    </div>

                    {/* Buy Tickets Button */}
                    <button className="btn btn-primary custom-btn mt-2">Buy Tickets Now</button>
                </div>
            </div>
            <PopularEvents />
        </div>
    );
};

Single.propTypes = {
    match: PropTypes.object
};

export default Single;
