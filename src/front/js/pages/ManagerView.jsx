import React from 'react'
import { ManagerDashboard } from '../component/ManagerDashboard.jsx'
import { ManagerNavbar } from '../component/ManagerNavbar.jsx'

export const ManagerView = () => {
  return (
    <div>
        <ManagerNavbar /> 
        <ManagerDashboard />
    </div>
  )
}

