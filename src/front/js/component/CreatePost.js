// src/components/CreatePost.js

import React, { useState, useContext } from 'react';
//import { createPost } from '../services/api';
import { AuthContext } from '../../../contexts/AuthContext';

const CreatePost = () => {
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('');
  const { authTokens } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.BACKEND_URL}/api/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens}`
      },
      body: JSON.stringify({ image, message, location, status })
    });
    if (response.ok) {
      // Manejar la respuesta exitosa
      console.log('Post created successfully');
    } else {
      // Manejar errores
      console.error('Failed to create post');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Image URL:</label>
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </div>
      <div>
        <label>Message:</label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      <div>
        <label>Location:</label>
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <div>
        <label>Status:</label>
        <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
