import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/productos.css";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
import { NavbarL } from "../component/navbarl";

export const Productos = () => {
    const { store, actions } = useContext(Context);

    return (

        <div className="row row-2">
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

                    <i class="fa-solid fa-2x fa-cheese icn"></i>
                </Link>

            </div>

            <div className=" container-productos ">
                <div className="row cajas">
                    {store.comidas.map((e, i) => {

                        return (<div className="col-md-4" key={i}>
                            <figure  >
                                <img src={e.url} ></img>
                                <div className="capa" onClick={() => {
                                    Swal.fire({
                                        title: 'Receta',
                                        text: 'Modal with a custom image.',
                                        imageUrl: e.url,
                                        imageWidth: 400,
                                        imageHeight: 200,
                                        imageAlt: 'style="border-radius: 20px;"',
                                        html:
                                            `
                                     
                                        <div style="display: flex;
                                        justify-content: space-around;">
                                        <strong>Porcion</strong>
                                        <div style="background: gray;
                                        color: white;
                                        border-radius: 14px;
                                        width: 60px;
                                        height: 22px;
                                        padding-top: 2px;
                                        text-align: center;">${e.porcion}
                                         </div>
                                         <strong>Dificultad</strong>
                                        <div style="background: gray;
                                        color: white;
                                        border-radius: 14px;
                                        width: 61px;
                                        height: 22px;
                                        padding-top: 2px;
                                        text-align: center;">${e.dificultad}
                                         </div>
                                         <strong>Tiempo</strong>
                                         <div style="background: gray;
                                        color: white;
                                        border-radius: 14px;
                                        width: 60px;
                                        height: 22px;
                                        padding-top: 2px;
                                        text-align: center;">  ${e.tiempo}
                                         </div>
                                        
                                        </div>
                                        
                                         <div>
                                         <h2 style="margin: 31px;
                                         font-size: revert;
                                         font-family: none;">${e.name}</h2>
                                         <p>${e.calorias}</p>
                                         <p>${e.ingredientes}</p>
                                         <p>${e.tiempo}</p>
                                         
                                         
                                         
                                        
                                         </div>
                                        
                                            `
                                    })
                                }}>
                                    <h3 className="text-comida"> {e.name}</h3>




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

