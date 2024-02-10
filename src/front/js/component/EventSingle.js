import React from "react";

const EventSingle = ({ event }) => {
    return (
        <div className="container event-single d-flex justify-content-center align-items-center">
            {/* Left Column - Image */}
            <div className="col-md-5 image-container">
                <img src={event.image} className="img-fluid" alt="Event" />
            </div>

            {/* Right Column - Event Details */}
            <div className="col-md-6">
                <div className="mb-4">
                    {/* Event Title */}
                    <h3 className="mb-4">{event.name}</h3>

                    {/* Event Description */}
                    <p>{event.description}</p>
                </div>

                {/* Event Date */}
                <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-calendar-alt me-2"></i>
                    <span>{event.date}</span>
                </div>

                {/* Event Location */}
                <div className="d-flex align-items-center mb-3">
                    <i className="fas fa-map-marker-alt me-2"></i>
                    <span>{event.location}</span>
                </div>

                {/* Ticket Price */}
                <div className="d-flex align-items-center mb-4">
                    <i className="fas fa-ticket-alt me-2"></i>
                    <span>Ticket Price: £{event.price}</span>
                </div>

                {/* Buy Tickets Button */}
                <button className="btn btn-primary custom-btn mt-2">Buy Tickets Now</button>
            </div>
        </div>
    );
};

export default EventSingle;
