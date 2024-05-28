import React, { useState, useContext } from "react";
import { Context } from '../store/appContext.js';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function Message({ content }) {
  return <p>{content}</p>;
}

export function PaypalPayment() {
  const initialOptions = {
    "client-id": "AevJ33XfD8OFiLiW8oNbuK33BjtIiZL3rNyccBkAwZArxDC8xmBcc4Th_ESuXEGqKBkBV83QXNl8I_ND", // Cambia "test" por tu verdadero client-id en producción
    "enable-funding": "venmo",
    "disable-funding": "",
    currency: "USD",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };

  const { store, actions } = useContext(Context);
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");

  function handleChangeValue(eve) {
    const { value } = eve.target;
    setPrice(value);
  }

  function setPriceFromItem(itemPrice) {
    setPrice(itemPrice);
  }

  const datos = {
    purchase_units: [
      {
          amount: {
              currency_code: 'USD',
              value: price,
          },
      },
  ],
  };

  async function createOrder(data, actions) {
    try {
      const orderID = await actions.order.create(datos);
      return orderID;
    } catch (error) {
      console.error("Error en order.create:", error);
      throw error;
    }
  }

  async function onApprove(data, actions) {
    try {
      const details = await actions.order.capture();
      setMessage(`Transacción completada por ${details.payer.name.given_name}!`);
    } catch (error) {
      console.error('Error al capturar la transacción:', error);
      setMessage('Ocurrió un error al procesar la transacción.');
    }
  }

  async function onError(err) {
    console.error('Error durante la transacción:', err);
    setMessage(`Ocurrió un error durante la transacción: ${err.message}`);
  }

  return (
    <div className="App">
      {/* MONTO */}
      <div className='col-md my-3 form-check'>
        <label className='my-2' htmlFor="validationFormCheck1">Monto</label>
        <input
          name='price'
          value={price}
          onChange={handleChangeValue}
          type="text"
          id="validationFormCheck1"
          className="form-control"
        />
        <div className="invalid-feedback">
          Por favor ingresa tu información.
        </div>
      </div>

      <h1>{price}</h1>

      {store.course && store.course.access_to_courses && store.course.access_to_courses.length === 0 ? "No hay Cursos Cargados" :
        store.course && store.course.access_to_courses && store.course.access_to_courses.map((item, index) => {
          return (
            <div key={index}>
              {
                (store.spinner)
                  ? <div className="d-flex justify-content-center">
                      <div>
                        <div className="spinner-border" role="status">
                          <span className="visually-hidden">Cargando...</span>
                        </div>
                        <p className="text-center">Cargando...</p>
                      </div>
                    </div>
                  : <div className="card mx-2 shadow" style={{ width: "18rem", height: "auto", paddingTop: "20px", paddingBottom: "20px" }}>
                      <div className="card-img-top">
                        <div className="course-thumbnail">
                          <img
                            src="https://i.blogs.es/1d8a5b/python1/1024_2000.jpg"
                            className="img-fluid"
                            alt="python-course"
                            style={{ objectFit: 'cover', width: '100%', height: '180px' }}
                          />
                        </div>
                      </div>
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{item.title}</h5>
                        <p className="card-text">{item.categorytitle}</p>
                        <p className="card-text"><strong>$</strong>{item.price}</p>
                        <p>Módulos: {item.modulesLength}</p>
                        <button onClick={() => setPriceFromItem(item.price)}>Agregar</button>
                      </div>
                    </div>
              }
            </div>
          );
        })}

      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
        forceReRender={[price]}
          style={{
            shape: "pill",
            layout: "vertical",
            color: "silver",
            label: "paypal",
          }}
          createOrder={createOrder}
          onApprove={onApprove}
          onError={onError}
        />
      </PayPalScriptProvider>

      <Message content={message} />
    </div>
  );
}
