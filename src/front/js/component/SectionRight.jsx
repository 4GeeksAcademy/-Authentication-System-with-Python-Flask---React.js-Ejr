import React, { useContext, useEffect } from "react";
import "../../styles/SectionRight.css";
import { Context } from "../store/appContext.js";
import { CardOffer } from "./CardOffer.jsx";

export const SectionRight = React.memo(() => {
    const { actions, store } = useContext(Context);
    const { jobOffers } = store;

    useEffect(() => {
        const fetchJobOffers = async () => {
            await actions.loadAllJobOffers();
        };

        fetchJobOffers();
    }, []);

    const topRatingOffers = jobOffers
        .filter(offer => offer.rating > 4) 
        .sort((a, b) => b.rating - a.rating);

    return (
        <div className="container section-box d-flex flex-column justify-content-center">
            <div className="header-section-box text-center">
                <h3 className="fw-bold">¡Ofertas destacadas!</h3>
                <span className="fw-bold">Cuantas más ofertas tengas, más probabilidades tendrás de estar en nuestro salón de la fama.</span>
            </div>
            <div className="row d-flex flex-column g-3 row-cards">
                {topRatingOffers.length > 0 ? (
                    topRatingOffers.map((offer, index) => (
                        <div className="col-12" key={index}>
                            <CardOffer
                                className="featured-card"
                                title={offer.name}
                                modality={offer.modalidad}
                                salary={offer.salario}
                                description={offer.descripcion}
                                rating={offer.rating} 
                            />
                        </div>
                    ))
                ) : (
                    <p className="no-offers-section text-secondary text-muted text-center shadow-lg mb-5">No hay ofertas destacadas.</p>
                )}
            </div>
        </div>
    );
});
