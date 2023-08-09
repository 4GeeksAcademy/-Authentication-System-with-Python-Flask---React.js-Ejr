import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext.js';
import NewsletterSubmit from '../component/NewsletterSubmit.jsx';
import { useParams } from 'react-router-dom';

const SingleOfferView = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [offer, setOffer] = useState({})

    useEffect(() => {
        setOffer(actions.getOfferById(params.offer_id));
        console.log("Fetch for all offers in Single Offer view is working");
    }, []);

    return (
        <div>
            <div className='container text-start'>
                <div>
                    {/* <img src="" alt="" /><img src="" alt="" /><img src="" alt="" /> */}
                    <h4>{offer?.title}</h4>
                </div>

                <div>
                    {/* <p>{params.offer_description}</p> */}
                </div>

                <div>
                    <h4>Mira las opciones de esta actividad y ¡elige la tuya!</h4>
                    {/* <span>Precio normal: {offer.normal_user_price}</span> */}
                    {/* <span>Precio de usuario premium: {offer.premium_user_price}</span> */}
                </div>

                <div>
                    <h4>Que saber antes de comprar</h4>
                    {/* Add some content inside these divs */}
                    <div>
                        <h4>¿Qué incluye?</h4>
                        <h4>¿Qué no incluye?</h4>
                    </div>
                    <div><h4>Medidas de higiene y seguridad</h4></div>
                    <div><h4>Política de cancelación
                    </h4></div>
                    <div><h4>¿Quiénes no podrían realizar esta actividad?
                    </h4></div>
                    <div><h4>Antes de asistir
                    </h4></div>
                    <div><h4>Información general
                    </h4></div>
                </div>

                <div>
                    <h4>Comentarios</h4>
                </div>
            </div>
            {/* <NewsletterSubmit /> */}
        </div>
    );
};

export default SingleOfferView;
