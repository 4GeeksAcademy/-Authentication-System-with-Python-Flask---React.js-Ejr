import React, { useContext,useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import rigo from "../../img/rigo-baby.jpg"
import { Action } from "history";

export default function GetOrders(){
    
    const{store,actions}= useContext(Context)
    const [selectedRows, setSelectedRows] = useState([])

    const handleClickRow = (orderId)=>{

        // create a copy of the selectedRows array
        let updateRow = [...selectedRows]

        // if the index already exists in the array, remove it
        if(updateRow.includes(orderId)){
            updateRow.splice(updateRow.indexOf((orderId), 1))
        }else{
            // add the index to the array
            updateRow.push(orderId)
        }
        // set the new selectedRows state
        setSelectedRows(updateRow)
    }
    
    useEffect(() => {
        actions.getOrders()
    }, [])

    
    
    return<>
    <button onClick={console.log(store.orders)}> Click me</button>
        <div className="table-responsive responsive-font">
            <table className="table">
                <thead>
                    <tr>
                        <th> ID</th>
                        <th> Nombre del Cliente</th>
                        <th> Numero de Cliente</th>
                        <th> Tipo de Planta</th>
                        <th> Tamaño de Planta</th>
                        <th> Precio</th>
                        <th> Fecha de Entrega</th>
                        <th> Estado actual</th>
                    </tr>
                </thead>
                <tbody>
                    {store.orders.map((order,index)=>{
                        const rowClass = selectedRows.includes(order.id) ? "color-row" : "" ;
                        return(
                        <tr className={rowClass} key={index}>
                            <td> {order.id}</td>
                            <td> {order.customer_name}</td>
                            <td> {order.customer_number}</td>
                            <td> {order.plant_type}</td>
                            <td> {order.plant_size}</td>
                            <td> {order.price}</td>
                            <td>{new Date(order.delivery_date).toLocaleDateString('es', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                            <td> {order.status}
                                <input type="checkbox" onClick={()=>handleClickRow(order.id)}/>
                            </td>  
                        </tr>)
                        })
                    }  
                </tbody>
            </table>
        </div>
 </>
}