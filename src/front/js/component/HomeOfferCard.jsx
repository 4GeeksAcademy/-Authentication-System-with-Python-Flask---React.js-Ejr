import React, { useContext, useEffect } from 'react'
import { Context } from '../store/appContext.js'
import { Link } from 'react-router-dom';
const HomeOfferCard = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getAllOffers();
        console.log("Fetch for all offers is working")
    }, []);
    return (
        <div>
            {/* <div>
                <h1><strong>Disfruta de las experiencias,</strong> encuentra excursiones y tours</h1>
            </div> */}
            <div className='home-offer-card'>
            
            {store.offers
                .slice(0, 10)
                .map((offer) =>
                    <div key={offer.id} className="card card-home-offer bg-dark text-white mt-4 container" style={{maxWidth: "400px", maxHeight: "500px" }} >
                        <Link to={`/offer/${offer.id}`}>
                        <img src={offer.offer_image} className="card-img" alt="..." style={{maxWidth: "400px", maxHeight: "200px" }}></img>
                        <div className="card-img-overlay">
                            <h5 className="home-offer-title">{offer.offer_title}</h5>
                            {/* <p className="card-text">{offer.offer_description}</p> */}
                            <div className='home-price'>
                                <p className="card-text">{offer.normal_user_price}</p>
                                <p className="card-text">{offer.premium_user_price}</p>
                            </div>
                            {/* <p className="card-text">Last updated 3 mins ago</p> */}
                        </div>
                        </Link>
                    </div>
                )}
        </div>
        </div>
        
    )
}
export default HomeOfferCard


