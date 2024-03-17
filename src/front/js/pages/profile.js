import React, {useEffect, useContext} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


const Private = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        function authenticate() {
            actions.authenticateUser(navigate);
        }
        setTimeout(() => {
            authenticate() }, 5000) 
             
    }, [])

    // useEffect(() => {
    //     actions.tokenFromStore()
    //     if(store.token)
    // }, [user.token])
    
    //We need to ask new user for: Name, Date of birth, weight, height, main health concerns, goals, workout activity level, do you want supplement suggestions, allergies/sensitivities, cravings(sugar, cigarettes, coffee) etc. 
    return (
        <div className="container text-center">
            <h1>Hello!</h1>
            {store.user ?
                <div >
                    <h2>Email: {store.user.email}</h2>
                </div>
                :
                // navigate("/login")
                <h1>user not found</h1>
            }
        </div>
        
    );
}

export default Private;