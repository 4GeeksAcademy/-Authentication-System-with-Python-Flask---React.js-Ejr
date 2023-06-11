import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoginModal from "../pages/loginModal";
import "../../styles/register.css";
import { Context } from "../store/appContext";

export const FoodCard = () => {
    const {store, actions}= useContext(Context);
    const index = store.restaurantes.find(item=>item.index==restaurantIndex)
    const {restaurantIndex} = useParams()

    function imgError(e){
        e.target.src="https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/f3918add-a5b5-437e-9bed-186b25ef5636/DreamShaper_v5_3_An_AIpowered_machine_surrounded_by_a_vibr_1.jpg"
    }

    return(
        <>   
        {index.plates && index.plates.length > 0 && index.plates.map((element, index) =>{
                                return(
                <div key={index} className="col card bg-transparent border border-primary"> 
                    <div key={index} onError={imgError} className="card-img-top mx-0 p-1 m-1 w-100" alt="{item.url}">
                        <img  src={element.image} onError={imgError} className="card-img-top mx-0 p-1 pt-3 img-fluid figure-image" alt="restaurantImg" style={{ backgroundSize: "cover"}}></img>
                            <div className="card-body">
                                <h1 className="w-100 card-body text-light"><strong>{element.plateName}</strong></h1>
                            </div>                        
                        <div className="p-5 mt-5 w-100">
                            <p className="text-light fs-3 description-text">{element.description}</p>
                        </div>
                        <div className="mx-auto d-flex justify-content-evenly w-100">
                                <Link key={index} to={`/${element.plateName}/${index}`}>
                                    <button className="btn btn-outline-primary fw-bold rounded d-flex align-self-center justify-content-center w-100 px-5 py-3">{element.price} Pesos</button>
                                </Link>
                        </div>
                    </div>
                    </div>
                                )})|| <h1 className="main-title gradient-custom">loading...</h1>}
            </>
    )
};

export default FoodCard;