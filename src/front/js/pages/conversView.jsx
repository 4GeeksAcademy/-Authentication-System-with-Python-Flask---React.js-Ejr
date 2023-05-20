import React, { useState, useEffect } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { getMessages } from "../service/service";
import "../../styles/conversview_style.css";
import { sendMessage } from "../service/service";

export const ConversView = () => {
  const navigate = useNavigate();
  const [conversations, setConversations] = useState([]);
  const [uniqueparam, setUniqueparam] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [newMessageContent, setNewMessageContent] = useState("");
  const [selectedFarmerId, setSelectedFarmerId] = useState(0);
  const { targetName, role } = useParams();

  
  //FILTRO LAS CONVERSACIONES POR FARMER_ID
  const getUniqueConversationsByFarmer = (conversations) => {
    const conversationsByFarmer = {};

    conversations.forEach((conversation) => {
      const farmerId = conversation.farmer_id;
      if (!conversationsByFarmer[farmerId]) {
        conversationsByFarmer[farmerId] = conversation;
      }
    });

    const uniqueConversations = Object.values(conversationsByFarmer);
    return uniqueConversations;
  };




  //Manejo el envio del mensaje
  const handleChange = (event) => {
    const { value } = event.target;
    setNewMessageContent(value);
  };
  const handleSendMessage = async () => {
    const messageData = {
      farmer_id: selectedFarmerId,
      message: newMessageContent,
    };

    await sendMessage(messageData);

    await loadAllData();
    setNewMessageContent("");
  };
  //Cambio la pestaña seleccionada
  const handleTabSelect = (index) => {
    setSelectedTab(index);
    setSelectedFarmerId(uniqueparam[index].farmer_id);
  };
  //Cojo solo un el nombre de la persona de todos los mensajes
  const getConversations = async () => {
    const data = await getMessages();
    const uniqueConversations = getUniqueConversationsByFarmer(data);
    setUniqueparam(uniqueConversations);
  };
  //Cojo todas las conversaciones
  const getMessage = async () => {
    const data = await getMessages();
    setConversations(data);
    return setConversations;
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const loadAllData = async () => {
    await getConversations();
    await getMessage();
  };

  useEffect(() => {
    loadAllData();
  }, []);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-content">
          <h2 className="logo">LOGO</h2>
          <div className="navbar-right">
            <a className="navbar-link" href="#conversations">
              Mis conversaciones
            </a>
            <div className="dropdown">
              <span className="user-label">Nombre de usuario</span>
              <button
                className="btn dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="user fa-solid fa-user"></i>
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Ajustes
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Ir al perfil
                  </a>
                </li>
                <li>
                  <button className="dropdown-item" onClick={logOut}>
                    Salir
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {/* CONVERSATIONS */}
      <div className="convers-conta">
        <div className="tabs-container">
          {uniqueparam.length > 0 ? (
            uniqueparam.map((todo, index) => (
              <div
                className="tab-name"
                key={index}
                onClick={() => handleTabSelect(index)}
              >
                {todo.name}
              </div>
            ))
          ) : (
            <h1>No hay conversaciones todavía</h1>
          )}
        </div>
        {uniqueparam.length > 0 &&
          selectedTab >= 0 &&
          selectedTab < uniqueparam.length && (
            <div className="convers-container">
              {conversations ? (
                conversations.map(
                  (message, index) =>
                    message.name === uniqueparam[selectedTab].name && (
                      <div className="" key={index}>
                        {message.sender_id === 1 ? (
                          // Renderizar mensajes para el técnico

                          <div className="technician-message">
                            <div className="conver-name">{message.name}</div>
                            <div className="conver-message">
                              {message.message}
                            </div>
                            <div className="conver-date">{message.date}</div>
                          </div>
                        ) : (
                          // Renderizar mensajes para el agricultor
                          <div className="farmer-message">
                            <div className="conver-name">{message.name}</div>
                            <div className="conver-message">
                              {message.message}
                            </div>
                            <div className="conver-date">{message.date}</div>
                          </div>
                        )}
                      </div>
                    )
                )
              ) : (
                <h1>No hay conversaciones todavía</h1>
              )}
            </div>
          )}
        <div className="send-input">
          <input
            type="text"
            value={newMessageContent}
            onChange={handleChange}
            placeholder="Escribe tu mensaje..."
          />
          <button onClick={handleSendMessage}>Enviar</button>
        </div>
      </div>
    </div>
  );
};

export default ConversView;
