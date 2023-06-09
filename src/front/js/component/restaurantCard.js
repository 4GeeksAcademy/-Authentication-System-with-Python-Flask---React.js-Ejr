import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginModal from "../pages/loginModal";
import "../../styles/register.css";
import { Context } from "../store/appContext";

export const RestaurantCard = () => {
    const {store, actions}= useContext(Context);
    function imgError(e){
        e.target.src="https://starwars-visualguide.com/assets/img/placeholder.jpg"
    }

	return (
        <>
            {store.restaurantes && store.restaurantes.length > 0 && store.restaurantes.map((item, index) =>(
            <div className="col card gradient-custom-contrast">
                    <div key={index} className="card-img-top mx-0 p-1" alt="{item.url}">
                        <img src={item.url} onError={imgError} className="card-img-top mx-0 p-1 pt-3" alt="CharacterImg"></img>
                        <div className="cardTitle card-body">
                            <h5 className="cardTitle card-body"><strong>{item.name}</strong></h5>
                        </div>
                        <div className="cardFooter card-body ms-auto px-auto">
                            {item.platos.map((element, index)=>{
                                return(
                                    <div className="row g-3 gap-3">
                                        <p key={index} className="col fw-bold rounded d-flex align-self-center justify-content-center">
                                            {element.name}
                                        </p>
                                        <p key={index} className="col fw-bold text-primary rounded d-flex align-self-center justify-content-center">{element.precio} Pesos</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
             
            ))|| <h1>loading...</h1>}
            </>
                
    )
    };
//         store[restaurantes]?.map(item=>{
//             <h1>`${item.name}`</h1>
                       
// }))};

export default RestaurantCard;


{/* <div className="d-flex">
            {store[widget]?.map(item=>(
                    <div key={item.uid} className="wholecard card">
                        <img src={item.img} onError={imgError} className="card-img-top mx-0 p-0" alt="CharacterImg"></img>
                        <div className="cardTitle card-body">
                            <h5 className="cardTitle card-body"><strong>{item.name}</strong></h5>
                        </div>
                        <div className="cardFooter card-body ms-auto px-auto">
                            <Link to={`${widget}/${item.uid}`}>
                            <button 
                            className="btn btn-outline-info mx-4" 
                            >Nerd Mode</button>
                            </Link>
                            
                            <button 
                            className={`btn btn-${verifyFavorite(item.uid)?"warning":"outline-warning"}`} 
                            onClick={()=>actions.FavoriteChecked(`${widget}/${item.uid}`, item.name)}
                            >♡</button>
                        </div>
                    </div>
            ))|| <h1>loading...</h1>}
                
        </div> */}