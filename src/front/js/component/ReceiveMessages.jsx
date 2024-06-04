import React, { useState, useEffect } from 'react';
import styles from './Messages.module.css';

const ReceiveMessages = () => {
  const [messages, setMessages] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${process.env.BACKEND_URL}/api/messages`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }
        const data = await response.json();
        const formattedMessages = data.received.map(msg => ({
          ...msg,
          // Asegúrate de añadir 'Z' para indicar que la fecha está en UTC
          send_time: new Date(msg.send_time + 'Z').toLocaleString(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false // or true if you prefer 12 hour time formats
          })
        }));
        setMessages(formattedMessages);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMessages();
  }, []);

  const openModal = (message) => {
    setSelectedMessage(message);
    setModalOpen(true);
    markAsRead(message.id);
  };

  const markAsRead = async (messageId) => {
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/messages/read`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ message_id: messageId })
      });
      if (response.ok) {
        setMessages(messages.map(msg => 
          msg.id === messageId ? { ...msg, read: true } : msg
        ));
        
      }
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    // setTimeout(() => window.location.reload(), 2000); // Recarga la página después de 2 segundos

  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.titleComponent}>Received Messages</h1>
        <span className={styles.badge}>{messages.filter(msg => !msg.read).length}</span>
      </div>
      <ul className={styles.messageList}>
        {messages.map((msg, idx) => (
          <li key={idx} onClick={() => openModal(msg)} className={msg.read ? styles.message : styles.messageUnread}>
            <p><strong>From:</strong> {msg.from}</p> 
            <p><strong>Title:</strong> {msg.title}</p> 
            <p><strong>Date:</strong> {msg.send_time}</p>
          </li>
        ))}
      </ul>
      {modalOpen && selectedMessage && (
        <div>
          <div className={styles.overlay} onClick={closeModal}></div>
          <div className={styles.modal}>
          <strong><h3>{selectedMessage.title}</h3></strong>
            <p>from: <strong>{selectedMessage.from}</strong></p> 
            <p>{selectedMessage.content}</p>
            <button onClick={closeModal} className={styles.button}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReceiveMessages;
