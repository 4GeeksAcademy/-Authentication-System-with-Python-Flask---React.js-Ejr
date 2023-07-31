import React, { useContext, useEffect } from 'react'
import { Context } from '../store/appContext.js'


const HomeOfferCard = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getAllOffers();
        console.log("Fetch for all offers is working")
    }, []);




    return (
        <div className='homeOfferCard'>
            {store.offers
                .slice(0,10)
                .map((offer) =>

                <div key={offer.id} className="card bg-dark text-white mt-4 container">
                <img src="..." className="card-img" alt="..."></img>
                <div className="card-img-overlay">
                    <h5 className="card-title">{offer.offer_title}</h5>
                    <p className="card-text">{offer.offer_description}</p>
                    <p className="card-text">{offer.normal_user_price}</p>
                    <p className="card-text">{offer.premium_user_price}</p>
                    <p className="card-text">Last updated 3 mins ago</p>
                </div>
            </div>
            
                )}
        </div>
    )
}

export default HomeOfferCard
