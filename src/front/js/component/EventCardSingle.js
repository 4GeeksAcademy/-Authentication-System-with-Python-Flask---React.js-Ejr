import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

const EventCardSingle = ({ eventId }) => {
    const { actions } = useContext(Context);
    const [event, setEvent] = useState(null);
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        const fetchEventData = async () => {
            try {
                const eventData = await actions.fetchEvent(eventId);
                setEvent(eventData);
            } catch (error) {
                console.error("Error fetching event data:", error);
            }
        };

        fetchEventData();
    }, [actions, eventId]);

    if (!event) return null;

    const toggleFavorite = () => {
        setFavorited(!favorited);
    };

    return (
        <div className="card event-card" style={{ width: "18rem" }}>
            <img src={event.image} className="card-img-top" alt="Event Image" />
            <div className="event-card-body">
                <h5>{event.name}</h5>
                <p className="event-card-location">Venue: {event.location}</p>
                <div className="d-flex justify-content-between event-card-info"> 
                    <p className="card-text">Tickets: £{event.price}</p>
                    <p className="card-text">Date: {event.date}</p>
                </div>
                <div className="d-flex justify-content-between align-items-center"> 
                    <Link to={`/event/${eventId}`} className="btn btn-primary custom-btn">More info.</Link>
                    <button className="btn" onClick={toggleFavorite}>
                        <i className={`fa-solid fa-heart${favorited ? ' text-danger' : ''}`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

EventCardSingle.propTypes = {
    eventId: PropTypes.number.isRequired
};

export default EventCardSingle;
