import React, { useState, useContext } from 'react';
import { createPost } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

const CreatePost = () => {
  const [image, setImage] = useState('');
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      image,
      message,
      location,
      author: user,
      created_at: new Date(),
      status: 'published',
    };
    await createPost(newPost);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Image URL:
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
      </label>
      <label>
        Message:
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
      </label>
      <label>
        Location:
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
      </label>
      <button type="submit">Create Post</button>
    </form>
  );
};

export default CreatePost;
