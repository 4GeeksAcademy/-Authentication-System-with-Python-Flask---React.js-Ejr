import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoginModal from "../pages/loginModal";
import "../../styles/register.css";
import { Context } from "../store/appContext";
import FoodCard from "./foodCard";

export const RestaurantOverview = () => {
    const {store, actions}= useContext(Context);
    const index = store.restaurantes.find(item=>item.id==restaurantIndex)
    const {restaurantIndex} = useParams()

    function imgError(e){
        e.target.src="https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/f3918add-a5b5-437e-9bed-186b25ef5636/DreamShaper_v5_3_An_AIpowered_machine_surrounded_by_a_vibr_1.jpg"
    }

	return (
        <div className="container-fluid bg-dark" style={{paddingTop:"5rem", marginBottom: "45rem", width: "100%"}}>
            <div>
            <section className="hero py-5 px-1 mx-auto rounded">
            {[index].map((item, index) =>(
                <div key={index} className="container">
                <div className="row">
                    <div className="col-md-8">
                        <h1 className="display-4 main-title text-light" style={{fontSize:"4rem"}}>{`Bienvenido a ${item.name}`}</h1>
                        <p className="lead sub-title" style={{fontSize:"2rem"}}>Es hora de pedir algo delicioso, para que llegue a la puerta de tu casa!</p>
                    </div>
                    <div className="col-md-4">
                        <img src={item.image} 
                        className="img-fluid rounded"></img>
                    </div>
                </div>
                </div>
                ))}
            </section>

                <section>
                    <div>
                        <div className="container-fluid text-center mt-5">
                            <div className="row row-cols-2 gap-4 g-5">
                                <FoodCard />
                            </div>  
                        </div>
                    </div>
                </section>
            </div>
            <LoginModal />
        </div>
    )
};

export default RestaurantOverview

