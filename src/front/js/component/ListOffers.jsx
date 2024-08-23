import React, { useContext, useEffect } from "react";
import { CardOffer } from "./CardOffer.jsx";
import { Context } from "../store/appContext.js";

export const ListOffers = ({ searchTerm }) => {
    const { store, actions } = useContext(Context);
    const { jobOffers } = store;

    useEffect(() => {
        actions.loadAllJobOffers();
    }, [actions]);


    const searchOffers = jobOffers.filter((offer) =>

        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.location.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    return (
        <div className="container d-flex justify-content-center my-5">
            <div className="row d-flex flex-column">

                {searchOffers.length > 0 ? (
                    searchOffers.map((offer, index) => (

                        <div className="col" key={index}>
                            <CardOffer
                                title={offer.title}
                                company={offer.company}
                                modality={offer.modality}
                                location={offer.location}
                                salary={offer.salary}
                                description={offer.description}
                                id={offer.id}
                            />
                        </div>
                    ))
                ) : (

                    <p className="text-secondary">No hay ofertas disponibles</p>

                )}
            </div>
        </div>
    );
};
