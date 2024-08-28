import React, { useContext, useEffect } from "react";
import { CardOffer } from "./CardOffer.jsx";
import { Context } from "../store/appContext.js";
import "../../styles/CardListOffer.css"


export const ListOffers = ({ searchTerm }) => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.loadAllJobOffers();
    }, []);


    const searchOffers = store.jobOffers?.filter((offer) => {
        const nameMatch = offer.name?.toLowerCase().includes(searchTerm?.toLowerCase());
        const modalityMatch = offer.modality?.toLowerCase().includes(searchTerm?.toLowerCase());
        const salaryMatch = offer.salary?.toLowerCase().includes(searchTerm?.toLowerCase());

        return nameMatch || modalityMatch || salaryMatch;
    });

    return (
        <div className="list-offer-container">
            <div className="row d-flex flex-column g-2">
                {searchOffers.length > 0 ? (
                    searchOffers.map((offer, index) => (
                        <div className="col list-offer-box" key={index}>
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