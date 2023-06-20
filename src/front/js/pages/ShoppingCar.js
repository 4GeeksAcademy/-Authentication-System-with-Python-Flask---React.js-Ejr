import React from "react";
// import {  } from "react-router";
import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/shoppingCar.css";
import { useNavigate, useParams } from "react-router-dom";


export const ShoppingCar = () => {
    const params = useParams();
    const { store, actions } = useContext(Context);
    const user_services = store.user_services
    // const favorites = store.favorites
    const navigate = useNavigate();
    const pagoMercadoPago = () => {
        window.location.replace(store?.mercadopago.init_point);
    };


    useEffect(() => {

        if (!store.accessToken) {
            navigate("/login")
        }
        else {
            actions.fetchShoppingCart()
            actions.pagoMercadopago()
        }
    }, [])


    return (
        <>
        <div style={{ backgroundColor: '#40768C' }}  >
            <div className="container min-vh-100" >
                <div className="text-black text-center" >
                    <div className="card border-0" style={{  backgroundColor: '#40768C' }}>
                        <div className="row g-0">
                            <h1 className="card-title p-5">ShoppingCart</h1> <br></br>
                            <div className="col-md-4" >
                                <h2 className="card-title pb-2" >Your Account</h2><br></br>
                                <img src="https://cdn-icons-png.flaticon.com/512/727/727399.png?w=826&t=st=1686358778~exp=1686359378~hmac=f84a1339da9e966863baaaa695a7da2268cb3f815bde80a01506c7777cf7cf50" className="card-img-top" alt="..." style={{ width: "100px" }} />
                                <h3> {user_services[0]?.userName}</h3> <br></br>
                                <h3>ADDRESS: {user_services[0]?.address}</h3> <br></br>


                            </div>
                            <div className="col-md-8">
                                <h2 className="card-title pb-2">Your Services</h2><br></br>
                                <div className="card-body">

                                    {user_services.map((element, index) => (
                                        <div className="col-12" key={index}>
                                            <p>
                                                {/* ID:{element.id} <br></br> */}
                                                {element.servicesName} <br></br>
                                                $ USD: {element.servicesPrice}<br></br>
                                                {element.date}<br></br>
                                            </p>

                                            <button className="btn btn-outline-dark" onClick={() => actions.deleteFavorites(element.id)}><i className="fa-regular fa-trash-can"></i></button>
                                        </div>
                                    ))}


                                </div>
                            </div>
                        </div>
                        <div >
                            <p className="card-footer">
                                <h2>
                                    Total USD = ${store.totalValue}
                                </h2>
                                <button className="btn btn-dark" onClick={pagoMercadoPago}>Pay Here
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
};



