import React, { useState, useContext, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { UserNavbar } from '../component/User/UserNavbar.jsx';

function Message({ content }) {
    return <p>{content}</p>;
}

export function PaypalPayment() {
    const initialOptions = {
        "client-id": "AevJ33XfD8OFiLiW8oNbuK33BjtIiZL3rNyccBkAwZArxDC8xmBcc4Th_ESuXEGqKBkBV83QXNl8I_ND",
        "enable-funding": "venmo",
        "disable-funding": "",
        currency: "USD",
        "data-page-type": "product-details",
        components: "buttons",
        "data-sdk-integration-source": "developer-studio",
    };

    const { store, actions } = useContext(Context);
    const [message, setMessage] = useState("");
    const [detailsPaypal, setDetailsPaypal] = useState({});
    const [getDataPaypal, setGetDataPaypal] = useState({
        date: 'N/A',
        id: 'N/A',
        status: 'N/A',
        currency_code: 'N/A',
        value: 'N/A',
        typePayment: 'PAYPAL'
    });

    useEffect(() => {
        if (detailsPaypal) {
            setGetDataPaypal({
                date: detailsPaypal.create_time || 'N/A',
                id: detailsPaypal.id || 'N/A',
                status: detailsPaypal.status || 'N/A',
                currency_code: detailsPaypal.purchase_units?.[0]?.amount?.currency_code || 'N/A',
                value: detailsPaypal.purchase_units?.[0]?.amount?.value || 'N/A'
            });
        }
    }, [detailsPaypal]);

    console.log(detailsPaypal)

    const location = useLocation();
    const totalPrice = location.state?.totalPrice || 0;

    const datos = {
        purchase_units: [
            {
                amount: {
                    currency_code: 'USD',
                    value: totalPrice.toFixed(2),
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
            setDetailsPaypal(details);
            handleSentToPayment(details);
        } catch (error) {
            console.error('Error al capturar la transacción:', error);
            setMessage('Ocurrió un error al procesar la transacción.');
        }
    }

    async function onError(err) {
        console.error('Error durante la transacción:', err);
        setMessage(`Ocurrió un error durante la transacción: ${err.message}`);
    }

    async function handleSentToPayment(detailsPaypal) {
        const paymentData = {
            create_time: detailsPaypal.create_time,
            id: detailsPaypal.id,
            status: detailsPaypal.status,
            currency_code: detailsPaypal.purchase_units?.[0]?.amount?.currency_code,
            value: detailsPaypal.purchase_units?.[0]?.amount?.value
        };
        await actions.createPayments(paymentData);
    }

    return (
        <div className="container mt-5">
            <UserNavbar />
            <div className="card shadow-sm p-4">
                <h1 className="mb-4">Total: ${totalPrice.toFixed(2)}</h1>
                <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons
                        forceReRender={[totalPrice]}
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
            <div>
                {detailsPaypal ? (
                    console.log(
                        detailsPaypal,
                        detailsPaypal.create_time || 'N/A',
                        detailsPaypal.id || 'N/A',
                        detailsPaypal.status || 'N/A',
                        detailsPaypal.purchase_units?.[0]?.amount?.currency_code || 'N/A',
                        detailsPaypal.purchase_units?.[0]?.amount?.value || 'N/A'
                    )
                ) : (
                    console.error("detailsPaypal is undefined")
                )}
            </div>
        </div>
    );
}
