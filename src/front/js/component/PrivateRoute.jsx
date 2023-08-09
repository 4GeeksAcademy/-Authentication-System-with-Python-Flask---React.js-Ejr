import React, { useContext } from 'react'
import { Context } from '../store/appContext'
import { Navigate, useLocation, Outlet } from 'react-router-dom'

function PrivateRoute() {
  const { store } = useContext(Context)
  const location = useLocation()

  if (JSON.stringify(store.user) === '{}')
    return <Navigate to='/login' state={{ from: location }} />

  return <Outlet />
}

export default PrivateRoute
