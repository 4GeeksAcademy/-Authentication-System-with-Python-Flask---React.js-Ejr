import React, { useState } from "react";
import firebase from "firebase/compat/app";
import { db, auth } from "../pages/fire";
import { useAuthState } from "react-firebase-hooks/auth";

const SendMessage = () => {
  const [user] = useAuthState(auth);
  const [msg, setMsg] = useState("");

  async function sendMessage(e) {
    e.preventDefault();

    const uid = auth.currentUser.uid;
    const imgUrl = auth.currentUser.photoURL;

    await db.collection("messages").add({
      text: msg,
      uid,
      imgUrl,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMsg("");
  }

  return (
    <form
      className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2"
      onSubmit={sendMessage}
    >
      <img
        src={
          user
            ? user.photoURL
            : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
        }
        className="user-img"
      />
      <input
        type="text"
        className="form-control form-control-lg"
        placeholder="mensaje..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      />
      <a className="ms-1 text-muted" href="#!">
        <i className="fas fa-paperclip"></i>
      </a>
      <a className="ms-3 text-muted" href="#!">
        <i className="fas fa-smile"></i>
      </a>
      <button className="btn ms-3" type="submit">
        <i className="fas fa-paper-plane"></i>
      </button>
    </form>
  );
};

export default SendMessage;
