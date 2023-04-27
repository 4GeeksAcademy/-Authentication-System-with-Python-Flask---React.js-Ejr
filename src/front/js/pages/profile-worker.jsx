import React, { useState, useEffect } from "react";
import { getUserPrivate } from "../services";
import { useNavigate } from "react-router-dom";
import UserInfo from "../component/UserInfo.jsx";

export const Profile = props => {

  const navigate = useNavigate()


  const [data, setData] = useState({})

  async function getProfile () {
    let token = localStorage.getItem('token')
    if(token){
    const dataFromFetch = await getUserPrivate()
    setData(dataFromFetch)
    return dataFromFetch}
    navigate("/login")
  }
 
  useEffect(() => {
    const fetchData = async () => {getProfile()} ;
    fetchData();} ,[]);

  return (
 
<React.Fragment>
      <UserInfo user={data} company={data} showEditButton={true} />
    </React.Fragment>

  );


};