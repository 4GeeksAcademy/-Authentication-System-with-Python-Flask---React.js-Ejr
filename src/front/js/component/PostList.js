import React, { useEffect, useContext } from 'react';
// import { AppContext } from '../../../store/appContext';
import { Context } from '../store/appContext';
import { getPosts } from '../../../services/api';
import Post from './Post';

const PostList = () => {
  const [state, setState] = useContext(Context);

  useEffect(() => {
    const fetchPosts = async () => {
      const posts = await getPosts();
      setState({ ...state, posts });
    };