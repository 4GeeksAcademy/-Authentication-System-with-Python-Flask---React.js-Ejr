import { Navigate, Outlet } from "react-router-dom";
import React from "react";

const PrivateRoutes = () => {
     
      return(
        sessionStorage.getItem("token")? <Outlet/> : <Navigate to="/login"/>

      )  

  
};

export default PrivateRoutes;
