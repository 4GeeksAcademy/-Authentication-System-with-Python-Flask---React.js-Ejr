import React, { useContext,useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Action } from "history";

export default function GetOrders(){
    
    // const [orders, setOrders] = useState(store.orders)
    const{store,actions}= useContext(Context)
    const [selectedRows, setSelectedRows] = useState([])
    
    
    const handleClickRow = (orderId)=>{
        
        // create a copy of the selectedRows array
        let updateRow = [...selectedRows]
        
        // if the index already exists in the array, remove it
        if(updateRow.includes(orderId)){
            updateRow.splice(updateRow.indexOf(orderId), 1)
        }else{
            // add the index to the array
            updateRow.push(orderId)
        }
        // set the new selectedRows state
        setSelectedRows(updateRow)
        
        // update order status on backend
        const status = updateRow.includes(orderId) ? "Terminado" : "Pendiente";
        actions.updateOrderStatus(orderId, status);
    }
    
    useEffect(() => {
        actions.getOrders()
    }, [])
    
    // useEffect(() => {
    //     actions.getOrders()
    // }, [store.orders])
    

    const filterBy =() =>{
        let newOrdersArray = store.orders
        newOrdersArray.sort((a, b) => {
            if ( Number(a.price) > Number(b.price)) {
              return -1;
            }
            if (Number(a.price) < Number(b.price)) {
              return 1;
            }
            return 0;
          });
          actions.updateOrders(newOrdersArray)
          console.log(newOrdersArray)
    }

    
    
    return<>
        <div className="table-responsive responsive-font">
            <button onClick={()=> console.log(store.orders)}> Test Fetch Test FetchTest FetchTest FetchTest FetchTest FetchTest Fetchv</button>
            <table className="table">
                <thead>
                    <tr>
                        <th> ID</th>
                        <th> Nombre del Cliente</th>
                        <th> Numero de Cliente</th>
                        <th> Tipo de Planta</th>
                        <th> Tamaño de Planta</th>
                        <th onClick={()=>filterBy()}> Precio</th>
                        <th> Master Asignado</th>
                        <th> Fecha de Entrega</th>
                        <th> Estado actual </th>
                        <th> Comentarios Adicionales</th>
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
                            <td> {order.master.name}</td>
                            <td>{new Date(order.delivery_date).toLocaleDateString('es', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                            <td> {order.status} 
                                <input type="checkbox" onClick={()=>handleClickRow(order.id)}/>
                            </td> 
                            <td> {order.description}</td>
                        </tr>)
                        })
                    }  
                </tbody>
            </table>
        </div>
 </>
}