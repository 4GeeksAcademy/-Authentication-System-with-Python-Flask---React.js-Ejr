import React, { useContext, useEffect, useState } from "react";
import { CardOffer } from "./CardOffer.jsx";
import { Context } from "../store/appContext.js";
import "../../styles/CardListOffer.css";

export const ListOffers = ({ searchTerm }) => {
    const { store, actions } = useContext(Context);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            actions.loadAllJobOffers().then(() => setLoaded(true));
        }
    }, [loaded, actions]); 

    const filterOffers = (offers, searchTerm) => {
        if (!searchTerm) return offers;

        return offers.filter(offer => {
            const term = searchTerm.toLowerCase();
            const nameMatch = offer.name?.toLowerCase().includes(term);
            const modalityMatch = offer.modality?.toLowerCase().includes(term);
            const salaryMatch = offer.salary?.toLowerCase().includes(term);

            return nameMatch || modalityMatch || salaryMatch;
        });
    };

    const filteredOffers = filterOffers(store.jobOffers || [], searchTerm);

    return (
        <div className="list-offer-container mt-3">
            <div className="row d-flex flex-column g-2">
                {filteredOffers.length > 0 ? (
                    filteredOffers.map((offer) => (
                        <div className="col list-offer-box" key={offer.id}>
                            <CardOffer
                                title={offer.name}
                                modality={offer.modality}
                                salary={offer.salary}
                                description={offer.description}
                                id={offer.id}
                            />
                        </div>
                    ))
                ) : (
                    <p className="no-offers-section text-center shadow-lg">
                        No hay ofertas disponibles
                    </p>
                )}
            </div>
        </div>
    );
};
