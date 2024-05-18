import React from 'react'
import { ManagerNavbar } from '../../component/Manager/ManagerNavbar.jsx'
import { ManagerDashboard } from '../../component/Manager/ManagerDashboard.jsx'

export const ManagerView = () => {
  return (
    <div>
      <ManagerNavbar />
      <ManagerDashboard />
    </div>
  )
}

