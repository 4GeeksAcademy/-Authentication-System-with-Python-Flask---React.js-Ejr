import React from "react";
import { useParams } from "react-router";
import { useContext } from "react";
import { Context } from "../store/appContext";
import { useEffect } from "react";
import "../../styles/home.css";


export const ShoppingCar = () => {
const params = useParams();
const {store, actions} = useContext(Context);
useEffect (()=>{
    actions.fetchaddServices(params.index)
},[])


	return(
	<div className="text-white text-center">
        <h1>
            {store.services.name} 
        </h1>
		{/* <img src={`https://starwars-visualguide.com/assets/img/planets/${params.theid}.jpg`}></img> */}

        <br></br>
        <br></br>
        <h4>
        Diameter :  {store.planetsInfo.diameter}
        </h4>
    

        <h4>
        Population :  {store.planetsInfo.population}
        </h4>

        <h4>
        Rotation period :  {store.planetsInfo.rotation_period}
        </h4>

        <h4>
        Orbital period :  {store.planetsInfo.orbital_period}
        </h4>

        <h4>
        Climate :   {store.planetsInfo.climate}
        </h4>
    
    
    
        
       
		
	</div>
)};



