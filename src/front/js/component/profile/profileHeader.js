import React, { useContext, useState,useEffect } from "react";
import { useStreamContext } from 'react-activity-feed'
import { useNavigate } from 'react-router-dom'
import { Context } from "../../store/appContext";

export const ProfileHeader = () => {
    // ...
  
    return (
      <Header>
        <div className="coverHeader">
          <img src="https://picsum.photos/500/300" />
        </div>
      </Header>
    )
  }