import React, { useState } from 'react';
import OfferCard from './companyview/OfferCard';
import { Button } from 'react-bootstrap';

const OfferManager = () => {
    const [offers, setOffers] = useState([]);
    const [offerCount, setOfferCount] = useState(0);

    const createNewOffer = () => {
        const newOffer = {
            title: `Oferta ${offerCount + 1}`,
            description: `Descripción de la oferta ${offerCount + 1}`,
            status: 'Activo',
        };

        setOffers([...offers, newOffer]);
        setOfferCount(offerCount + 1);
    };

    return (
        <div className='container'>
            <div className="text-center mb-4">
                <Button variant="btn btn-secondary" onClick={createNewOffer}>
                    Crear nueva oferta
                </Button>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
                {offers.map((offer, index) => (
                    <OfferCard
                        key={index}
                        title={offer.title}
                        description={offer.description}
                        status={offer.status}
                    />
                ))}
            </div>
        </div>
    );
};

export default OfferManager;
