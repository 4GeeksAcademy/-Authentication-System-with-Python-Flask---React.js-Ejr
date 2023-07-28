import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../component/Navbar.jsx'

import { Context } from '../store/appContext.js'

const Admin = () => {
  const { actions, store } = useContext(Context)
  let navigate = useNavigate()

  const handleLogin = () => {
    navigate('/login')
  }

  return (
    <div>
      <Navbar />
      {store.token && store.user.isAdmin ? (
        <h1> Soy Admin</h1>
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

export default Admin
