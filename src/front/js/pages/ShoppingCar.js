import React from "react";
// import {  } from "react-router";
import { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate, useParams } from "react-router-dom";


export const ShoppingCar = () => {
    const params = useParams();
    const { store, actions } = useContext(Context);
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

            actions.pagoMercadopago()
        }
    }, [])


    return (
        <>
            <div className="text-black text-center custom-home">
                <h1>
                    <div class="card mb-3" style={{ width: "auto" }}>
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src="..." class="img-fluid rounded-start" alt="..." />
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h5 class="card-title">ShoppingCar</h5>
                                    <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                    <p class="card-footer">
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
        </>
    )
};



