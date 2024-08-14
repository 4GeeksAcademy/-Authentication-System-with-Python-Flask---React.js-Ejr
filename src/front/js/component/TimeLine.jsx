import React, { useContext, useEffect } from "react";
import { CardOffer } from "./CardOffer.jsx";
import { Context } from "../store/appContext.js";

export const TimeLine = () =>{
  const {store, actions} = useContext(Context);
  const {jobOffers} = store;

  useEffect(() =>{
    if(jobOffers === 0){
      actions.loadJobOffers();
    }
  }, [jobOffers])


    return (
        <div className="container d-flex justify-content-center mt-5">
          <div className="row d-flex flex-column">
            {jobOffers.map((offer, index) => (
              <div className="col-md-4" key={index}>
                <CardOffer 
                  title={offer.title}
                  company={offer.company}
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