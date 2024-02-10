import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import EventCardSingle from "../component/EventCardSingle";

const PopularCategories = () => {
    const { store } = useContext(Context);
    const [eventIds, setEventIds] = useState([]);

    useEffect(() => {
        // Fetch the list of event IDs or use a predefined list
        const fetchedEventIds = [6, 7, 8, 9];
        setEventIds(fetchedEventIds);
    }, []);

    return (
        <div className="container-fluid popular-categories grey-two-background d-flex align-items-center justify-content-center">
            <div className="container">

                <div className="section-header">
                    <h2 className="text-center mt-4 mb-3">Popular Categories Near You</h2>
                </div>

                <div className="d-flex justify-content-center">
                    {eventIds.map(eventId => (
                        <EventCardSingle key={eventId} eventId={eventId} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularCategories;
