import React from 'react'

export const ManagerProfile = ({username,email,bio}) => {
  return (
      <div className="user-profile-container">
      <div className="user-profile">
        <h2 className="profile-title">Perfil del Manager</h2>
        <div className="profile-details">
          <p><strong>Nombre de usuario:</strong> {username}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Bio:</strong> {bio}</p>
        </div>
      </div>
    </div>
  )
};