import React from "react";
import "../../styles/jumbotron2.css";

const Jumbotron2 = () => {

    return ( <div className="jumbotron jumbotron-fluid mt-4 custom-jumbotron">
        <div className="container d-flex align-items-center justify-content-between">
            <div className="text-container">
                <h1 className="display-5">Descubra las ventajas de utilizar Tickeate para sus eventos musicales</h1>
                <p className="lead">
                    Con Tickeate, tendrás acceso exclusivo a los eventos musicales más candentes, una interfaz fácil de usar para comprar entradas fácilmente y transacciones seguras para tu tranquilidad.
                </p>
                <div className="row">
                    <div className="col-6 text-center">
                        <h2 className="percentage">50%</h2>
                        <p>Acceso exclusivo a los mejores eventos musicales</p>
                    </div>
                    <div className="col-6 text-center">
                        <h2 className="percentage">50%</h2>
                        <p>Interfaz fácil de usar y transacciones seguras</p>
                    </div>
                </div>
            </div>
            <div className="image-container">
                <img
                    src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="Music Event"
                    className="img-fluid"
                />
            </div>
        </div>
    </div>

    );
 };
export default Jumbotron2;
