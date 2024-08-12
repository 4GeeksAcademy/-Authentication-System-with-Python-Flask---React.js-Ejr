import React from "react";

export const TimeLine = () =>{



    return (
        <div className="container mt-5">
          <div className="row">
            {jobOffers.map((offer, index) => (
              <div className="col-md-4" key={index}>
                <JobOfferCard 
                  title={offer.title}
                  company={offer.company}
                  location={offer.location}
                  salary={offer.salary}
                  description={offer.description}
                />
              </div>
            ))}
          </div>
        </div>
      );
}