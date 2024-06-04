import React, { useState, useEffect } from 'react';
import styles from './Messages.module.css';

const SendMessage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [recipients, setRecipients] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch(`${process.env.BACKEND_URL}/api/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
        setFilteredUsers(data); // Initialize filtered users with all users
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    // Filter users based on search text
    const result = users.filter(user =>
      user.email.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredUsers(result);
  }, [search, users]);

  const handleCheckboxChange = (email) => {
    setRecipients(prevRecipients =>
      prevRecipients.includes(email)
        ? prevRecipients.filter(id => id !== email)
        : [...prevRecipients, email]
    );
  };

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const selectAll = () => {
    if (recipients.length === filteredUsers.length) {
      setRecipients([]);
    } else {
      setRecipients(filteredUsers.map(user => user.email));
    }
  };

  const sendMessage = async () => {
    if (recipients.length === 0 || !title.trim() || !content.trim()) {
      setMessage('All fields are required');
      return;
    }
    setIsSubmitting(true);
    const response = await fetch(`${process.env.BACKEND_URL}/api/messages/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ recipients, title, content })
    });
    const data = await response.json();
    setIsSubmitting(false);

    if (response.ok) {
      setMessage('Message sent successfully!');
      setTitle('');
      setContent('');
      setRecipients([]);
      setTimeout(() => window.location.reload(), 2000); // Recarga la página después de 2 segundos
    } else {
      setMessage(data.error || 'Failed to send message');
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.titleComponent}>Send Messages</h1>
      <button onClick={toggleModal} className={styles.button}>Select Recipients</button>
      {isModalOpen && (
        <div>
          <div className={styles.overlay} onClick={toggleModal}></div>
          <div className={styles.modal}>
            <h3 className={styles.titleComponent}>Select Recipients</h3>
            <input
              type="text"
              placeholder="Search by email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.input}
            />
            <button onClick={selectAll} className={styles.button}>
              {recipients.length === filteredUsers.length ? 'Deselect All' : 'Select All'}
            </button>
            <ul className={styles.messageList}>
              {filteredUsers.map(user => (
                <li key={user.id}>
                  <input
                    type="checkbox"
                    value={user.email}
                    onChange={() => handleCheckboxChange(user.email)}
                    checked={recipients.includes(user.email)}
                  />
                  {user.email}
                </li>
              ))}
            </ul>
            <button onClick={toggleModal} className={styles.button}>Close</button>
          </div>
        </div>
      )}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
        disabled={isSubmitting}
      />
      <textarea
        placeholder="Write your message here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.textarea}
        disabled={isSubmitting}
      />
      <button onClick={sendMessage} className={styles.button} disabled={isSubmitting}>Send</button>
      <p>{message}</p>
    </div>
  );
}

export default SendMessage;
