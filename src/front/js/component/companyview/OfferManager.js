import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import OfferCard from './OfferCard';

const OfferManager = () => {
    const [offers, setOffers] = useState([]);
    const [offerCount, setOfferCount] = useState(0);

    const navigate = useNavigate();

   
    const generateOfferId = () => {
        return offerCount + 1;
    };

    
    const createNewOffer = () => {
        const newOffer = {
            id: generateOfferId(),
            title: `Oferta ${offerCount + 1}`,
            description: `Descripción de la oferta ${offerCount + 1}`,
            status: 'Activo',
            price: 100,
        };
        setOffers([...offers, newOffer]);
        setOfferCount(offerCount + 1);

       
        navigate(`/formoffer`);
    };

    return (
        <div className="container">
            <div className="text-center mb-4">
                <Button variant="btn btn-secondary" onClick={createNewOffer}>
                    Crear nueva oferta
                </Button>
            </div>
            <div className="d-flex flex-wrap justify-content-center">
                {offers.map((offer) => (
                    <OfferCard
                        key={offer.id}
                        title={offer.title}
                        description={offer.description}
                        status={offer.status}
                        price={offer.price}
                        onEdit={() => console.log(`Edit offer with ID: ${offer.id}`)} 
                    />
                ))}
            </div>
        </div>
    );
};

export default OfferManager;
