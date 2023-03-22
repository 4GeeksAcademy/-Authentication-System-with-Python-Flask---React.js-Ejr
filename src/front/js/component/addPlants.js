import React, { useContext,useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import rigo from "../../img/rigo-baby.jpg"

export default function AddPlants(){
    const {store,actions}=useContext(Context);
    const [plant,setPlant]= useState({
       name:"",
       size34:0, 
       size35:0, 
       size36:0, 
       size37:0, 
       size38:0, 
       size39:0, 
       size40:0
    })
    const handleNameChange= (e)=>{
        setPlant( 
            {...plant,name:e.target.value}
        )
    }

    return<>
   
    <div className="table-container container bg-pink mt-3 shadow ">
    <table className=" w-100 rounded  rounded" style={{fontWeight: 300}}>
        <thead>
        <tr >
            <th style={{fontWeight: 300}}>Nombre de la planta</th>
            <th>34</th>
            <th>35</th>
            <th>36</th>
            <th>37</th>
            <th>38</th>
            <th>39</th>
            <th>40</th>
            </tr>
        </thead>
       <tbody>
       <tr>
            <td><input className="w-100 bg-white border-0 rounded" onChange={(e)=>{handleNameChange(e)}}/></td>
            <td><input className="w-50 rounded-circle bg-white border-0 " onChange={(e)=>setPlant( {...plant,size34:parseInt(e.target.value)})}/></td>
            <td><input className="w-50 rounded-circle bg-white border-0 " onChange={(e)=>setPlant( {...plant,size35:parseInt(e.target.value)})}/></td>
            <td><input className="w-50 rounded-circle bg-white border-0 " onChange={(e)=>setPlant( {...plant,size36:parseInt(e.target.value)})}/></td>
            <td><input className="w-50 rounded-circle bg-white border-0 " onChange={(e)=>setPlant( {...plant,size37:parseInt(e.target.value)})}/></td>
            <td><input className="w-50 rounded-circle bg-white border-0 " onChange={(e)=>setPlant( {...plant,size38:parseInt(e.target.value)})}/></td>
            <td><input className="w-50 rounded-circle bg-white border-0 " onChange={(e)=>setPlant( {...plant,size39:parseInt(e.target.value)})}/></td>
            <td><input className="w-50 rounded-circle bg-white border-0 " onChange={(e)=>setPlant( {...plant,size40:parseInt(e.target.value)})}/></td>
            
            
            
        </tr>
       </tbody>
        </table>
    </div>
    <div className="container d-flex justify-content-center mt-3">

    <button className="btn bg-pink" onClick={()=>actions.addPlants(plant)}>Guardar</button>
    </div>
       
    </>
}