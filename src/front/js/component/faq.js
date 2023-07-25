import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { ThemeContext } from "../layout";
import "../../styles/index.css";
import { Link } from "react-router-dom";

export const Faq = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="container my-4">
      <h2 className="text-center">FAQ</h2>

      <div
        className="accordion accordion-flush my-4 container mx-auto w-75"
        id="accordionFlushExample"
      >
        <div className="accordion-item">
          <h3 className="accordion-header text-center">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              ¿Qué debo hacer si quiero solicitar una revisión del vehículo antes de comprarlo en Watacar?
            </button>
          </h3>
          <div
            id="flush-collapseOne"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body text-start">
              Para solicitar una revisión del vehículo antes de comprarlo en Watacar, debes contactar directamente a uno de los talleres asociados que ofrecen este servicio. Puedes encontrar la lista de talleres disponibles en la plataforma y elegir el que prefieras. Comunícate con el taller por teléfono o correo electrónico y explícales que deseas una revisión del vehículo antes de finalizar la compra. El taller coordinará contigo una cita para realizar la inspección y certificar el estado del vehículo.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h3 className="accordion-header text-center">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              ¿Cuál es el costo asociado con la revisión del vehículo por parte de un taller en Watacar?
            </button>
          </h3>
          <div
            id="flush-collapseTwo"
            className="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body text-start">
              El costo de la revisión del vehículo por parte del taller en Watacar puede variar según el taller que elijas y los servicios que incluya la inspección. Es importante que consultes directamente con el taller sobre los detalles del costo antes de programar la revisión. Algunos talleres pueden ofrecer esta revisión de forma gratuita, mientras que otros pueden aplicar una tarifa por el servicio.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h3 className="accordion-header text-center">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              ¿Cómo puedo estar seguro de que el taller que realiza la revisión es confiable y proporcionará una evaluación precisa?
            </button>
          </h3>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse buttonAcordion"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body text-start">
              En Watacar, nos preocupamos por la calidad y confiabilidad de los talleres asociados. Antes de incluir un taller en nuestra plataforma, realizamos una evaluación exhaustiva para asegurarnos de que cumplan con los estándares de calidad. Además, nuestros usuarios tienen la opción de dejar reseñas y comentarios sobre su experiencia con el taller, lo que te brinda una idea de la reputación y la calidad del servicio. Siempre recomendamos leer las opiniones de otros usuarios antes de elegir un taller para la revisión.
            </div>
          </div>
        </div>


        <div className="accordion-item">
          <h3 className="accordion-header text-center">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              ¿Puedo programar una revisión del vehículo en un taller antes de seleccionar un vehículo específico en Watacar?
            </button>
          </h3>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse buttonAcordion"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body text-start">
            Sí, es posible programar una revisión del vehículo en un taller antes de seleccionar un vehículo específico en Watacar. Puedes ponerte en contacto con el taller de tu elección y programar la revisión antes de realizar la compra del vehículo. Esta opción te permite asegurarte de que el vehículo que estás considerando cumple con tus expectativas y requisitos antes de tomar una decisión final.
            </div>
          </div>
        </div>






        <div className="accordion-item">
          <h3 className="accordion-header text-center">
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
             ¿El resultado de la revisión del vehículo afecta mi proceso de compra en Watacar?
            </button>
          </h3>
          <div
            id="flush-collapseThree"
            className="accordion-collapse collapse buttonAcordion"
            data-bs-parent="#accordionFlushExample"
          >
            <div className="accordion-body text-start">
            Sí, el resultado de la revisión del vehículo puede afectar tu proceso de compra en Watacar. Si el taller certifica que el vehículo se encuentra en buenas condiciones y cumple con tus expectativas, puedes proceder con confianza a completar la compra. Por otro lado, si la revisión revela problemas importantes con el vehículo, puedes reconsiderar tu decisión de compra o negociar con el vendedor para resolver los problemas antes de finalizar la transacción. La revisión del vehículo te proporciona información valiosa para tomar una decisión informada y segura en Watacar.
            </div>
          </div>
        </div>




      </div>
    </div>
  );
};
