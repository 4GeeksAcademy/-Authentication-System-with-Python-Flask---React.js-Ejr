import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Register from "../component/register";
import { Link } from "react-router-dom";
import LoginModal from "./loginModal";

export const Home = () => {

    return (
        <div className="text-center mt-5" style={{margintop: "8rem", marginBottom: "0rem", paddingTop: "4rem"}}>
            <section className="container-fluid text-center" style={{height:"100%"}}>
            <div className="container-fluid text-center m-1 h-100 g-4 gap-3 p-3 fs-1 m-3 py-2">
                <div className="row m-2 fs-1 d-sm-inline-flex">
                    <div className="col-sm-3 box b color-font-ai shadow">
                        <div className="container-fluid rounded h-100 d-inline-block">
                            <div className="card bg-transparent h-100 border border-0">
                                <div className="card-body">
                                    <h5 className="card-title fs-3 text-stroke-white">Esta es nuestra IA!</h5>
                                    <h5 className="card-title fs-3 text-stroke-white">Puedes pedirle consejos de dieta y almentacion!</h5>
                                    <p className="card-text fs-6 h-75 my-5 fs-3 text-stroke-dark-thin text-light overflow-auto">Acá escribirá la IA</p>
                                </div>
                                <div className="card-footer mt-5 mx-auto fs-5 w-100 rounded">
                                    <div className="input-group d-flex align-self-end text-stroke-white-thin w-100" style={{color: "white"}}>
                                        <textarea className="bg-transparent border text-center text-white w-100 rounded text-break h-100" placeholder="Escribele algo a nuestra IA"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="row m-1 text-dark box">
                            <div className="col-12 col-sm-12 vh-25">
                            <div className="box a">
                                    <h1 className="main-title my-auto align-middle text-break">GitLoot</h1>
                                </div>
                            </div>
                        </div>
                        <div className="row m-1 vh-25">
                            <div className="col-12 col-sm-12 vh-25 box c my-2 shadow">
                                <section className="sub-section">
                                    <h2 className="sub-title pt-5 ">Acá puedes tener la comida más saludable, ademas de conveniente</h2>
                                    <h2 className="sub-title">¡En la puerta de tu casa!</h2>
                                </section>
                            </div>
                        </div>
                        <div className="row row-cols-1 row-cols-lg-2 g-2 g-lg-3 m-1 vh-25">
                            <div className="col-12 col-md-6 vh-25 box d my-2 shadow">
                            <section className="stores">
                                <Link to="/order-food">
                                    <button className="store-ads p-4 px-5 mx-auto fs-1 fw-bold mt-5 blur g-4 fs-5 text-stroke-light"
                                    style={{borderRadius:"33% 67% 32% 68% / 90% 9% 91% 10% "}}>
                                        Pedir Comida
                                    </button>
                                </Link>
                            </section>
                            </div>
                            <div className="col-12 col-md-6 vh-25 box e my-2 g-4 shadow">
                                <section className="pt-0 mt-0">
                                    <p className="store-ads blur text-stroke-white fw-bold">
                                        Nuestras tiendas tienen excelentes descuentos, le ponemos el alma para llevar los alimentos más frescos a tu hogar!
                                    </p>
                                </section>
                            </div>
                        </div>
                        <div className="row m-1 vh-25 box f my-2 shadow">
                            <div className="col-12 col-sm-12 vh-25">
                                <section className="sub-section">
                                    <h2 className="sub-title pt-4 fs-1 text-stroke-white fw-bold">Te respalda una inteligencia artificial, que te recomendará una excelente dieta semanal basada en nuestros platos disponibles!</h2>
                                </section>
                            </div>
                        </div>
                        <div className="row row-cols-1 row-cols-lg-2 g-2 g-lg-3 m-1 vh-25">
                            <div className="col-12 col-md-6 vh-25 box g my-2 gap-2 bordershadow">
                                <section className="subscription-ads blur text-stroke-white fw-bold">
                                    <p className="">Comidas super fancy, que preparamos para que lo puedas descongelar y disfrutar!</p>
                                </section>
                            </div>
                            <div className="col-12 col-md-6 vh-25 box h my-2 gap-2 border shadow">
                                <Link to="/subscription">
                                    <button 
                                        className="store-ads p-4 mx-auto fs-1 fw-bold mt-5 blur fs-5 text-stroke-dark shadow" 
                                        style={{borderRadius:"33% 67% 32% 68% / 90% 9% 91% 10% "}}>
                                        Suscripciones
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </section>
            <LoginModal />
        </div>
    );
};
