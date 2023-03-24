import React, { useContext,useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import rigo from "../../img/rigo-baby.jpg"
import { Action } from "history";

export default function AddMaster(){
    const[master,setMaster]= useState({
        // name:"",
        // phone: 0,
        // alias:""
    })
    const{store,actions}= useContext(Context)
    
  
    
    return<>
        <button onClick={()=>console.log(master)}> master</button>
        <h1 className="text-color container  d-flex justify-content-center">Agregar Maestro</h1>
    <div className=" d-flex justify-content-center container">
    <form className="row w-50 p-3 ">
        <input placeholder="Name" onChange={(e)=>{setMaster({...master,name:e.target.value})}}/>
        <input placeholder="Telefono" onChange={(e)=>{setMaster({...master,phone:parseInt(e.target.value)})}}/>
        <input placeholder="Alias" onChange={(e)=>{setMaster({...master,alias:e.target.value})}}/>
        <div className="d-flex justify-content-center mt-3">
            <button className="border-0 bg-pink" onClick={(e)=>{e.preventDefault();actions.addMaster(master)}}>Guardar</button>
        </div>
        

    </form>
    
    </div>
   
    </>
}