import React from "react";

export const ProductDisplay = () => {
    return (
    <section>
      <div className="product mt-5 mb-5 text-center vh-100">
          <img src="https://somoselectricos.com/wp-content/uploads/modelos/Audi-e_tron.png" alt="AUDI A3"/>
          <div className="description my-3">
            <h3>AUDI A3</h3>
            <h5> €20.00</h5>
            <form className="mt-4" action="/create-checkout-session" method="POST">
              <button type="submit">
                Checkout
              </button>
            </form>  
          </div>
      </div>
    </section>
  );
};
  
  