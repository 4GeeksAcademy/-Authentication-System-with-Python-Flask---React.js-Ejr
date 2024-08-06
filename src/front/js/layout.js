// src/front/js/layout.js

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScrollToTop from './component/ScrollToTop';
import { BackendURL } from './component/BackendURL';

import Home from './pages/Home';
import Demo from './pages/Demo';
import Single from './pages/Single';
import injectContext from './store/appContext';

import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Login from './component/Login';
import Register from './component/Register';
import Post from './component/Post';
import CreatePost from './component/CreatePost';
import UserProfile from './component/UserProfile';

const Layout = () => {
  const basename = process.env.BASENAME || '';

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL === '') return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/single/:theid" element={<Single />} />
            <Route path="*" element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
