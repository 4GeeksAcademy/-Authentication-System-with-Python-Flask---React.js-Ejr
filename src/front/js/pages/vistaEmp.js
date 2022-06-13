import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const VistaEmp = () =>{
    return <>
        <div className="container-fluid">
            <div
                className="container img-principal"
                id="imgPerfil2"
                style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                borderRadius: "10px 80px",
                minHeight: "500px",
                }}
            >
                <img
                className="img2 rounded-circle"
                style={{ maxWidth: "250px", height:"250px" }}
                src={
                    "https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                }
               
                />
            </div>



        </div>
    
    
    
    
    </>

}