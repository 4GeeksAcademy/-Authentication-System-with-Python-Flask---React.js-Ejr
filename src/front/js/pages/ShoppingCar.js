import React from "react";
import { useParams } from "react-router";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useEffect } from "react";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";


export const ShoppingCar = () => {
    const params = useParams();
    const { store, actions } = useContext(Context);
    const favorites = store.favorites
    const navigate = useNavigate()
    useEffect(() => {
        if (!store.accessToken) {
            navigate("/login")
          }
    }, [])


    return (
        <div className="text-white text-center custom-home">
            <h1>
                {favorites.name}
            </h1>
            {/* <img src={`https://starwars-visualguide.com/assets/img/planets/${params.theid}.jpg`}></img> */}

            <br></br>
            <br></br>
        
            <h4>
                Price :  {favorites.price}
            </h4>

           
        </div>
    )
};



