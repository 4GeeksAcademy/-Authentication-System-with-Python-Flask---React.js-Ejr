import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from "../component/Navbar.jsx";


import { Context } from '../store/appContext.js';

const Settings = () => {
  const { actions,store } = useContext(Context)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  let navigate = useNavigate()

  useEffect(() => {
	  const myToken = localStorage.getItem('myToken')
	  setIsLoggedIn(!!myToken)
	  store.token && setIsLoggedIn(true)
	}, [])
  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <div>      <Navbar />

      {isLoggedIn ? (
        <h1> Soy Settings</h1>
      ) : (
        <>
          <h2>No puedes entrar</h2>
          <button className='btn btn-success' onClick={handleLogin}>
            Login
          </button>
        </>
      )}
    </div>
  )
}

export default Settings;