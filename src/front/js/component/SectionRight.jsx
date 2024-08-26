import React, { useContext, useEffect } from "react";
import "../../styles/SectionRight.css";
import { Context } from "../store/appContext.js";
import { CardOffer } from "./CardOffer.jsx";

export const SectionRight = () => {
    const { actions, store } = useContext(Context);
    const { jobOffers } = store;

    useEffect(() => {
        actions.loadAllJobOffers();
    }, [actions]);
    
    const topRatingOffers = jobOffers
        .filter(offer => offer.rating > 4) 
        .sort((a, b) => b.rating - a.rating);

    return (
        <div className="container section-box d-flex flex-column justify-content-center">
            <div className="header-section-box text-center">
                <h3 className="fw-bold">¡Ofertas destacadas!</h3>
                <span className="fw-bold">cuantas mas ofertas tengas mas probabilidades tendras de estar en nuestro salon de la fama</span>
            </div>
            <div className="row d-flex flex-column g-3 row-cards">
                {topRatingOffers.length > 0 ? (
                    topRatingOffers.map((offer, index) => (
                        <div className="col-12" key={index}>
                            <CardOffer
                                className ="featured-card"
                                title={offer.title}
                                company={offer.company}
                                modality={offer.modality}
                                location={offer.location}
                                salary={offer.salary}
                                description={offer.description}
                                id={offer.id}
                                rating={offer.rating} 
                            />
                        </div>
                    ))
                ) : (
                    <p className=" no-offers-section text-secondary text-muted text-center shadow-lg mb-5">No hay ofertas destacadas.</p>
                )}
            </div>
        </div>
    );
};
