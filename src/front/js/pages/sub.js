import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/productos.css";
import { Link } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { NavbarL } from "../component/navbarl";

export const Sub = () => {
  const { store, actions } = useContext(Context);
  console.log(store.comidas);
  return (
    <div className="row row-2">
      <NavbarL />
      <div className=" container-productos sub-body">
        <div className="row cajas">
          <div class="card card-sub">
            <h2>Plan básico: $36.000/mes</h2>
            <div class="card-body">
              <p class="card-text">8 recetas individuales al mes</p>
              <p class="card-text">Incluye: Lorem</p>
              <p class="card-text">Ahorras: 10% </p>
              <Link to="/Plan1">
                <button className="btn btn-secondary">Learn More</button>
              </Link>
              <button
                onClick={() => actions.getAddTask(e.name)}
                type="button"
                className="btn btn-outline-dark m-2 boton"
              >
                {" "}
                <i class="fa-solid fa-plus"></i>
              </button>

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
                            value: 36000,
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
          <div class="card card-sub">
            <h2>Plan full: $48.000/mes</h2>
            <div class="card-body">
              <p class="card-text">12 recetas al mes</p>
              <p class="card-text">Incluye: Lorem</p>
              <p class="card-text">Ahorras: 20% </p>
              <Link to="/Plan2">
                <button className="btn btn-secondary">Learn More</button>
              </Link>
              <button
                onClick={() => actions.getAddTask(e.name)}
                type="button"
                className="btn btn-outline-dark m-2 boton"
              >
                {" "}
                <i class="fa-solid fa-plus"></i>
              </button>

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
                            value: 48000,
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
        </div>
      </div>

      <Footer />
    </div>
  );
};
