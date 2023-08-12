import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext.js';
import { Link, useParams } from 'react-router-dom';

const SingleOfferView = () => {
    const { store, actions } = useContext(Context);
    const params = useParams();
    const [offer, setOffer] = useState({})

    useEffect(() => {
        const loadData = async () => {
            setOffer(await actions.getOfferById(params.offer_id));
        }
        loadData()
        console.log("Fetch for all offers in single offer view is working");
    }, []);
    return (
        <div>
            <div className='container text-start'>
                <div>
                    <img src={offer?.offer_image} alt="" /><img src="" alt="" /><img src="" alt="" />
                    <h4>{offer?.offer_title}</h4>
                </div>

                <div>
                    {offer?.offer_description}
                </div>

                <div>
                    <h4>Mira las opciones de esta actividad y ¡elige la tuya!</h4>
                    <span>Precio para usuario normal: {offer?.normal_user_price}</span><br />
                    <span>Precio de usuario premium: {offer?.premium_user_price}</span>
                </div>

                <div>
                    <h4>Que saber antes de comprar</h4>

                    <div>
                        <h4>¿Qué incluye?</h4>
                        <h4>¿Qué no incluye?</h4>
                    </div>
                    <div><h4>Medidas de higiene y seguridad</h4></div>
                    <div><h4>Política de cancelación
                    </h4>
                        <p>Cancela gratis esta actividad hasta 1 día antes de realizarla. Podrás revisar las opciones de cambios y cancelaciones que tienes en nuestra sección Mis Viajes.</p></div>
                    <div><h4>¿Quiénes no podrían realizar esta actividad?
                    </h4></div>
                    <div><h4>Antes de asistir
                    </h4>
                        <p>
                            Para realizar esta actividad, solo deberás presentar y tener a mano tu documento de identificación.</p></div>
                    <div><h4>Información general
                    </h4></div>
                </div>

                <div>
                    <h4>Comentarios</h4>
                </div>
                <Link to='/opciones-de-pago' >
                    <button className='btn-buy'>Comprar</button>
                </Link>
            </div>
        </div>
    );
};

export default SingleOfferView;
