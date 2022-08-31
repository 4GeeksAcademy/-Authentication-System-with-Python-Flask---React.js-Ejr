import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext";

export const Message = () => {
  // const messages = [
  //   {
  //     body: "Hola, esto es una prueba.",
  //     id: 3,
  //     inmueble_id: 1,
  //     recipient_id: 15,
  //     sender_email: "test@test.com",
  //     sender_name: "Pedro",
  //     sender_phone: 665955885,
  //   },
  //   {
  //     body: "Segundo Mensaje, prueba numero 2.",
  //     id: 4,
  //     inmueble_id: 1,
  //     recipient_id: 15,
  //     sender_email: "test2@test.com",
  //     sender_name: "Paco",
  //     sender_phone: 555555444,
  //   },
  //   {
  //     body: "Este es el tercer mensaje.",
  //     id: 5,
  //     inmueble_id: 1,
  //     recipient_id: 15,
  //     sender_email: "test3@test.com",
  //     sender_name: "Fanny",
  //     sender_phone: 111222333,
  //   },
  // ];
  const { store, actions } = useContext(Context);
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    actions.getMessages();
    const localMessages = localStorage.getItem("messages");
    setMessages(JSON.parse(localMessages));
    console.log(messages);
  }, []);

  return (
    <>
      {localStorage.getItem("messages") ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "90vh" }}
        >
          <div
            style={{
              background: "lightgreen",
              height: "60%",
              width: "60%",
              overflowX: "hidden",
              overflowY: "auto",
              textAlign: "center",
            }}
          >
            {messages.map((message) => (
              <div
                className="card text-bg-dark mb-3"
                style={{ maxWidth: "100%" }}
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
            ))}
          </div>
        </div>
      ) : (
        <h1> Loading ...</h1>
      )}
    </>
  );
};
