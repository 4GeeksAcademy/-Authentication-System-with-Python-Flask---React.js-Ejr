import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const VistaInflu = ()=>{
    return <>
        <div className="container" style = {{display: "flex", justifyContent:"center", alignContent: "center"}}>
            <img className = "img-V-I" src = {"https://media.istockphoto.com/photos/social-media-concept-picture-id1205703732?k=20&m=1205703732&s=612x612&w=0&h=RjnvKZW_InJ73SoPzQVA8qj5bcg6_0yBgPx_JUtrn2k="} alt = {"img-general"} />



        </div>
        
    </>

}