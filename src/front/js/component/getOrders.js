import React, { useContext,useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import rigo from "../../img/rigo-baby.jpg"
import { Action } from "history";

export default function GetOrders(){
    const[orders,setOrders]= useState({
        // name:"",
        // phone: 0,
        // alias:""
    })
    const{store,actions}= useContext(Context)
    
  
    
    return<>
        <button onClick={()=>(actions.getOrders())}> Get Orders</button>
        <button onClick={()=>console.log(store.orders)}> Show Orders</button>
        
   
    </>
}