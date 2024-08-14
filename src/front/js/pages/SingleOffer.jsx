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
            <div className="row ">
                <div className="col-6">
                    <div className="card single-card">
                        <div className="card-body">
                            <div className="d-flex">
                                <h2 className="">{offer.title}</h2>
                            </div>
                            <p>{offer.company}<span className="ms-3">{offer.location}</span></p>
                            <p><u>{offer.salary}</u></p>
                            <p className="fw-bold">Description</p>
                            <p>{offer.description}</p>
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <h2></h2>
                </div>
            </div>
            


            
        </div>
    );
}
