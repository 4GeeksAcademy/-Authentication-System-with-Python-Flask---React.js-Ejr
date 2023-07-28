import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext';

const BusinessOfferCard = () => {
  const { store, actions } = useContext(Context);
  const [formData, setFormData] = useState({
    title: "",
    offerDescription: "",
    normalUserPrice: "",
    mediumUserPrice: "",
    highUserPrice: "",
    premiumUserPrice: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    actions.createOffer(formData);
  };

  useEffect(() => {
    actions.getAllOffers();
    console.log("Fetch for all offers is working")
  }, []);

  return (
    <div>
      {store.auth ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name='title'
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="offerDescription">Offer description:</label>
            <input
              type="text"
              id='offerDescription'
              name='offerDescription'
              value={formData.offerDescription}
              onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="normalUserPrice">Normal User Price:</label>
            <input
              type="text"
              id='normalUserPrice'
              name='normalUserPrice'
              value={formData.normalUserPrice}
              onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="mediumUserPrice">Medium User Price:</label>
            <input
              type="text"
              id='mediumUserPrice'
              name='mediumUserPrice'
              value={formData.mediumUserPrice}
              onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="highUserPrice">High User Price:</label>
            <input
              type="text"
              id='highUserPrice'
              name='highUserPrice'
              value={formData.highUserPrice}
              onChange={handleChange} />
          </div>

          <div>
            <label htmlFor="premiumUserPrice">Premium User Price:</label>
            <input
              type="text"
              id='premiumUserPrice'
              name='premiumUserPrice'
              value={formData.premiumUserPrice}
              onChange={handleChange} />
          </div>
          <button type="submit">Submit Offer</button>
        </form>
      ) : null}

      {/* Publicar las cartas que ya existen */}
      {store.offers.map((business_offer) => (
        <div
          key={business_offer.id}
          className="card mb-3 mt-4">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM23JE5rZmCQhGdgwGRj_jNOKbsrGP5C_t-g&usqp=CAU" className="card-img-top" alt="..."></img>

          <div className="card-body">
            <h5 className="card-title">{business_offer.title}</h5>
            <p className="card-text">{business_offer.offerDescription}</p>
            <p className="card-text">{business_offer.normalUserPrice}</p>
            <p className="card-text">{business_offer.mediumUserPrice}</p>
            <p className="card-text">{business_offer.highUserPrice}</p>
            <p className="card-text">{business_offer.premiumUserPrice}</p>
            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default BusinessOfferCard
