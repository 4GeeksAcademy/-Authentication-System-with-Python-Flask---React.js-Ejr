//VistaPago: Gestiona la cantidad y obtiene el clientSecret desde el backend. Luego redirige al usuario a FormularioPago con el clientSecret y la cantidad.
//Al hacer clic en el botón de pago, realiza una solicitud POST al backend para obtener un clientSecret y luego redirige al usuario a FormularioPago con el clientSecret y la cantidad.

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../styles/vistaPago.css";

//para el pago y redigirse a completoDisWeb.js
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js'; // Cargar el componente de Stripe para la integración
import FormularioPago from '../component/formularioPago';


// Tu clave pública de Stripe (reemplazar 'clave_Secreta' con tu clave real)
const stripePromise = loadStripe('tu_clave_publica_de_stripe');

// Componente principal de VistaPago
function VistaPago() {
    const [cantidad, setCantidad] = useState(100); // Cantidad inicial por defecto
    const [clientSecret, setClientSecret] = useState(null); // Estado para almacenar el clientSecret (token) del backend
    const navigate = useNavigate(); // Hook para redirigir a la pagina completoDisWeb.js


    //Cuando el usuario hace clic en el botón de pago, VistaPago solicita un clientSecret al backend y pasa este clientSecret junto con la cantidad a formularioPago.js
    const handleButtonClick = async () => {
        // Función asíncrona que maneja el BOTON de pago.
          try {
              // solicitud  POST a la ruta /pagoCursos en tu backend, enviando la cantidad como JSON.
              const response = await fetch('/pagoCursos', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ cantidad })  // Enviar la cantidad desde el frontend
              });

              // Obtener la respuesta JSON
              const data = await response.json();
              if (response.ok) { //Verifica si la solicitud fue exitosa
                  //Obtiene el clientSecret: es un token, que permite a tu cliente (navegador) que se utiliza para completar el proceso de pago con Stripe.
                  setClientSecret(data.clientSecret); // Establece el clientSecret en el estado

                  // Redirige a /formularioPago con el clientSecret y cantidad en el estado
                  navigate('/formularioPago', { state: { clientSecret: data.clientSecret, cantidad } });
              } else {
                  console.error('Error al crear el PaymentIntent:', data.error);
              }
          } catch (error) {
              console.error('Error en el proceso de pago:', error);
          }
    };

    return (
        <div className='Pago'>
            <div className='pago__main-content'>
                <div className="card container p-0 my-5">
                    <div className="card-header">
                        <h1>Información de Pago</h1>
                    </div>
                    <div className="card-body-vistaPago">
                        <form className="row g-3">
                            {/* Campos del formulario */}
                            <div className="col-md-6">
                                <label htmlFor="Card" className="form-label">Card #</label>
                                <input type="text" placeholder="XXXXXXXXXXXX" className="form-control" />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="CVV" className="form-label">#CVV</label>
                                <input type="text" placeholder="0000" className="form-control" id="inputCvv" />
                            </div>
                            <div className="col-md-3">
                                <label htmlFor="Amount" className="form-label">Amount</label>
                                <div className="d-flex align-items-center">
                                    <i className="fa-solid fa-dollar-sign me-1"></i>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="inputAmount"
                                        value={cantidad}
                                        onChange={(e) => setCantidad(Number(e.target.value))}  // Actualiza la cantidad según el input
                                    />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="name" className="form-label">First name</label>
                                <input type="text" placeholder="Write your First name" className="form-control" id="inputName" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="lastName" className="form-label">Last Name</label>
                                <input type="text" placeholder="Write Your Last Name" className="form-control" id="inputLastName" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="inputCity" className="form-label">City</label>
                                <input type="text" className="form-control" id="inputCity" />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="selectState" className="form-label">State</label>
                                <input type="text" className="form-select form-control" placeholder="Pick a State" />
                            </div>
                            <div className="col-md-5">
                                <label htmlFor="inputpostal" className="form-label">Postal Code</label>
                                <input type="text" className="form-control" id="inputpostal" />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label">We accept:</label>
                                <div className="bg-secondary p-2 rounded col-6">
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                        <label className="form-check-label" htmlFor="inlineRadio1"><i className="fa-brands fa-cc-visa"></i></label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                        <label className="form-check-label" htmlFor="inlineRadio2"><i className="fa-brands fa-cc-mastercard"></i></label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                                        <label className="form-check-label" htmlFor="inlineRadio3"><i className="fa-brands fa-cc-paypal"></i></label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="option4" />
                                        <label className="form-check-label" htmlFor="inlineRadio4"><i className="fa-brands fa-cc-diners-club"></i></label>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="card-footer text-end">
                        <button type="button" className="btn btn-secondary">Close</button>
                        {/* Botón de pago que llama a handleButtonClick */}
                        <button type="button" className="btn btn-primary" onClick={handleButtonClick}>Pagar {cantidad} EUR</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VistaPago;
