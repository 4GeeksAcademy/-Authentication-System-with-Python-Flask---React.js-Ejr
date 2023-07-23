import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { ThemeContext } from "../layout";
import "../../styles/index.css";
import { Link } from "react-router-dom";

export const Faq = () => {
    const {store, actions} = useContext(Context)
    return (
    <div className="container faqContainer my-4 col-lg-6 col-md-8">
        <h2>
            FAQ
        </h2>

        <div className="accordion accordion-flush my-4" id="accordionFlushExample">
        <div className="accordion-item">
            <h3 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                    ¿Cómo resuelvo la pregunta 1?
                </button>
            </h3>
            <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body text-start">
                    No es fácil responder a la pregunta si no se ha llegado a formular. Esto es bastante habitual y causa frustración.
                </div>
            </div>
        </div>
        <div className="accordion-item">
            <h3 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                    ¿Cómo resuelvo la pregunta 2?
                </button>
            </h3>
            <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body text-start">
                    No es fácil responder a la pregunta si no se ha llegado a formular. Esto es bastante habitual y causa frustración.
                </div>
            </div>
        </div>
        <div className="accordion-item">
            <h3 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                    ¿Cómo resuelvo la pregunta 3?
                </button>
            </h3>
            <div id="flush-collapseThree" className="accordion-collapse collapse buttonAcordion" data-bs-parent="#accordionFlushExample">
                <div className="accordion-body text-start">
                    No es fácil responder a la pregunta si no se ha llegado a formular. Esto es bastante habitual y causa frustración.
                </div>
            </div>
        </div>

    </div>

    </div>
)

}