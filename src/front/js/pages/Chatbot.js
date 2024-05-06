import React, { useState } from "react"; 
import { Link } from "react-router-dom";

const Chatbot = () => {
    const respuestas = {
        "How do I register?": "To register, go to the registration page and fill out the form with your information.",
        "How do I log in?": "To log in, go to the login page and enter your mail and password.",
        "How do I hide a treasure?": "To hide a treasure, go to the 'Hide Treasure' page and complete the form with the information.",
        "How do I find a treasure?": "To find a treasure, go to the 'Treasures List', click 'Details' and use the map to locate it.",
        "How do points/status work?": "Go to 'Status & Score'"
    };

    const preguntasComunes = Object.keys(respuestas); 
    const preguntaInicial = "How can I help you?"; 

    const [preguntaSeleccionada, setPreguntaSeleccionada] = useState(preguntaInicial);
    const [mostrarRespuesta, setMostrarRespuesta] = useState(false);
    const [mostrarAyuda, setMostrarAyuda] = useState(false);

    const handleQuestionSelect = (event) => {
        const selectedQuestion = event.target.value;
        setPreguntaSeleccionada(selectedQuestion);
        setMostrarRespuesta(true); 
        setMostrarAyuda(true);
    };

    const handleYesClick = () => {
        setMostrarRespuesta(false);
        setMostrarAyuda(false);
        document.getElementById("chatbot").classList.remove("show");
    };

    const handleNoClick = () => {
    };

    return (
        <div id="chatbot" className="show">
            <div className="chat-message chat-message-response">{preguntaSeleccionada}</div>
            {mostrarRespuesta && (
                <div className="chat-message chat-message-user">
                    {preguntaSeleccionada === "How do points/status work?" ? (
                        <Link to="/status">{respuestas[preguntaSeleccionada]}</Link>
                    ) : (
                        respuestas[preguntaSeleccionada]
                    )}
                </div>
            )}
            {mostrarAyuda && (
                <div className="chat-message chat-message-response">
                    Has it been helpful?
                    <button className="boton-chat" onClick={handleYesClick}>Yes</button>
                    <Link to="/contact"><button className="boton-chat" onClick={handleNoClick}>No</button></Link>
                </div>
            )}
            <div>
                <select onChange={handleQuestionSelect}>
                    {preguntasComunes.map((pregunta, index) => (
                        <option key={index} value={pregunta}>{pregunta}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Chatbot;
