import React, { useContext, useEffect } from 'react';
import { Context } from '../store/appContext';

const AdminOffers = () => {
  const { store, actions } = useContext(Context)


  const handleDeleteOffer = (offerId) => {
    actions.deleteOfferById(offerId);
    window.location.reload()
  };
  return (
    <div className='admin-offer-content'>
      <h2 className='text-center'>Lista de ofertas:</h2>
      <div className='d-flex content-infos'>
        {store.offers.map(offer => (
          <div key={offer.id} className="infos-users">
            <button onClick={() => handleDeleteOffer(offer.id)}>&#10008;</button>
            <p>ID reseña: <span>{offer.id}</span> </p>
            <p>Título de la oferta: <span>{offer.offer_title}</span></p>
            <p>Descripción: <span>{offer.offer_description}</span></p>
            <p>País: <span>{offer.offer_description}</span></p>
            <p>Ciudad: <span>{offer.offer_description}</span></p>
            <p>Precio: <span>{offer.offer_description}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOffers;