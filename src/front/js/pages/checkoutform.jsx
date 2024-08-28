import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/checkout.css";

const CheckoutForm = () => {
    const { store, actions } = useContext(Context);
    const { totalAmount } = store;

    const handleSubmit = async (event) => {
        event.preventDefault();
        await actions.pagoMercadoPago(totalAmount);
        let url = store.mercadoPago.init_point;
        window.location.replace(url);
    };

    return (
        <>
            <div className="invisible-header-box" style={{ width: "50dvh" }}></div>
            <h1 className="text-center m-4">Detalles de envío</h1>
            <div className="main-container">

                <form onSubmit={handleSubmit} className="mx-auto w-50">
                    
                    <button className="btn btn-success mb-3 p-2 w-100" type="submit">Pagar ${totalAmount.toFixed(2)}</button>
                </form>
            </div>
        </>
    );
};

export default CheckoutForm;
