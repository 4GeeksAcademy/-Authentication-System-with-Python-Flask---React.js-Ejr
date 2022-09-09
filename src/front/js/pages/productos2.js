import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/productos.css";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

export const Productos2 = () => {


    return (

        <div className="row imghome">
            <Navbar/>
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
                            <img src="https://images.pexels.com/photos/1640769/pexels-photo-1640769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                            <div className="capa">
                                <h3> Arroz Engranado</h3>
                                <p>Ingredientes</p>
                                <p>Arroz blanco, Porotos Rojos, Garbanzo , Palta , Limon y Mix de Especies <br /> <p>10<strong>.500$</strong></p>
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
                            <img src="https://images.pexels.com/photos/4220141/pexels-photo-4220141.jpeg"></img>
                            <div className="capa">
                                <h3> Cereal con Frutas</h3>
                                <p>Ingredientes</p>
                                <p>Mix de frutos rojos , Leche , Almendras , Mani y Bananas <br /> <p>10<strong>.500$</strong></p>
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
                            <img src="https://images.pexels.com/photos/4099236/pexels-photo-4099236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                            <div className="capa">
                                <h3> Cereal de Yogurt Rojo</h3>
                                <p>Ingredientes</p>
                                <p>Frutos Rojos , Chia , Mani , Yogurt , Flores Comestibles y Grosellas <br /> <p>10<strong>.500$</strong></p>
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
                            <img src="https://images.pexels.com/photos/6327626/pexels-photo-6327626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                            <div className="capa">
                            <h3> Pasta de Espinaca</h3>
                                <p>Ingredientes</p>
                                <p>Pasta Artesanal de Espinaca , Semillas de girasol , Sesamo
                                     y Tomate <br /> <p>11<strong>.500$</strong></p>
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
                            <img src="https://images.pexels.com/photos/6740849/pexels-photo-6740849.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                            <div className="capa">
                            <h3> PokeBowl de Falafel</h3>
                                <p>Ingredientes</p>
                                <p>Falafel , Quinua , Pure de Zapallo , Mix de Hojas Verdes , Jugo de Maracuya <br /> <p>15<strong>.500$</strong></p>
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
                            <img src="https://images.pexels.com/photos/7172068/pexels-photo-7172068.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                            <div className="capa">
                                <h3> Pizza Espinaca y Piña</h3>
                                <p>Ingredientes</p>
                                <p>Pizza Artesanal Vegana , Hojas de Espinaca , Piña , Salsa Pomodoro , Queso Vegano <br /> <p>13<strong>.500$</strong></p>
                                </p>
                                <Link to="/">
                                    <button type="button" class="btn btn-outline-dark boton">Comprar</button>
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
