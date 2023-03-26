import React, { useContext,useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import rigo from "../../img/rigo-baby.jpg"

export default function AddPlants(){
    const {store,actions}=useContext(Context);
    const [showMessage, setShowMessage] = useState(false)
    const [showError, setShowError] = useState(false)
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
            {...plant,name:e.target.value},
            
        )
    }
    const handleSave = () => {
        if (!plant.name) {
          alert("Por favor, inserte un nombre para la planta");
          return;
        }
      
        actions.addPlants(plant, setShowMessage, setShowError);
        setPlant({
          name: "",
          size34: 0,
          size35: 0,
          size36: 0,
          size37: 0,
          size38: 0,
          size39: 0,
          size40: 0,
        });
      };
      
        
      
    
    return<>
    <div className="simple-form">
        <h2 className="bold">Agrega un nuevo tipo de planta</h2>
            <input placeholder="Nombre de la planta" className="" onChange={(e)=>{handleNameChange(e)}} value={plant.name}/>
            <input placeholder="Talla 34" onChange={(e)=>setPlant( {...plant,size34:parseInt(e.target.value)})} value={plant.size34}/>
            <input placeholder="Talla 35" onChange={(e)=>setPlant( {...plant,size35:parseInt(e.target.value)})} value={plant.size35}/>
            <input placeholder="Talla 36" onChange={(e)=>setPlant( {...plant,size36:parseInt(e.target.value)})} value={plant.size36}/>
            <input placeholder="Talla 37" onChange={(e)=>setPlant( {...plant,size37:parseInt(e.target.value)})} value={plant.size37}/>
            <input placeholder="Talla 38" onChange={(e)=>setPlant( {...plant,size38:parseInt(e.target.value)})} value={plant.size38}/>
            <input placeholder="Talla 39" onChange={(e)=>setPlant( {...plant,size39:parseInt(e.target.value)})} value={plant.size39}/>
            <input placeholder="Talla 40" onChange={(e)=>setPlant( {...plant,size40:parseInt(e.target.value)})} value={plant.size40}/>
            <button className="btn bg-pink" onClick={()=>{handleSave()}}>Guardar</button>
            <div style={{position: "relative"}}>
                {showMessage && <div className="popover">Planta agregada a la base de datos</div>}
                {showError && <div className="popover">Ya agregaste esta planta previamente</div>}
            </div>

    </div>
     </>
}