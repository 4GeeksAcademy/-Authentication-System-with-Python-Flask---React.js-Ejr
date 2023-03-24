import React, { useContext,useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import rigo from "../../img/rigo-baby.jpg"
import { Action } from "history";

export default function AddOrder(){
    const[order,setOrder]= useState({})
    const{store,actions}= useContext(Context)
    
  
    
    return<>
        <h1 className="text-color ">Nueva Orden</h1>
        <form className="row w-50 p-3 d-flex justify-content-center ">
            <input placeholder="id"/>
            <input placeholder="master id"/>
            <input placeholder="plant type"/>
            <input placeholder="plant size"/>
            <input placeholder="customer name"/>
            <input placeholder="customer number"/>
            <input placeholder="delivery date"/>
            <input placeholder="price"/>
            <input placeholder="status"/>
        </form>
          
   
    </>
}