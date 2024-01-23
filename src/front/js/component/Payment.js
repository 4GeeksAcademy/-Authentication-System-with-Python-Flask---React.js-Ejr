import React from 'react';
import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

export const Payment = () => {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("https://solid-sniffle-7vpx5qp4qrjcqwp-3001.app.github.dev/api/config")
       .then(async (response) => {
         const { publishableKey } = await response.json();
         setStripePromise(loadStripe(publishableKey)); 
       })
       .catch((error) => {
         console.error("Failed to fetch config:", error);
       });
   }, []);
   
   useEffect(() => {
    fetch("https://solid-sniffle-7vpx5qp4qrjcqwp-3001.app.github.dev/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      
      .then(async (result) => {
        const { client_secret } = await result.json();
        setClientSecret(client_secret);
      })
      .catch((error) => {
        console.error("Failed to create payment intent:", error);
      });
  }, []);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

