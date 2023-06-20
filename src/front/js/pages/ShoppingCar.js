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
        <div className="custom-shoppingCar">
            <div className="text-black text-center custom-shoppingCar">
                <h1>
                    <div className="card mb-3" style={{ width: "auto" }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                {/* <img src="..." class="img-fluid rounded-start" alt="..." /> */}
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title">ShoppingCar</h5>
                                    <h1>USER: {user_services[0]?.userName}</h1>
                                    <h1>ADDRESS: {user_services[0]?.address}</h1>
                                    {user_services.map((element, index) => (
                                        <div className="col" key={index}>
                                            <p>ID:{element.id} {element.servicesName}, $USD:{element.servicesPrice}, {element.date}</p><button className="btn btn-danger" onClick={() => actions.deleteFavorites(element.id)}><i className="fa-regular fa-trash-can"></i></button>
                                        </div>
                                    ))}
                                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p>
                                        Total USD = ${store.totalValue}
                                    </p>
                                    <p className="card-footer">
                                        <button className="btn btn-dark" onClick={pagoMercadoPago}>Pagar
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* {favorites.name} */}
                </h1>
                {/* <img src={`https://starwars-visualguide.com/assets/img/planets/${params.theid}.jpg`}></img> */}

                <br></br>
                <br></br>

                <h4>
                    {/* Price :  {favorites.price} */}
                </h4>


            </div>
            </div>
    )
};



