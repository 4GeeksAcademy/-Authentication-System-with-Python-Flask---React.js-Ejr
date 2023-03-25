import React, { useContext,useState} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import rigo from "../../img/rigo-baby.jpg"
import { Action } from "history";

export default function AddOrder(){
    const[order,setOrder]= useState({})
    const{store,actions}= useContext(Context)
    
  
    
    return<>
    
        <div className="simple-form">
            <h2 className="bold">Agrega un nuevo pedido</h2>
        <input placeholder="Tipo de planta" onChange={(e)=>{setOrder({...order,plant_type:e.target.value})}}/>
                <input placeholder="Talla" onChange={(e)=>{setOrder({...order,size:parseInt(e.target.value)})}}/>
                <input placeholder="Nombre del cliente" onChange={(e)=>{setOrder({...order,name:e.target.value})}}/>
                <input placeholder="Teléfono del cliente" onChange={(e)=>{setOrder({...order,phone:e.target.value})}}/>
                <p className="border-0 bold">Fecha de entrega</p>
                <input placeholder="Fecha de entrega" type="date" onChange={(e)=>{setOrder({...order,delivery_date:e.target.value})}}/>
                <input placeholder="Precio" onChange={(e)=>{setOrder({...order,price:e.target.value})}}/>
            <button className="button-dark" onClick={(e)=>{e.preventDefault(e);actions.addOrder(order)}}>Guardar</button>
        </div>
    
      
    
   
    </>
}