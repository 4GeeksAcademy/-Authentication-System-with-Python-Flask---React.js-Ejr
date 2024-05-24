import React, { useContext } from "react";
import { useNavigate} from "react-router-dom";
import { Context } from "../store/appContext.js";

export const ProductDisplay = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  if (!store.checkout.precio_id_stripe) {
    navigate('/');
  } 
  console.log(store.checkout.precio_id_stripe, store.checkout.days);
  return (
    <section>
      <div className="product mt-5 mb-5 text-center vh-100">
        <img src={store.details?.url_img1} style={{height:"450px", objectFit: "cover"}} alt="AUDI A3" />
        <div className="description my-3">
          <h3>{store.checkout.marca_modelo}</h3>
          <h5>€{store.checkout.precio * store.checkout.days}</h5>
          <form className="mt-4" action={`${process.env.BACKEND_URL}/api/create-checkout-session/${store.checkout.precio_id_stripe}/${store.checkout.days}`} method="POST">
            <button type="submit" className="btn-success btn-lg">
              PAGO
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

