import React from "react";
import basket from "../../img/basket7.jpeg"

const Registrarse = () => {
    return (
        <div class="card">
            <div className="row">
                <div className="col-6">



                    <div id="header" class="card-body">
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <tr></tr>
                    <div id="center" className="row">
                        <div className="col">
                            <b><h2>Date:</h2></b>
                            <p>10/09/2023 08:00 PM</p>
                        </div>

                    </div>
                    <div className="row">
                        <div id="center" className="col">
                            <b><h2>Location:</h2></b>
                            <p>New York, NY, USA(MAP)</p>
                        </div>

                    </div>
                    <img src="basket7" class="card-img-top" alt="..." />
                    <div className="row">
                        <div classsName="col">
                            <b><h1>Description</h1></b>
                            <p>This event article, used for writing about and listing the events planned for the future on your website.You can edit all of this text from the Pages tab by clicking the edit button.</p>
                        </div>
                    </div>
                </div>

                <div className="col-6">
                    <table class="container">
                        <div className="title">
                            <h3>Cantidad de equipos a registrar</h3>
                        </div>
                        <div className="row">
                            <div className="col">
                                <b><h5>Evento</h5></b>

                            </div>
                            <div className="col">
                                <b><h5>Price</h5></b>

                            </div>
                            <div className="col">
                                <b><h5>Qty</h5></b>

                            </div>
                            <div className="col">
                                <b><h5>Total</h5></b>

                            </div>
                            <div className="row">
                                <div className="col">
                                    <p>Jam on it</p>
                                </div>
                                <div className="col">
                                    <p>$75</p>
                                </div>
                                <div className="col">
                                    <input type="number
                                    "></input>
                                </div>
                                <div className="col">
                                    <p>$0.00</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <b><h4>Total</h4></b>
                            </div>
                            <div className="col">
                                <b><h4>$0.00</h4></b>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <button id="click" className="btn btn-primary btn-lg m-2">REGISTRARSE</button>
                            </div>
                        </div>

                    </table>
                </div>


            </div>
        </div>

    );
}

export default Registrarse;