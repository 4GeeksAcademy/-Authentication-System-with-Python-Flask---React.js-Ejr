import React from 'react';
import './styles/main.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PostList from './components/PostList';
import CreatePost from './components/CreatePost';
import UserProfile from './components/UserProfile';
import AuthProvider from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/posts" component={PostList} />
          <Route path="/create" component={CreatePost} />
          <Route path="/profile" component={UserProfile} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
