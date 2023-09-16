import React, { useState } from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = () => {

  const [isLogged, setIsLogged] = useState(false)
  
  return (
    isLogged ? <Outlet/> : <Navigate to='/login' />
  
  )
}

export default ProtectedRoute