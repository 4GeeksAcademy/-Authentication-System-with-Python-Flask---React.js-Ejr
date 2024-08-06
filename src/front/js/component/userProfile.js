import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const Post = ({ post }) => {
  const { user } = useContext(AuthContext);

  const handleLike = async () => {
    // Lógica para manejar el like
  };

  return (
    <div className="post">
      <img src={post.image} alt="Post" />
      <p>{post.message}</p>
      <p>By: {post.author.username}</p>
      <p>Location: {post.location}</p>
      <p>Likes: {post.likes.length}</p>
      {user && <button onClick={handleLike}>Like</button>}
    </div>
  );
};

export default Post;
