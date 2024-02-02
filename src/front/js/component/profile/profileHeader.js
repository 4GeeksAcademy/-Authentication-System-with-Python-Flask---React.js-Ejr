/*import React, { useContext, useState,useEffect } from "react";
import { useStreamContext } from 'react-activity-feed'
import { useNavigate } from 'react-router-dom'
import { Context } from "../../store/appContext";

export const ProfileHeader = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  
  useEffect(() => {

    const userId = "123"; // reemplazar por el token

    // Fetch user data by ID
    actions.getUserById(userId);

  }, []);

  const user = store.users.length > 0 ? store.users[0] : {};

    return (
      <div>
        <div className="coverHeader">
          <img src="https://picsum.photos/500/300" />
          
        </div>
        <div className="topBio">
        <div className="image">
          {' '}
          <img src={user.data?.image} alt="" />
        </div>
      </div>
      </div>
    )
  }*/