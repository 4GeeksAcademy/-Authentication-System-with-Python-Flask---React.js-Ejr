import React, { useState } from 'react';

const Register = () => {
  const [avatar, setAvatar] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica para manejar el registro
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Avatar:
        <input type="text" value={avatar} onChange={(e) => setAvatar(e.target.value)} />
      </label>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </label>
      <label>
        Surname:
        <input type="text" value={surname} onChange={(e) => setSurname(e.target.value)} required />
      </label>
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
