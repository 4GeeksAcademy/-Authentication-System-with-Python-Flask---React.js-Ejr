import React, { useContext,useEffect,useState} from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import axios from 'axios';
import { Action } from "history";

export default function AddOrder(){
    const[order,setOrder]= useState({})
    const[showMessage,setShowMessage]= useState(false)
    const[plantTypes,setPlantTypes]= useState([])
    const[master,setMaster]= useState([])


    const{store,actions}= useContext(Context)


    
   const handleSave=()=>{
    if (!order.name) {
        alert("Por favor, inserte la informacion solicitada");
        return;
      } else if(!order.plant_id){
        alert("Por favor Inserta Un Tipo De Planta");
        return;
      }else if(!order.master){
        alert("Por favor Inserta Un Maestro");
        return;
      }
    actions.addOrder(order,setShowMessage);
    setOrder({})
   }

   const fetchPlants = ()=>{
    axios.get(process.env.BACKEND_URL+"/api/get/plant/types")
    .then((response) => {setPlantTypes(response.data)})
    .catch((error) => {console.log(error)});
   }
   
   const fetchMasters = ()=>{
    axios.get(process.env.BACKEND_URL+"/api/get/masters")
    .then((response) => {setMaster(response.data)})
    .catch((error) => {console.log(error)});
   }


   useEffect(() => {
   fetchPlants();
   fetchMasters();
    }, [])
    
    return<>
    
        <div className="simple-form">
            <h2 className="bold">Agrega un nuevo pedido</h2>
                {/* Tipo de Planta */}
                <select
                    name="Tipo de Planta"
                    onChange={(e)=>{setOrder({...order, plant_id: e.target.value})}}
                    value={order.plant_id || ''}
                > 
                    <option value={0}> Selecciona Una Planta </option>
                    {plantTypes.map((plant) => (
                    <option value={plant.id} key={plant.id}>
                    {plant.name}
                    </option> ))}
                </select>
                
                {/* Maestro elegido */}                
                <select
                    name="Maestro"
                    onChange={(e)=>{setOrder({...order, master: e.target.value})}}
                    value={order.master || ''}
                > 
                    <option value={0}> Selecciona Un Maestro </option>
                    {master.map((master) => (
                    <option value={master.id} key={master.id}>
                    {master.name}
                    </option> ))}
                </select>


                <input placeholder="Talla" onChange={(e)=>{setOrder({...order,size:parseInt(e.target.value)})}} value={order.size || ''}/>
                <input placeholder="Nombre del cliente" onChange={(e)=>{setOrder({...order,name:e.target.value})}} value={order.name || ''}/>
                <input placeholder="Teléfono del cliente" onChange={(e)=>{setOrder({...order,phone:e.target.value})}} value={order.phone || ''}/>
                <p className="border-0 bold" >Fecha de entrega</p>
                <input placeholder="Fecha de entrega" type="date" onChange={(e)=>{setOrder({...order,delivery_date:e.target.value})}} value={order.delivery_date || ''}/>
                <input placeholder="Precio" onChange={(e)=>{setOrder({...order,price:e.target.value})}} value={order.price || ''}/>
                <input placeholder="Notas Extra" onChange={(e)=>{setOrder({...order,description:e.target.value})}} value={order.description || ''}/>
            <button className="button-dark" onClick={()=>{handleSave()}}>Guardar</button>

        <div  style={{position:"relative"}}>
            {showMessage && <div className="popover">Pedido agregado exitosamente! </div>}
        </div>
        </div>

    </>
}