import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/productos.css";
import { Link } from "react-router-dom";
import { NavbarL } from "../component/navbarl";
import { Footer } from "../component/footer";

export const Productos2 = () => {


    return (

        <div className="row imghome">
            <NavbarL />
            <div className=" container-productos ">
                <div className="row cajas">
                    <div className="col-md-4">
                    <figure  > 
                        <img src="https://images.pexels.com/photos/1640769/pexels-photo-1640769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
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
                        <img src="https://images.pexels.com/photos/4220141/pexels-photo-4220141.jpeg"></img>
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
                        <img src="https://images.pexels.com/photos/4099236/pexels-photo-4099236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
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
                        <img src="https://images.pexels.com/photos/6327626/pexels-photo-6327626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
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
                        <img src="https://images.pexels.com/photos/6740849/pexels-photo-6740849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
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
                        <img src="https://images.pexels.com/photos/4940832/pexels-photo-4940832.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"></img>
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
