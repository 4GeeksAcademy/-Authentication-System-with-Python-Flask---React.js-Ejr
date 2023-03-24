import React, { useContext,useState} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import rigo from "../../img/rigo-baby.jpg"
import { Action } from "history";

export default function AddOrder(){
    const[order,setOrder]= useState({})
    const{store,actions}= useContext(Context)
    
  
    
    return<>
    
        <div className="d-flex justify-content-center container">
            <button onClick={()=>{console.log(order)}}>click</button>
             <h1 className="text-color ">Nueva Orden</h1>
        </div>
        <div className="d-flex justify-content-center container">
            <form className="row w-50 p-3 ">
                <input placeholder="plant type" onChange={(e)=>{setOrder({...order,plant_type:e.target.value})}}/>
                <input placeholder="plant size" onChange={(e)=>{setOrder({...order,size:parseInt(e.target.value)})}}/>
                <input placeholder="customer name" onChange={(e)=>{setOrder({...order,name:e.target.value})}}/>
                <input placeholder="customer number" onChange={(e)=>{setOrder({...order,phone:e.target.value})}}/>
                <input placeholder="delivery date" type="date" onChange={(e)=>{setOrder({...order,delivery_date:e.target.value})}}/>
                <input placeholder="price" onChange={(e)=>{setOrder({...order,price:e.target.value})}}/>
                {/* <input placeholder="status" onChange={(e)=>{setOrder({...order,tatus:e.target.value})}}/> */}
            </form>
        </div>
        <div className="d-flex justify-content-center container border-0">
            <button onClick={(e)=>{e.preventDefault(e);actions.addOrder(order)}}>Guardar</button>
        </div>
        

           
          

   
   
    </>
}