import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoginModal from "../pages/loginModal";
import "../../styles/register.css";
import { Context } from "../store/appContext";
import FoodModal from "./foodModal";

export const SubscriptionCard = () => {
    const { store, actions } = useContext(Context);
    const restaurant = store.restaurantes;
    const subItem = restaurant.subscription;
    const name = subItem ? subItem.SubscriptionName : "";

    console.log(restaurant)
    console.log(subItem)


    function imgError(e) {
        e.target.src = "https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/f3918add-a5b5-437e-9bed-186b25ef5636/DreamShaper_v5_3_An_AIpowered_machine_surrounded_by_a_vibr_1.jpg"
    }

    return (
        <>
        {/* renderizar las sucripciones dentro de store.restaurantes.subcription para mostrar en cada tarjeta únicamente la suscripcion y sus datos 
        store[restaurantes[
        subscription: [ <--- subItem Hay que mapear en esta tarjeta las propiedades, similar a lo que secude en foodCard.js, puedes navegar ahi usando /order-food/0
            {
                SubscriptionName: "Italianisimo",
                description: "Tendras una fabulosa comida variada todos los días!, Lunes Pizza, martes Pasta, miercoles fettucinni, jueves, gnocci, variaremos las combinaciones e ingredientes a lo lagro de la semana, asume lo delicioso y asegura tus sorpresas!",
                price: "20000"
            }
        ]]]
        ver en flux.  */}
            <div className="col card bg-transparent border border-primary">
                {store.restaurantes?.map((element, index) => (
                    <div key={index} onError={imgError} className="card-img-top mx-0 p-1 m-1 w-100" alt="{item.url}">
                        {/* generar dentro de este div los datos de la suscripcion, o cargar la imagen desde subcription */}
                        <img src={element.image} onError={imgError} className="card-img-top mx-0 p-1 pt-3 img-fluid figure-image" alt="restaurantImg" style={{ backgroundSize: "cover" }}></img>
                        <div className="card-body">
                            <h1 className="w-100 card-body text-light d-flex justify-content-center">
                                <strong>{element.subscription.SubscriptionName}</strong>
                                <button className="btn btn-dark btn-outline-info align-self-end">♡</button>
                            </h1>
                        </div>
                        <div className="p-5 mt-5 w-100">
                            <p className="text-light fs-3 description-text">{element.description}</p>
                        </div>
                        <div className="mx-auto d-flex justify-content-evenly w-100">
                            <button className="btn btn-outline-primary fw-bold rounded d-flex align-self-center justify-content-center w-100 px-5 py-3 mx-2 fs-7">
                                Precio de: {element.subscription.price} Pesos.
                            </button>
                            <button className="btn btn-outline-primary fw-bold rounded d-flex align-self-center justify-content-center w-100 px-5 py-3 mx-2">
                                Agregar al Carrito
                            </button>
                        </div>
                    </div>
                ))}
            </div>


        </>
    )
};

export default SubscriptionCard;