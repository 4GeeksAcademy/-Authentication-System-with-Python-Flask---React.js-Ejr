import React from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const params= useParams();
return(
    <>
    {params.token}
    </>
)
}
export default ResetPassword;