import React, {useContext} from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext.js";
import "../../styles/SingleOffer.css"


export const SingleOffer = () => {
    const { id } = useParams();  
    const {store} = useContext(Context);


    const offer = store.jobOffers.find(offer => offer.id === parseInt(id));

    if (!offer) {
        return <div className="container mt-5">Oferta no encontrada</div>;
    }

    return (
        <div className="container my-5">
            


            <CardOffer
                title={offer.title}
                company={offer.company}
                location={offer.location}
                salary={offer.salary}
                description={offer.description}
                id={offer.id}
            />
        </div>
    );
}
