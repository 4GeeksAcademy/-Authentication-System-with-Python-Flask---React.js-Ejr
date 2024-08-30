import React from "react";
import "../../styles/jumbotron2.css";

const Jumbotron2 = () => {
    return (
        <div className="jumbotron2-container jumbotron-fluid">
            <div className="jumbotron2-content d-flex align-items-center justify-content-between">
                <div className="jumbotron2-text-container">
                    <h1 className="jumbotron2-title">Descubra las ventajas de utilizar Tickeate para sus eventos musicales</h1>
                    <p className="jumbotron2-lead">
                        Con Tickeate, tendrás acceso exclusivo a los eventos musicales más candentes, una interfaz fácil de usar para comprar entradas fácilmente y transacciones seguras para tu tranquilidad.
                    </p>
                    <div className="row">
                        <div className="col-6 text-center">
                            <h2 className="jumbotron2-percentage">50%</h2>
                            <p>Acceso exclusivo a los mejores eventos musicales</p>
                        </div>
                        <div className="col-6 text-center">
                            <h2 className="jumbotron2-percentage">50%</h2>
                            <p>Interfaz fácil de usar y transacciones seguras</p>
                        </div>
                    </div>
                </div>
                <div className="jumbotron2-image-container">
                    <img
                        src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="Music Event"
                        className="jumbotron2-img-fluid"
                    />
                </div>
            </div>
        </div>
    );
};

export default Jumbotron2;
