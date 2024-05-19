import React, { useContext } from "react";
import { useNavigate} from "react-router-dom";
import { Context } from "../store/appContext.js";

export const ProductDisplay = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  if (!store.checkout.precio_id_stripe) {
    navigate('/');
  } 

  return (
    <section>
      <div className="product mt-5 mb-5 text-center vh-100">
        <img src="https://somoselectricos.com/wp-content/uploads/modelos/Audi-e_tron.png" alt="AUDI A3" />
        <div className="description my-3">
          <h3>{store.checkout.marca_modelo}</h3>
          <h5>€{store.checkout.precio * store.checkout.days}</h5>
          <form className="mt-4" action={`https://fuzzy-goggles-pjrw5j7xg769h965g-3001.app.github.dev/api/create-checkout-session/${store.checkout.precio_id_stripe}/${store.checkout.days}`} method="POST">
            <button type="submit">
              PAGO
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

