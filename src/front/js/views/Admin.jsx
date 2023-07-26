import React, { useContext, useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from '../store/appContext.js';

const Admin = () => {

    const { actions,store } = useContext(Context)
	const [isLoggedIn, setIsLoggedIn] = useState(false);
    let navigate = useNavigate();


	useEffect(() => {
        const myToken = localStorage.getItem("myToken");
        setIsLoggedIn(!!myToken);
      }, []);
      const handleLogin = () => {
        navigate('/login');
      };
	
      return (
        <div>
            {store.user.isAdmin ? (
                <h1> Soy Admin</h1>
            ) : (
                <>
                <h2>No puedes entrar</h2>
                <button className="btn btn-success" onClick={handleLogin}>
                    Login
                </button>
                </>
            )}
        </div>
    );
};

export default Admin;