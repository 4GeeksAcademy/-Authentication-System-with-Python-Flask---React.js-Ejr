import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { Razones } from "./razones";
export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div class="row imghome">
      <Navbar />
      <div class="col-sm-10">
        <div class="card-body home">
          <h1 class="card-title">Comer y cocinar en el hogar es mejor</h1>

          <p class="card-text">
            comer fuera de casa no permite planificar la comida, y éste es un
            aspecto crucial para cuidar nuestra dieta, pues como ya hemos dicho
            muchas veces, la falta de orden puede ser la causa de una
            alimentación desequilibrada y poco sana.
          </p>
          <PayPalScriptProvider
            options={{
              "client-id":
                "AWTfwnUiraZVgePkbmwOzkhD2h0OLmv4e6UFxflq_kjhXt_3kPybYDkdH2vHxQduUvzRdwMlXKskJUyk",
            }}
          >
            <PayPalButtons
              createOrder={(data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      amount: {
                        value: "20.00",
                      },
                    },
                  ],
                });
              }}
              onApprove={async (data, actions) => {
                const details = await actions.order.capture();
                const name = details.payer.name.given_name;
                alert("Transaction completed by " + name);
              }}
              
             />
  
          </PayPalScriptProvider>
        </div>
      </div>
      <Footer />
    </div>
  );
};
