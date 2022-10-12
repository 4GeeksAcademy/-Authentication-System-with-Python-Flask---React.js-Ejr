import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/200.gif";
import "../../styles/productos.css";
import { Link } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { NavbarL } from "../component/navbarl";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

export const Sub = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  console.log(store.comidas);
  useEffect(() => {
    actions.GetValidacion(localStorage.getItem("token"));
    //setTimeout(() => {
    //if (store.login == false) {
    //navigate("/demo");
    //}
    //}, 5000);
  }, []);
  return (
    <div className="row row-2">
      <Navbar/>
      <div className=" container-productos sub-body">
        <div className="row cajas">
          <div class="card card-sub">
            <h2>Plan Mixto: $22.500/mes</h2>
            <div class="card-body">
              <p class="card-text">6 recetas individuales al mes</p>
              <p class="card-text">Incluye: 2 recetas tradicionales, 2 recetas vegetarianas y 2 postres</p>
             
              <Link to="/Plan1">
                <button className="btn btn-secondary learn">Detalles</button>
              </Link>{" "}
              {store.login ? (
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
                              value: 22500,
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      const details = await actions.order.capture();

                      console.log(details.id);
                      console.log(details.create_time);
                      console.log(details);
                      // MANDAR MAIL A ADMIN ** INCORPORAR LOCALSTORAGE.SET.... EN LOGIN ROUTES
                      var templateParams = {
                        ID_compra: details.id,
                        Fecha_compra: details.create_time,
                        usuarioID: localStorage.getItem("token_userID"),
                        usuarioEmail: localStorage.getItem("token_userEmail"),
                        producto: 'Plan Mixto',
                        valor: '22500',
                      };
                      console.log(templateParams);
                      setTimeout(() => {
                        emailjs.send('service_3q83svb', 'template_vrltsto', templateParams, "iEJeEfqPLuw3KXA1l")
                            .then(function(response) {
                               console.log('Correo Enviado', response.status, response.text);
                            }, function(error) {
                               console.log('FAILED...', error);
                            });
                      }, 5000);
  
                      //FIN DEL FETCH

                      const name = details.payer.name.given_name;
                      Swal.fire({
                        title: "Tu Compra Ha Sido Aprobada",
                        width: 600,
                        padding: "3em",
                        color: "#716add",
                        icon: "success",
                        background: '#fff url("")',
                        backdrop: `
                        rgba(0,0,123,0.4)
                        url("https://i.giphy.com/media/WPyAmXubNrMv8BK7xx/giphy.webp")
                        left top
                        no-repeat
                        
                      `,
                      });
                    }}
                  />
                </PayPalScriptProvider>
              ) : (
                <div>
                  <Link to="/demo">Haz Login para continuar con tu compra</Link>
                </div>
              )}
            </div>
          </div>
          <div class="card card-sub">
            <h2>Plan Vegetariano: $25.000/mes</h2>
            <div class="card-body">
              <p class="card-text">6 recetas al mes</p>
              <p class="card-text">Incluye: 4 recetas vegetarianas, 2 postres</p>
              
              <Link to="/Plan2">
                <button className="btn btn-secondary learn">Detalles</button>
              </Link>{" "}
              {store.login ? (
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
                              value: 25000,
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      const details = await actions.order.capture();

                      console.log(details.id);
                      console.log(details.create_time);
                      console.log(details);
                      // MANDAR MAIL A ADMIN ** INCORPORAR LOCALSTORAGE.SET.... EN LOGIN ROUTES
                      var templateParams = {
                        ID_compra: details.id,
                        Fecha_compra: details.create_time,
                        usuarioID: localStorage.getItem("token_userID"),
                        usuarioEmail: localStorage.getItem("token_userEmail"),
                        producto: 'Plan Vegetariano',
                        valor: '25000',
                      };
                      console.log(templateParams);
                      setTimeout(() => {
                        emailjs.send('service_3q83svb', 'template_vrltsto', templateParams, "iEJeEfqPLuw3KXA1l")
                            .then(function(response) {
                               console.log('Correo Enviado', response.status, response.text);
                            }, function(error) {
                               console.log('FAILED...', error);
                            });
                      }, 5000);
  
                      //FIN DEL FETCH

                      const name = details.payer.name.given_name;
                      Swal.fire({
                        title: "Tu Compra Ha Sido Aprobada",
                        width: 600,
                        padding: "3em",
                        color: "#716add",
                        icon: "success",
                        background: '#fff url("")',
                        backdrop: `
                        rgba(0,0,123,0.4)
                        url("https://i.giphy.com/media/WPyAmXubNrMv8BK7xx/giphy.webp")
                        left top
                        no-repeat
                        
                      `,
                      });
                    }}
                  />
                </PayPalScriptProvider>
              ) : (
                <div>
                  <Link to="/demo">Haz Login para continuar con tu compra</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
