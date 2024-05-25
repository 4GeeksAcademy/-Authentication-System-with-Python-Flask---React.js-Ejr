import React, { useContext } from "react";
import { useNavigate} from "react-router-dom";
import { Context } from "../store/appContext.js";

export const ProductDisplay = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  if (!store.checkout.precio_id_stripe) {
    navigate('/');
  } 
  
  const handlecheckout = async (e) => {
    e.preventDefault()
    let url = await actions.checkout(store.checkout.precio_id_stripe, store.checkout.days);
    window.location.href = url;
  }
  return (
    <section>
      <div className="product d-flex mt-4 text-center vh-100 me-4 ms-3">
        <img src={store.details?.url_img1} style={{height:"450px", objectFit: "cover"}} alt="AUDI A3" />
        <div className="description mt-2 ms-4">
          <h1 className="text-success mb-4">{store.checkout.marca_modelo}</h1>
          <h4 className="mb-2"><strong>Precio por día:</strong> {store.checkout.precio}€</h4>
          <h4 className="mb-4"><strong>Cantidad de días:</strong> {store.checkout.days}</h4>
          <h3><strong>Precio Total:</strong> {store.checkout.precio * store.checkout.days}€</h3>
          <form onSubmit={handlecheckout} className="mt-4">
            <button type="submit" className="btn-success btn-lg fs-4 mt-4">
              PAGO
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

