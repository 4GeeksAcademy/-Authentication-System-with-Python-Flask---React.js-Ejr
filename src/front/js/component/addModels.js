import React, { useContext,useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import rigo from "../../img/rigo-baby.jpg"
import { Action } from "history";

export default function AddModels(){
    const[models,setModels]= useState({})
    const{store,actions}= useContext(Context)
    const[showMessage,setShowMessage]=useState(false)

    const handleSave=()=>{
        if (!models.name) {
            alert("Por favor, inserte la informacion solicitada");
            return;
          }
        actions.addModel(models,setShowMessage);
        setModels({})

    }
  
    
    return<>
        <h1 className="text-color container  d-flex justify-content-center">Agregar Modelo</h1>
        <div className=" d-flex justify-content-center container">
                {/* <button onClick={()=>console.log(models)}>hola</button> */}
            <form className="row w-50 p-3 ">
                <input placeholder="Name" onChange={(e)=>{setModels({...models,name:e.target.value})}} value={models.name || ''}/>
                <input placeholder="Size From" onChange={(e)=>{setModels({...models,size_from:e.target.value})}} value={models.size_from || ''}/>
                <input placeholder="Size To" onChange={(e)=>{setModels({...models,size_to:e.target.value})}} value={models.size_to || ''}/>
                <input placeholder="Category" onChange={(e)=>{setModels({...models,category:e.target.value})}} value={models.category || ''}/>
                <input placeholder="Photo" onChange={(e)=>{setModels({...models,photo:e.target.value})}} value={models.photo || ''}/>
            </form>

    
        </div>
            <div className="d-flex justify-content-center container">
                <button onClick={()=>{handleSave()}}>Guardar</button>
            </div>
            { showMessage && <div className="popover">Tu modelo se agrego exitosamente!</div>}
            
            
   
    </>
}