import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import EventCardSingle from "../component/EventCardSingle";

const PopularEventsTwo = () => {
    const { store } = useContext(Context);
    const [eventIds, setEventIds] = useState([]);

    useEffect(() => {
        // Fetch the list of event IDs or use a predefined list
        const fetchedEventIds = [1, 2, 3];
        setEventIds(fetchedEventIds);
    }, []);

    return (
        <div className="container-fluid popular-events grey-background d-flex align-items-center justify-content-center">

            <div className="container text-center section-header">
            
            <div className="section-header">
            <h2 className="text-center mt-4">Popular Events Near You</h2>
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

export default PopularEventsTwo;
