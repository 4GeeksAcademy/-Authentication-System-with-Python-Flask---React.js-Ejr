import React, { useContext, useState ,useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { useNavigate } from "react-router-dom";


export const Private = () => {
	const { store, actions } = useContext(Context);
	const [email , setEmail] = useState("")
	const navigate = useNavigate();

	const token = localStorage.getItem("token");

	useEffect(() => {
		const gettingInfo = async () => {
            const options = {
                method: "GET",
				headers: {
				  "Content-Type": "application/json",
				  Authorization: `Bearer ${token}`,
            }
            }  
            try{
                const response = await fetch(`${process.env.BACKEND_URL}/private`,options)
				console.log("this is the response",response)
                const data =await response.json()
				console.log("this is the data", data)
                setEmail(data.email)
            } catch (error){console.log(error);}
	
			}
	
		  gettingInfo()
		  }, [])
	
		  console.log("this is the email", email);
	  return (
		<div className="text-center mt-5">
		  {token ? (
			<div>
			  <h1>U are now on your private page {email} </h1>
			  <div></div>
			</div>
		  ) : (
			// navigate("/")
			<div>
				<h1>test</h1>
			</div>	
		  )}
		</div>
	  );
	};
	
