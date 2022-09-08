import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/productos.css";
import { Link } from "react-router-dom";
import { NavbarL } from "../component/navbarl";
import { Footer } from "../component/footer";

export const Productos3 = () => {


    return (

        <div className="row imghome">
            <NavbarL />
            <div className=" container-productos ">
                <div className="row cajas">
                    <div className="col-md-4">
                    <figure  > 
                        <img src="https://images.pexels.com/photos/4871119/pexels-photo-4871119.jpeg"></img>
                        <div className="capa">
                            {<h3> Portobello y Camarones</h3>}
                            <p>Ingredientes</p>
                            <p>Portobello ,Pimentones Rojos, Camarones, Brotes, Especias, Crema de Lecha <br /> <p>10<strong>.500$</strong></p>
                            </p>

                            <Link to="/">

                                <button type="button" class="btn btn-outline-dark boton">Comprar</button>
                            </Link>
                            <button type="button" class="btn btn-outline-dark m-2"> <i class="far fa-heart"></i></button>
                        </div>
                    </figure>
                    </div>
                    
                    
                    <div className="col-md-4">
                    <figure >
                        <img src="https://images.pexels.com/photos/3738730/pexels-photo-3738730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                        <div className="capa">
                            <h3> Hamburguesa</h3>
                            <p>Ingredientes</p>
                            <p>Carne Angus ,Tomate, Salsa de ajo, Lechuga, Especias, Tocino
                            </p>
                            <b>10<strong>.500$</strong></b>
                            <Link to="/">
                                <button type="button" class="btn btn-outline-dark">Comprar</button>
                            </Link>
                            <button type="button" class="btn btn-outline-dark m-2"> <i class="far fa-heart"></i></button>
                        </div>
                    </figure>
                    </div>
                    <div className="col-md-4">
                    <figure >
                        <img src="https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                        <div className="capa">
                            <h3> Pasta Vegetal</h3>
                            <p>Ingredientes</p>
                            <p>Tomate ,Pimentones Rojos, Portobello, Sesamo, Especias, Soya
                            </p>
                            <b>10<strong>.500$</strong></b>
                            <Link to="/">
                                <button type="button" class="btn btn-outline-dark">Comprar</button>
                            </Link>
                            <button type="button" class="btn btn-outline-dark m-2"> <i class="far fa-heart"></i></button>
                        </div>
                    </figure>
                    </div>
                    <div className="col-md-4 cajax">
                    <figure >
                        <img src="https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                        <div className="capa">
                            <h3> Pasta Vegetal</h3>
                            <p>Ingredientes</p>
                            <p>Tomate ,Pimentones Rojos, Portobello, Sesamo, Especias, Soya
                            </p>
                            <b>10<strong>.500$</strong></b>
                            <Link to="/">
                                <button type="button" class="btn btn-outline-dark">Comprar</button>
                            </Link>
                            <button type="button" class="btn btn-outline-dark m-2"> <i class="far fa-heart"></i></button>
                        </div>
                    </figure>
                    </div>
                    <div className="col-md-4 cajax">
                    <figure >
                        <img src="https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                        <div className="capa">
                            <h3> Pasta Vegetal</h3>
                            <p>Ingredientes</p>
                            <p>Tomate ,Pimentones Rojos, Portobello, Sesamo, Especias, Soya
                            </p>
                            <b>10<strong>.500$</strong></b>
                            <Link to="/">
                                <button type="button" class="btn btn-outline-dark">Comprar</button>
                            </Link>
                            <button type="button" class="btn btn-outline-dark m-2"> <i class="far fa-heart"></i></button>
                        </div>
                    </figure>
                    </div>
                    <div className="col-md-4 cajax">
                    <figure >
                        <img src="https://images.pexels.com/photos/2456435/pexels-photo-2456435.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                        <div className="capa">
                            <h3> Pasta Vegetal</h3>
                            <p>Ingredientes</p>
                            <p>Tomate ,Pimentones Rojos, Portobello, Sesamo, Especias, Soya
                            </p>
                            <b>10<strong>.500$</strong></b>
                            <Link to="/">
                                <button type="button" class="btn btn-outline-dark">Comprar</button>
                            </Link>
                            <button type="button" class="btn btn-outline-dark m-2"> <i class="far fa-heart"></i></button>
                        </div>
                    </figure>
                    </div>
                </div>
            </div>
            <Footer />
        </div>



    );
};
