import React, { useState, useEffect } from "react";
import { auth, db } from "../pages/fire";

const Chat = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection("messages")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <div>
      {messages.map((user, index) => {
        return (
          <div key={index}>
            {user.uid == auth.currentUser.uid ? (
              <div className="d-flex flex-row justify-content-start">
                <img src={user.imgUrl} alt="avatar 1" className="user-img" />
                <div>
                  <p className="small p-2 ms-3 mb-1 text-muted rounded-3 box-chat">
                    {user.text}
                  </p>
                  <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
                    12:00 PM | Aug 13
                  </p>
                </div>
              </div>
            ) : (
              <div className="d-flex flex-row justify-content-end">
                <div>
                  <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-primary">
                    {user.text}
                  </p>
                  <p className="small me-3 mb-3 rounded-3 text-muted">
                    12:00 PM | Aug 13
                  </p>
                </div>
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="avatar 1"
                  className="user-img"
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Chat;
