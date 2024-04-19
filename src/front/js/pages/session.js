import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { disableValidation } from "schema-utils";
import fotopais from "../../img/Eiffel-Tower-Paris.png"



export const Session = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="SessionContainer cambria ">
            <div className="IconWrapper d-flex flex-row justify-content-center  " >
                <div className="Iconholder d-flex flex-row justify-content-center p-1 border border-dark rounded my-2" style={{width:120, height:40}}>
                    <div className="bg-success text-center rounded-circle mx-1" style={{width:30, height:30}}><i class="fa-solid fa-question fa-beat-fade"></i></div>
                    <div className="bg-danger text-center rounded-circle mx-1" style={{width:30, height:30}}><i class="fa-solid fa-fire fa-bounce"></i></div>
                    <div className="bg-primary text-center rounded-circle mx-1" style={{width:30, height:30}}>
                        <p className="Contador"> 1</p>
                    </div>
                </div>
            </div>
            <div className="Pictureholder text-center  " >
                <img className=" border border-dark rounded my-2"src={fotopais} style={{width:350, height:500}} />
            </div>
            <div className="QuestionHolder text-center">
                <h1>¿A qué país pertenece esta imagen?</h1>
            </div>
            <div className="FlagWrapper d-flex flex-row justify-content-center">
                <div className="Flagholder d-flex flex-row justify-content-center text-center p-1 my-2 mb-5">
                    <div className=" bg-primary mx-3 border border-dark rounded" style={{width:80, height:40}}><p> a</p></div>
                    <div className=" bg-primary mx-3 border border-dark rounded" style={{width:80, height:40}}><p> a</p></div>
                    <div className=" bg-primary mx-3 border border-dark rounded" style={{width:80, height:40}}><p> a</p></div>
                </div>
            </div>

        </div>
        
	);
};
