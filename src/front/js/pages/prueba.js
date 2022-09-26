import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";
export const Prueba = () => {
    const { store, actions } = useContext(Context);

    return (

        <div class="row imghome">
            <Navbar />
            <div class="col-sm-6">
                <div class="card-body">
                    <h1 class="card-title razones">Razones por la cual cocinar en casa es mejor</h1>
                    <ol>
                        <li> Conocer los ingredientes: cuando comemos fuera de casa, es frecuente que no conozcamos en profundidad todos los ingredientes del plato elegido. </li>
                        <li>Mayor control de las porciones: es frecuente que los comercios presenten porciones extremadamente grandes comparadas con las que deberían ser. </li>
                        <li>Ahorro de dinero: por supuesto, no podemos dejar de lado este aspecto, ya que más allá de los beneficios sobre la salud, la comida casera permite ahorrar mucho dinero</li>
                        <li>Mayor calidad de la comida: en los lugares de expendio de comidas, es frecuente que los ingredientes se compren a granel, escogiendo al mismo tiempo, productos de menor costo para abaratar precios e incrementar sus ganancias. Y si ésto no es así, el costo del plato que usted elige, suele ser muy elevado. En cambio, en su casa, usted puede elegir productos frescos, naturales y de mejor calidad, Cocinando en su hogar usted puede asegurarse de la calidad de los alimentos que consume</li>
                    </ol>
                </div>
            </div>
            <Footer />
        </div>

    );
};
