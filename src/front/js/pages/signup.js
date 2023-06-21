import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
export const Signup = () => {





    return (
        <>
            
            <form method="POST">
                <div className="container d-flex justify-content-center">
                    <div className="box mt-5 mb-5">
                        <h2 className="text-center mt-3">Únete a WhataCar</h2>
                        <form>
                            <div className="row">
                                <div className="col-6">
                                    <div className="input-box">
                                        <label htmlFor="name">Name</label>
                                        <input type="text" placeholder="Your Name" name="name"></input>
                                    </div>
                                </div>

                                <div className="col-6 ">
                                    <div className="input-box">
                                        <label htmlFor="surname">Surname</label>
                                        <input type="text" placeholder="Your Surnames" name="surname"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="input-box">
                                        <label htmlFor="name">email <FontAwesomeIcon icon={faEnvelope} /> </label>
                                        <input type="email" placeholder="Your Name" name="email"></input>
                                    </div>
                                </div>

                                <div className="col-6 ">
                                    <div className="input-box">
                                        <label htmlFor="surname">Surname</label>
                                        <input type="text" placeholder="Your Surnames" name="surname"></input>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    <div className="input-box">
                                        <label htmlFor="name">email <FontAwesomeIcon icon={faEnvelope} /> </label>
                                        <input type="email" placeholder="Your Name" name="email"></input>
                                    </div>
                                </div>

                                <div className="col-6 ">
                                    <div className="input-box">
                                        <label htmlFor="surname">Surname</label>
                                        <input type="text" placeholder="Your Surnames" name="surname"></input>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    <div className="labelbox">
                                        <label htmlFor="idDocument">Tipo de documento:</label>
                                        <select id="idDocument">
                                            <option value="DNI">DNI</option>
                                            <option value="CIF">CIF</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="col-6 ">
                                    <div className="input-box">
                                        <label htmlFor="idNumber">Número de documento:</label>
                                        <input type="text" id="idNumber" placeholder="123412312H"  />
                                    </div>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <button>Click Me!</button>
                            </div>
                        </form>

                            


                
                    </div>
                </div>
            </form>
                
            
        </>
    )
}