import React from 'react';
import { useEffect, useState } from 'react';

export const AdminPage = () => {
 const [users, setUsers] = useState([]);
 const [selectedEmails, setSelectedEmails] = useState([]);

 useEffect(() => {
    fetch('/users')
      .then(response => response.json())
      .then(data => setUsers(data));
 }, []);

 const handleCheckboxChange = (email) => {
    setSelectedEmails(prevState => prevState.includes(email) ? prevState.filter(em => em !== email) : [...prevState, email]);
 };

 const handleSubmit = () => {
    Promise.all(selectedEmails.map((email) => 
      fetch('/admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })
    )).then(() => alert('Successfully promoted users to super users'));
 };

 return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Select</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.email}>
              <td><input type="checkbox" onChange={() => handleCheckboxChange(user.email)} /></td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleSubmit}>Promote Selected Users</button>
    </div>
 );
};