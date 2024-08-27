import React, { useContext, useEffect } from "react";
import { CardOffer } from "./CardOffer.jsx";
import { Context } from "../store/appContext.js";


export const ListOffers = ({ searchTerm }) => {
    const { store, actions } = useContext(Context);
  

    useEffect(() => {
        actions.loadAllJobOffers();
    }, []);


    const searchOffers = store.jobOffers?.filter((offer) =>
        offer.name.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        offer.modealidad.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        offer.salario.toLowerCase().includes(searchTerm?.toLowerCase()) 
    );

    return (
        <div className="container d-flex justify-content-center my-2">
            <div className="row d-flex flex-column">

                {searchOffers.length > 0 ? (
                    searchOffers.map((offer, index) => (

                        <div className="col d-flex justify-content-center" key={index}>
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

                    <p className="no-offers-section m-auto text-center shadow-lg">No hay ofertas disponibles</p>

                )}
            </div>
        </div>
    );
};
