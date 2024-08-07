// src/components/Post.js

import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';


const Post = ({ post }) => {
  const { authTokens } = useContext(AuthContext);

  const handleLike = async () => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/posts/${post.id}/like`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authTokens}`
      }
    });
    if (response.ok) {
      // Manejar la respuesta exitosa
      console.log('Post liked successfully');
    } else {
      // Manejar errores
      console.error('Failed to like post');
    }
  };

  return (
    <div>
      <img src={post.image} alt="Post" />
      <p>{post.message}</p>
      <p>Location: {post.location}</p>
      <p>Status: {post.status}</p>
      <button onClick={handleLike}>Like</button>
    </div>
  );
};

export default Post;
