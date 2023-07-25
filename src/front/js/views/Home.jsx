import React, { useContext, useEffect , useState } from "react";
import { useNavigate } from "react-router-dom";

import { Context } from '../store/appContext.js';



const Home = () => {

	const { actions,store } = useContext(Context)
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	let navigate = useNavigate();

	useEffect(() => {
		const myToken = localStorage.getItem("myToken");
		const userLoggedIn = !!myToken;
		setIsLoggedIn(userLoggedIn);
	  }, []);
	
	  function handleLogout() {
		let isLogged = actions.logout();
		if (isLogged) {
		  localStorage.removeItem("myToken");
		  setIsLoggedIn(false)
		  navigate("/");
		}
	  }
	
	  return (
        isLoggedIn ? (

            <div className="text-center mx-auto">
				<h1> Soy home</h1>
                <button className="btn btn-danger" onClick={handleLogout}>
                    Log Out
                </button>
            </div>
        ) : (
            <>
                <h1> Soy home</h1>
            </>
        )
    );
};

export default Home;