//VistaPago:

//Manejo del Pago: La función handleButtonClick se encarga de hacer una solicitud al backend para obtener el clientSecret.
//luego redirige a FormularioPago con clientSecret y cantidad en el estado de la ubicación.

import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { loadStripe } from '@stripe/stripe-js';
import { Elements} from '@stripe/react-stripe-js';
import { CheckoutForm } from "../component/checkout.jsx";


const VistaPago = () => {
	const { store, actions } = useContext(Context);
	//la clave en .env!!! ----------- esta de abajo es la clave publica
	const stripePromise = loadStripe(process.env.STRIPE_PROMISE);
	
	
	return (
		<div className="text-center mt-5">
			<h1>Bienvenid@ al pago con Stripe </h1>
			<Elements stripe={stripePromise}>
				<CheckoutForm />
			</Elements>
		</div>
	);
};
export default VistaPago