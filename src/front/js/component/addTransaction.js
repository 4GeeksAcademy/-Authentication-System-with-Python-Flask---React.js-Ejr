import React, { useContext,useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Action } from "history";

export default function AddTransaction(){
    const[transaction,setTransaction]= useState({})
    const[showMessage,setShowMessage]= useState(false)
    const{store,actions}= useContext(Context)
    const subtractPlants= (e)=>{
        e.preventDefault()
        setTransaction({
            ...transaction,
            size34:-transaction.size34,
            size35:-transaction.size35,
            size36:-transaction.size36,
            size37:-transaction.size37,
            size38:-transaction.size38,
            size39:-transaction.size39,
            size40:-transaction.size40,
            size41:-transaction.size41,
        });
        actions.addTransaction(transaction)
    }
  
    
    return<>
        <h1 className="text-color container  d-flex justify-content-center">Nueva Transacción</h1>
        <div className=" d-flex justify-content-center container">
            {/* <button onClick={()=>{console.log(transaction);}}>hola</button> */}
        <form className="row w-50 p-3 ">
            <input placeholder="Descripcion" onChange={(e)=>{setTransaction({...transaction,description:e.target.value})}}/>
             <input placeholder="Talla 34" onChange={(e)=>{setTransaction({...transaction,size34:parseInt(e.target.value)})}}/>
            <input placeholder="Talla 35" onChange={(e)=>{setTransaction({...transaction,size35:parseInt(e.target.value)})}}/>
            <input placeholder="Talla 36" onChange={(e)=>{setTransaction({...transaction,size36:parseInt(e.target.value)})}}/>
            <input placeholder="Talla 37" onChange={(e)=>{setTransaction({...transaction,size37:parseInt(e.target.value)})}}/>
            <input placeholder="Talla 38" onChange={(e)=>{setTransaction({...transaction,size38:parseInt(e.target.value)})}}/>
            <input placeholder="Talla 39" onChange={(e)=>{setTransaction({...transaction,size39:parseInt(e.target.value)})}}/>
            <input placeholder="Talla 40" onChange={(e)=>{setTransaction({...transaction,size40:parseInt(e.target.value)})}}/>
            <input placeholder="Talla 41" onChange={(e)=>{setTransaction({...transaction,size40:parseInt(e.target.value)})}}/>
        <div className="d-flex justify-content-center mt-3">
            <button className="border-0 bg-pink me-3" onClick={(e)=>{e.preventDefault();actions.addTransaction(transaction,setShowMessage)}}>Sumar Plantas Al Inventario</button>
            <button className="border-0 bg-pink" onClick={(e)=>{subtractPlants(e)}}>Entregar Plantas A Un Maestro</button>
        </div>
        <div style={{}}>
        {showMessage && <div className="popover">Transacción Exitosa</div>}
        </div>

        

    </form>
    
    </div>
   
    </>
}