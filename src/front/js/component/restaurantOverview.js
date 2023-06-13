import React, { useContext, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import LoginModal from "../pages/loginModal";
import "../../styles/register.css";
import { Context } from "../store/appContext";
import FoodCard from "./foodCard";
import FoodModal from "./foodModal";

export const RestaurantOverview = () => {
    const {store, actions}= useContext(Context);
    // const {restaurantIndex} = useParams()
    // console.log(restaurantIndex)
    // const index = store.restaurantes.find(item=>item.index==restaurantIndex)
    const { restaurantIndex } = useParams();
    const index = parseInt(restaurantIndex); // Convert the string to an integer if needed

    // Access the name property of the restaurant
    const restaurant = store.restaurantes[index];
    const name = restaurant ? restaurant.name : ""; // Check if the restaurant exists before accessing its name property

    console.log(name); // Verify the value here

    function imgError(e){
        e.target.src="https://cdn.leonardo.ai/users/25acf724-d0fb-44e7-8da5-a5932af5eac9/generations/f3918add-a5b5-437e-9bed-186b25ef5636/DreamShaper_v5_3_An_AIpowered_machine_surrounded_by_a_vibr_1.jpg"
    }

	return (
        <div className="container-fluid bg-dark" style={{paddingTop:"5rem", width: "100%", height: "100vh", paddingBottom: "300vh"}}>
            <div className="container">
            <section className="hero py-5 px-1 mx-auto rounded">
            {[restaurant].map((item, index) =>(
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
                            <div className="row row-cols-2 sm-row-cols-1 md-row-cols-2 lg-row-cols-3 xl-row-cols-3 g-5">
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

