import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddPlants from "./addPlants";
import GetPlants from "./getPlants";
import AddOrder from "./addOrder";
import AddModels from "./addModels";
export default function Options({setComponent}) {

  return (
    <>
        <section className="options-component">
          <div>
            <h2>Pedidos</h2>
            <button onClick={()=>setComponent(<AddOrder />)} >Agregar nuevo pedido</button>
            <button>Ver pedidos pendientes</button>
            <button>Ver historial de pedidos</button>
            <h2>Plantas</h2>
            <button onClick={()=>setComponent(<AddPlants />)}>Agregar tipo de planta</button>
            <button onClick={()=>setComponent(<GetPlants />)}>Ver inventario de plantas</button>
            <button>Entregar plantas a maestro</button>
            <button>Ver movimientos de plantas</button>
            <h2>Modelos</h2>
            <button onClick={()=>{setComponent(<AddModels/>)}}>Agregar nuevo modelo</button>
            <button>Ver catálogo de clientes</button>
            <button>Ver inventario de modelos</button>
          </div>
        </section>
      
    </>
  );
}
