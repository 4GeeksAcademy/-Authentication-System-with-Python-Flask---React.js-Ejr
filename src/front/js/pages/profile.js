import React, {useEffect, useContext, useState} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


const Private = () => {
    const {store, actions} = useContext(Context);
    const navigate = useNavigate();
    const [user, setUser] = useState();

    useEffect(() => {
        function authenticate() {
            actions.authenticateUser(navigate);
        }
        setTimeout(() => {
            authenticate() }, 5000) 
             
    }, [])

    useEffect(() => {
        setUser(store.user)
    }, [store.user]);

    // useEffect(() => {
    //     actions.tokenFromStore()
    //     if(store.token)
    // }, [user.token])
    
    //We need to ask new user for: Name, Date of birth, weight, height, main health concerns, goals, workout activity level, do you want supplement suggestions, allergies/sensitivities, cravings(sugar, cigarettes, coffee) etc. 
    return (
        <div className="container text-center">
            <h1>Hello!</h1>
            {user ?
                <div >
                    <h2>Email: {store.user.email}</h2>
                </div>
                :
                <h3>user not found</h3>
                
            }
            
        </div>
        
    );
}

export default Private;