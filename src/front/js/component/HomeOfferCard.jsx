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
            <div className='home-offer-h1'>
                <h4><strong>Disfruta de las experiencias,</strong> encuentra excursiones y tours</h4>
            </div>


            <div className='home-offer-card'>

                {store.offers
                    .slice(0, 3)
                    .map((offer) =>
                        <Link className='link' to={`/offer/${offer.id}`}>
                        <div key={offer.id} className=" card-home-offer text-grey"  >  
                                <img src={offer.offer_image} className="" alt="..." ></img>
                                <div className="card-home-text">
                                    <p>Actividades</p>
                                    <h3 className="home-offer-title">{offer.offer_title}</h3>
                                    <div className='home-price'>
                                        <p className="card-text">{offer.normal_user_price.toLocaleString()}$</p>
                                        <p className="card-text">{offer.premium_user_price.toLocaleString()}$</p>
                                    </div>
                                </div>
                        </div>
                        </Link>
                    )}
            </div>
        </div>

    )
}
export default HomeOfferCard

