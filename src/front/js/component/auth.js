import React, { useContext } from 'react';
import { Context } from '../store/appContext';


const AuthComponent = ({ children }) => {
    const { store } = useContext(Context);
  
    return <>{store.token ? children : "You need to log in to see this page's content"}</>;
  };

  export default AuthComponent;