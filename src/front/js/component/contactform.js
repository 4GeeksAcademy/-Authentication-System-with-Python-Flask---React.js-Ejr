import React, { useContext, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const ContactForm = (props) => {
  const { store, actions } = useContext(Context);
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const sendMessage = async () => {
    const opts = {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        email: email,
        name: name,
        phone: phone,
      }),
    };
    try {
      const resp = await fetch(
        process.env.BACKEND_URL + "/api/send-message",
        opts
      );
      if (resp.status !== 200) {
        throw new Error("Could not send message");
      }
      const data = await resp.json();
      if (data === "Success") {
        return setSent(true);
      }
    } catch (e) {
      console.error(`${e.name}: ${e.message}`);
    }
  };

  return (
    <>
      {!sent ? (
        <div className="card" style={{ width: "18rem" }}>
          <div className="card-body">
            <h5 className="card-title">Pregunta al anunciante</h5>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-100"
            ></textarea>
            <h6 className="card-subtitle my-2 text-muted">Tu email:</h6>
            <input
              className="list-group-item"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu email"
            />
            <h6 className="card-subtitle my-2 text-muted">Tu nombre:</h6>
            <input
              className="list-group-item"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Tu nombre"
            />
            <h6 className="card-subtitle my-2 text-muted">Tu teléfono:</h6>
            <input
              className="list-group-item"
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Tu teléfono"
            />
          </div>
          <a href="#" onClick={sendMessage} className="btn btn-success">
            Contactar
          </a>
        </div>
      ) : (
        <div className="card" style="width: 18rem;">
          <div className="card-body">
            <h5 className="card-title">Mensaje enviado</h5>
          </div>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      )}
    </>
  );
};
