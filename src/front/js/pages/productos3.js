import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/productos.css";
import { Link } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

export const Productos3 = () => {


    return (

        <div className="row ">
            <img className="imglc" src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80" />
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
                            <img src="https://images.pexels.com/photos/45202/brownie-dessert-cake-sweet-45202.jpeg?auto=compress&cs=tinysrgb&w=1600"></img>
                            <div className="capa">
                                <h3> Torta Negra</h3>
                                <p>Ingredientes</p>
                                <p>Harina , Chocolate , Azucar  <br /> <p>10<strong>.500$</strong></p>
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
                            <img src="https://images.pexels.com/photos/1132558/pexels-photo-1132558.jpeg?auto=compress&cs=tinysrgb&w=1600"></img>
                            <div className="capa">
                                <h3> Fresas A la Crema</h3>
                                <p>Ingredientes</p>
                                <p>Fresas , Crema Batida y Azucar<br /> <p>10<strong>.500$</strong></p>
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
                            <img src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1600"></img>
                            <div className="capa">
                                <h3> Waffles</h3>
                                <p>Ingredientes</p>
                                <p>Harina de Waffles , Mix de Frutas , Dulce de Leche y Hierba buena<br /> <p>10<strong>.500$</strong></p>
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
                            <img src="https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1600"></img>
                            <div className="capa">
                                <h3>Torta de Frutos Rojos</h3>
                                <p>Ingredientes</p>
                                <p>Frutos Rojos , Harina , Azucar , Huevos <br /> <p>10<strong>.500$</strong></p>
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
                            <img src="https://images.pexels.com/photos/263070/pexels-photo-263070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                            <div className="capa">
                                <h3> Rolls de Canela</h3>
                                <p>Ingredientes</p>
                                <p>Harina , Canela , Azucar Morena , Mantequilla<br /> <p>10<strong>.500$</strong></p>
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
                            <img src="https://images.pexels.com/photos/1775045/pexels-photo-1775045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
                            <div className="capa">
                                <h3> Bolitas de Coco</h3>
                                <p>Ingredientes</p>
                                <p>Coco , Harina , Dulce de Leche <br /> <p>10<strong>.500$</strong></p>
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
