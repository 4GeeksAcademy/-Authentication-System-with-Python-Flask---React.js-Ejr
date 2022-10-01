import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/productos.css";
import { Link } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { NavbarL } from "../component/navbarl";

export const Prueba = () => {
  const { store, actions } = useContext(Context);
  console.log(store.comidas);
  return (
    <div class="dropdown dropdown-menu-end ">
 <a
 class="btn  dropdown-toggle"
 role="button"
 id="dropdownMenuLink"
 data-bs-toggle="dropdown"
 aria-expanded="false"
>
 <i class="fa-solid fa-2x fa-cart-shopping cart"></i>&nbsp;{" "}
 {/* Nombre del dropdown  */}
 <strong className="contador">{store.favorites.length}</strong>{" "}
 {/* se agrega el contador de favoritos */}
</a>
<div
 class="dropdown-menu dropdown-menu-lg-end"
 aria-labelledby="dropdownMenuLink"
>
 {/* Se crea un map para buscar todo lo que contiene el arreglo favorite con 2 parametros e : evento y i : identificador */}
 {store.favorites.length > 0 ? (
   store.favorites.map((e, i) => {
     return (
       <div key={i} className="dropdown-item">
         <div className="row">
           <div className="col">{e.price}</div>
           <div className="col">
             <a
               className="badge badge-danger "
               onClick={() => actions.getBorrar(i)}
             >
               {" "}
               {/* llamamos a la funcion borrar con el  identificador */}
               <i className="far fa-trash-alt"></i>
               
             </a>
           </div>
         </div>
       </div>
     );
   })
 ) : (
   <div></div>
 )}
 
</div>
</div>
  );
};
