import React, { useEffect, useContext, useState } from "react";
import { Context } from "../../store/appContext";
import "../../../styles/messages.css";

export const Message = () => {
  const { store, actions } = useContext(Context);
  const [messages, setMessages] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      await actions.getMessages();
      setMessages(JSON.parse(localStorage.getItem("messages")));
      setIsLoading(false);
    };
    fetchMessages();
  }, []);

  return (
    <>
      {!isloading ? (
        <div
          className="caja-mensajes d-flex justify-content-center col-md-12 mb-5"
          style={{ height: "60vh", width: "60vw", overflowY: "auto" }}
        >
          <div className="container col-md-12 rounded-3 px-0 mt-0 pb-3 text-center">
            {messages ? (
              messages.map((message, i) => (
                <div
                  className="card text-bg-dark mb-3"
                  style={{ maxWidth: "100%" }}
                  key={i}
                >
                  <div className="card-header">{message.sender_name}</div>
                  <div className="card-body">
                    <h5 className="card-title">{message.sender_email}</h5>
                    <h5 className="card-title text-muted">
                      {message.sender_phone}
                    </h5>
                    <p className="card-text">{message.body}</p>
                  </div>
                </div>
              ))
            ) : (
              <div
                className="card text-bg-dark mb-3"
                style={{ maxWidth: "100%" }}
              >
                <div className="card-body">
                  <h5 className="card-title">No tienes mensajes aún...</h5>
                  <p className="card-text">
                    Quieres darle mayor visibilidad a tu anuncio?
                  </p>
                  <a href="#" className="btn btn-primary">
                    Saber más
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ height: "90vh", width: "70vw" }}
        >
          <h5>Loading...</h5>
        </div>
      )}
    </>
  );
};
