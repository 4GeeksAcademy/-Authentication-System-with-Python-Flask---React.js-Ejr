import React, { useEffect, useState } from 'react'
import { EventInfoBox } from '../component/eventInfoBox';
import { useNavigate } from 'react-router-dom'
import { TimeCounter } from '../component/timeCounter';
import { UserInsertData } from '../component/userInsertData';
import { UserLevelConnectLink} from '../component/userLevelConectLink';

export const Userdata = () => {  

  const [userToken, setUserToken] = useState("");
  const navigate = useNavigate();

  useEffect (() => {
      const userToken = localStorage.getItem("userToken");
      if(!userToken){
          navigate("/login");
          return;
      }
      setUserToken(userToken)
      
  })

  const logout = async () => {
    localStorage.removeItem("userToken");
    window.location.reload(true);
  };

  return (
    <>
    <div className="text-center mt-5">
      {userToken && <p>User loged in!</p>}
      <UserLevelConnectLink />
      <TimeCounter /> 
      <UserInsertData />
      <button onClick={logout}>Logout</button>
      <EventInfoBox />
    </div>
    </>
    
  )
}