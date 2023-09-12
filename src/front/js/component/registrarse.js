import React from "react";
import "../../styles/registrarse.css";
import basket from "../../img/basket7.jpeg"


const Registrarse = () => {
    return (
        <div id="registerWrapper" className="card container">

            <div id="registerTitle" className="row">
                <div className="col-4"></div>
                <div className="col-4">
                    <h1 >JAM ON IT</h1>
                    <div className="divider divider-default m-3"></div>
                </div>
                <div className="col-4"></div>

            </div>
            <div className="row">
                <div className="col-6">
                    <div id="header" className="card-body">
                        <p className="card-text">This event article, used for writing about and listing the events planned for the future on your website.You can edit all of this text from the Pages tab by clicking the edit button</p>
                        <hr style={{ height: "2px", width: "100%", borderWidth: "0", color: "gray", }}></hr>
                        <div id="center" className="row">

                            <div className="col">
                                <b><h2>Date:</h2></b>
                                <p>10/09/2023 08:00 PM</p>
                            </div>
                            <hr style={{ height: "2px", width: "100%", borderWidth: "0", color: "gray", }}></hr>
                        </div>
                        <div className="row">
                            <div id="center" className="col">
                                <b><h2>Location:</h2></b>
                                <p>New York, NY, USA(MAP)</p>
                            </div>
                        </div>
                        <div className="row">
                            <img id="image" src={basket} className="img-fluid" alt="Image" />
                        </div>

                        <div className="row">
                            <div classsName="col">
                                <b><h1>Description</h1></b>
                                <hr style={{ height: "2px", width: "100%", borderWidth: "0", color: "gray", }}></hr>
                                <p>This event article, used for writing about and listing the events planned for the future on your website.You can edit all of this text from the Pages tab by clicking the edit button.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="teamRegister" className="col-6">
                    <div id="registerTable" className="container">
                        <div id="registerTableTitle" className="row">
                            <h3>Cantidad de equipos a registrar</h3>
                        </div>
                        <div className="row">
                            <div className="col-3">
                                <b><h5>Evento</h5></b>

                            </div>
                            <div className="col-3">
                                <b><h5>Price</h5></b>

                            </div>
                            <div className="col-3">
                                <b><h5>Qty</h5></b>

                            </div>
                            <div className="col-3">
                                <b><h5>Total</h5></b>

                            </div>
                            <hr style={{ height: "2px", width: "100%", borderWidth: "0", color: "gray", }}></hr>
                            <div className="row">
                                <div className="col-3">
                                    <p>Jam on it</p>
                                </div>
                                <div className="col-3">
                                    <p>$75</p>
                                </div>
                                <div className="col-3">
                                <button className="button" id="minusButton">-</button>
                                 <span id="count"><button id="plusButton">0</button></span>  
                                 <button className="button" id="plusButton">+</button>

                                </div>
                                <div className="col-3">
                                    <p>$0.00</p>
                                </div>
                            </div>
                        </div>
                        <hr style={{ height: "2px", width: "100%", borderWidth: "0", color: "gray", }}></hr>
                        <div className="row">
                            <div className="col-3"></div>
                            <div className="col-3"></div>
                            <div className="col-3">
                                <b><h4>Total</h4></b>
                            </div>
                            <div className="col-3">
                                <b><h4>$0.00</h4></b>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-3"></div>
                            <div className="col-3"></div>
                            <div className="col-3"></div>
                            <div className="col-3">
                                <button className="btn btn-primary btn-md ">REGISTRARSE</button>
                            </div>
                        </div>

                    </div>
                </div>


            </div>
            
    
        </div >

    );
}

export default Registrarse;