import React, { useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";


export const Jumbotron = () => {
    const { store, actions } = useContext(Context);

    return (
        <div>
            <header className=" jumbotronPrincipal py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <h1 className="display-4 fw-bold">Descubre experiencias musicales inolvidables con Tickeate</h1>
                            <p className="lead">Explora una selección exclusiva de los eventos musicales más emocionantes y asegúrate de no perderte ni un solo acorde. Desde conciertos épicos hasta festivales inolvidables, tenemos tus entradas listas para que vivas la experiencia al máximo. ¡Compra hoy y prepárate para disfrutar de la magia de la música en directo como nunca antes!</p>
                            
                        </div>
                        <div className="col-lg-4 text-center">
                            <img src="https://cdn.midjourney.com/b0e208dd-bb10-4583-8528-132745647d7d/0_2.png" alt="Example" className="img-fluid rounded" />
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Jumbotron;