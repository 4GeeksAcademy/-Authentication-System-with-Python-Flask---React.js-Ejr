import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/productos.css";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { NavbarL } from "../component/navbarl";

export const Productos3 = () => {
    const { store, actions } = useContext(Context);
console.log(store.comidas)
    return (

        <div className="row "   >
            <img className="imglc" src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80" />
            <NavbarL />
            <div className="container iconoscaja">
                <Link to="/productos">
                    <i class="fa-solid fa-2x fa-burger icn "></i>
                </Link>
                <Link to="/productos2">
                    <i class="fa-solid fa-2x fa-leaf icn "></i>
                </Link>
                <Link to="/productos3">
                    <i class="fa-solid fa-2x fa-cookie icn"></i>
                </Link>

            </div>
            
            <div className=" container-productos ">
                <div className="row cajas">
            {store.dulces.map((e,i)=>{
                console.log(e)
                return(<div className="col-md-4" key={i}>
                <figure  >
                    <img src={e.url} ></img>
                    <div className="capa">
                        <h3> {e.name}</h3>
                        <p>Ingredientes</p>
                        <p>{e.ingredientes} <br /> <p>10<strong>.500$</strong></p>
                        </p>

                        <Link to="/">

                            <button type="button" class="btn btn-outline-dark boton">Comprar</button>
                        </Link>
                        <button onClick={()=> actions.getAddTask(e.name)} type="button" className="btn btn-outline-dark m-2 boton" > <i class="fa-solid fa-plus"></i></button>
                    </div>
                </figure>
            </div>)
                    
                    })}
                </div>
            </div>
            <Footer />
            
        </div>



    );
};
