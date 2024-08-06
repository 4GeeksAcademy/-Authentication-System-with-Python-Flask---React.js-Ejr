// src/components/PostList.js

import React, { useEffect, useContext } from 'react';
import { AppContext } from '../../../store/appContext';
import { getPosts } from '../../../services/api';
import Post from './Post';

const PostList = () => {
  const [state, setState] = useContext(AppContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setState({ ...state, posts });
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {state.posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
