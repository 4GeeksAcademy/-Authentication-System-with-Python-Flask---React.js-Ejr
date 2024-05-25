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
      <div className="product mt-5 mb-5 text-center vh-100">
        <img src={store.details?.url_img1} style={{height:"450px", objectFit: "cover"}} alt="AUDI A3" />
        <div className="description my-3">
          <h3>{store.checkout.marca_modelo}</h3>
          <h5>€{store.checkout.precio * store.checkout.days}</h5>
          <form onSubmit={handlecheckout} className="mt-4">
            <button type="submit" className="btn-success btn-lg">
              PAGO
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

