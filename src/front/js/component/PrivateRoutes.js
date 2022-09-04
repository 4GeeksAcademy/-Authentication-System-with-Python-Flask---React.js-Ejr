import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../store/appContext';
import { useNavigate } from 'react-router-dom';

const PrivateRoutes = () => {

  const { store, actions } = useContext(Context);
  const [data, setData] = useState(' ');
  const navigate = useNavigate();

  const protectedData = async () => {
    // retrieve token form localStorage
    const token = sessionStorage.getItem('token');
    const response = await fetch(process.env.BACKEND_URL + '/api/protected', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    });
    if (!response.ok) throw Error('There was a problem in the login request');
    const responseJson = await response.json();
    setData(responseJson);
  };

  useEffect(() => {
    if (store.token === null) navigate('/login');
    else protectedData();
  }, []);

  return (

    <div className='text-center mt-5'>
      <h1 className='text-danger'>HI! YOUR PROTECTED DATA HERE</h1>
    </div>

  );
};

export default PrivateRoutes;

