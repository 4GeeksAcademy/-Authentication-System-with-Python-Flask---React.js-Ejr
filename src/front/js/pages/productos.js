import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/productos.css";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

export const Productos = () => {


    return (

        <div className="row imghome">
            <Navbar />

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
                    <div className="col-md-4">
                        <figure  >
                            <img src="https://images.pexels.com/photos/4871119/pexels-photo-4871119.jpeg"></img>
                            <div className="capa">
                                <h3> Portobello y Camarones</h3>
                                <p>Ingredientes</p>
                                <p>Portobello ,Pimentones Rojos, Camarones, Brotes, Especias, Crema de Lecha <br /> <p>10<strong>.500$</strong></p>
                                </p>

                                <Link to="/">

                                    <button type="button" class="btn btn-outline-dark boton">Comprar</button>
                                </Link>
                                <button type="button" class="btn btn-outline-dark m-2 corazon"> <i class="far fa-heart"></i></button>
                            </div>
                        </figure>
                    </div>


                    <div className="col-md-4">
                        <figure >
                            <img src="https://images.pexels.com/photos/3738730/pexels-photo-3738730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                            <div className="capa">
                                <h3> Hamburguesa Angus</h3>
                                <p>Ingredientes</p>
                                <p>Carne ,Lechuga , Tomate , Tocino y Queso <br /> <p>7<strong>.500$</strong></p>
                                </p>
                                <Link to="/">
                                    <button type="button" class="btn btn-outline-dark boton ">Comprar</button>
                                </Link>
                                <button type="button" class="btn btn-outline-dark m-2 corazon"> <i class="far fa-heart"></i></button>
                            </div>
                        </figure>
                    </div>
                    <div className="col-md-4">
                        <figure >
                            <img src="https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                            <div className="capa">
                                <h3> Pastas Largas</h3>
                                <p>Ingredientes</p>
                                <p>Pasta ,Pimentones Rojos, Pimentones Verdes , Calabacin , Sesamo y Aceite de mani <br /> <p>9<strong>.500$</strong></p>
                                </p>
                                <Link to="/">
                                    <button type="button" class="btn btn-outline-dark boton">Comprar</button>
                                </Link>
                                <button type="button" class="btn btn-outline-dark m-2 corazon"> <i class="far fa-heart"></i></button>
                            </div>
                        </figure>
                    </div>
                    <div className="col-md-4 cajax">
                        <figure >
                            <img src="https://images.pexels.com/photos/410648/pexels-photo-410648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                            <div className="capa">
                                <h3> Costillas BBQ</h3>
                                <p>Ingredientes</p>
                                <p>Costillar de cerdo , BBQ , Mix de especies <br /> <p>9<strong>.500$</strong></p>
                                </p>
                                <Link to="/">
                                    <button type="button" class="btn btn-outline-dark boton ">Comprar</button>
                                </Link>
                                <button type="button" class="btn btn-outline-dark m-2 corazon"> <i class="far fa-heart"></i></button>
                            </div>
                        </figure>
                    </div>
                    <div className="col-md-4 cajax">
                        <figure >
                            <img src="https://images.pexels.com/photos/7426867/pexels-photo-7426867.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                            <div className="capa">
                                <h3> Paella Mixta</h3>
                                <p>Ingredientes</p>
                                <p>Arroz , Res , Mariscos ,Tomate , Limon, Especies Mixtas ,Cilantro <br /> <p>10<strong>.500$</strong></p>
                                </p>
                                <Link to="/">
                                    <button type="button" class="btn btn-outline-dark boton ">Comprar</button>
                                </Link>
                                <button type="button" class="btn btn-outline-dark m-2 corazon"> <i class="far fa-heart"></i></button>
                            </div>
                        </figure>
                    </div>
                    <div className="col-md-4 cajax">
                        <figure >
                            <img src="https://images.pexels.com/photos/1256875/pexels-photo-1256875.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                            <div className="capa">
                                <h3> Pasta al Pesto</h3>
                                <p>Ingredientes</p>
                                <p>Pasta , albahaca , almendras o nuez , Parmesano , Aceite de oliva , Sal y Pimienta <br /> <p>13<strong>.500$</strong></p>
                                </p>
                                <Link to="/">
                                    <button type="button" class="btn btn-outline-dark  boton">Comprar</button>
                                </Link>
                                <button type="button" class="btn btn-outline-dark m-2 corazon"> <i class="far fa-heart"></i></button>
                            </div>
                        </figure>
                    </div>
                </div>
            </div>
            <Footer />
        </div>



    );
};
