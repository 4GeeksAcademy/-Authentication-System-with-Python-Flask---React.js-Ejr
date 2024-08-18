import React, { useContext, useEffect } from "react";
import { CardOffer } from "./CardOffer.jsx";
import { Context } from "../store/appContext.js";

export const ListOffers = () =>{
  const {store, actions} = useContext(Context);
  const {jobOffers} = store;

  useEffect(() =>{
    if(jobOffers === 0){
      actions.loadJobOffers();
    }
  }, [jobOffers])

    return (
        <div className="container d-flex justify-content-center my-5">
          <div className="row d-flex flex-column">
            {jobOffers.map((offer, index) => (
              <div className="col" key={index}>
                <CardOffer 
                  title={offer.title}
                  company={offer.company}
                  modality={offer.modality}
                  location={offer.location}
                  salary={offer.salary}
                  description={offer.description}
                  id ={offer.id}
                />
              </div>
            ))}
          </div>
        </div>
      );
}