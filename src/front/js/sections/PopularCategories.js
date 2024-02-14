import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import EventCardSingle from "../component/EventCardSingle";

import MusicCategoryImage from "../../img/pitch/category/music-category.png"
import ComedyCategoryImage from "../../img/pitch/category/comedy-category.png"
import BusinessCategoryImage from "../../img/pitch/category/business-category.png"
import SportCategoryImage from "../../img/pitch/category/sport-category.png"

const PopularCategories = () => {
    const { store } = useContext(Context);
    const [eventIds, setEventIds] = useState([]);

    useEffect(() => {
        // Fetch the list of event IDs or use a predefined list
        const fetchedEventIds = [6, 7, 8, 9];
        setEventIds(fetchedEventIds);
    }, []);

    return (
        <div className="container-fluid popular-categories">
            <div className="container">

                <div className="section-header">
                    <h2 className="text-center mt-4 mb-3">Popular Categories</h2>
                </div>

                <div className="row categories-container justify-content-between">
                    <div className="col-lg-3 col-md-3 categories-placeholder d-flex flex-column justify-content-center align-items-center" style={{ backgroundImage: `url(${MusicCategoryImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <h3 className="text-center text-shadow">Music</h3>
                    </div>
                    <div className="col-lg-3 col-md-3 categories-placeholder d-flex flex-column justify-content-center align-items-center" style={{ backgroundImage: `url(${ComedyCategoryImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <h3 className="text-center text-shadow">Comedy</h3>
                    </div>
                    <div className="col-lg-3 col-md-3 categories-placeholder d-flex flex-column justify-content-center align-items-center" style={{ backgroundImage: `url(${BusinessCategoryImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <h3 className="text-center text-shadow">Business</h3>
                    </div>
                    <div className="col-lg-3 col-md-3 categories-placeholder d-flex flex-column justify-content-center align-items-center" style={{ backgroundImage: `url(${SportCategoryImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                        <h3 className="text-center text-shadow">Sport</h3>
                    </div>
                </div>

                {/*<div className="d-flex justify-content-center">
                    {eventIds.map(eventId => (
                        <EventCardSingle key={eventId} eventId={eventId} />
                    ))}
                </div>*/}

            </div>
        </div>
    );
};

export default PopularCategories;
