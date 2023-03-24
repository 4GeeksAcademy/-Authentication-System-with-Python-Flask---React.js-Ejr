import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Options () {
    return <>
    <section className="options-component">
        <div>
            <h2>Pedidos</h2>
            <button>Agregar pedido</button>
            <button>Ver pedidos pendientes</button>
            <button>Ver historial de pedidos</button>
        </div>
    </section>
    
    </>
}