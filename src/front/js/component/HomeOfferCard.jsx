import React, { useContext, useEffect } from 'react'
import { Context } from '../store/appContext.js'
import { Link } from 'react-router-dom';
const HomeOfferCard = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        actions.getAllOffers();
        // console.log("Fetch for all offers is working")
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
                        <div className='card-transition'>

                            <div key={offer.id} className=" card-home-offer"  >
                                <Link to={`/offer/${offer.id}`}>
                                    <img src={offer.offer_image} className="" alt="..." ></img>
                                    <div className="card-home-text mt-1">
                                        <p>Actividades</p>
                                        <h2 className="home-offer-title">{offer.offer_title}</h2>
                                        {/* <h5 style={{marginLeft: "0.8rem", marginBottom: "0.5rem"}}>{offer.offer_little_description}</h5> */}
                                        <div className='home-prices'>
                                            <p className="">Precio normal: {offer.normal_user_price.toLocaleString()}$</p>
                                            <p className="second-span" >Precio premium: {offer.premium_user_price.toLocaleString()}$</p>
                                            <span style={{ color: 'purple' }}>Ver actividad &#10095; </span>
                                        </div>
                                    </div>

                                </Link>
                            </div>


                        </div>

                    )}
            </div>
        </div>

    )
}
export default HomeOfferCard

