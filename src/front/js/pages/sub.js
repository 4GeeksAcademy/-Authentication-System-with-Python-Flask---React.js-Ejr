import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/productos.css";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { NavbarL } from "../component/navbarl";

export const Sub = () => {
    const { store, actions } = useContext(Context);
    console.log(store.comidas)
    return (

        <div className="row row-2">
            
            <NavbarL />
            <div className=" container-productos sub-body">
                <div className="row cajas">
                    {store.vipdata.map((e,i)=>{
                        return(

                    <div class="card card-sub" >
                        <h2>${e.price}/{e.name}</h2>
                        <div class="card-body">
                            
                            <p class="card-text">{e.recetas}</p>
                            <p class="card-text">{e.support}</p>
                            <p class="card-text">{e.descuento}</p>
                            <Link to="/razones">

						<button className="btn btn-secondary">Learn More</button>
					</Link>
                            <button onClick={()=> actions.getAddTask(e.name)} type="button" className="btn btn-outline-dark m-2 boton"> <i class="fa-solid fa-plus"></i></button>
                        </div>
                    </div>
                        )
                    })}

                </div>
            </div>
            <Footer />

        </div>



    );
};

