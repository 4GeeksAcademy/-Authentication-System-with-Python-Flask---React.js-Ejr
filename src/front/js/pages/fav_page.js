import { Context } from "../store/appContext";
import React, { useContext, useEffect ,useState } from "react";
import "../../styles/index.css";
import { useNavigate } from "react-router-dom";
<script src="https://kit.fontawesome.com/88f1c4c286.js" crossorigin="anonymous"></script>

// need a function in order to return  
export const Fav_page = () => {
	const { store, actions } = useContext(Context);
    const [favorites , setFavorites] = useState("")
	const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
		const gettingInfo = async () => {
			const response = await fetch(
			  "https://bobo305-verbose-pancake-7v7wxqvx677hr5v4-3001.preview.app.github.dev/api/favorites",
			  {
				method: "POST",
				headers: {
				  "Content-Type": "application/json",
				  Authorization: `Bearer ${token}`,
				},
			  }
			);

            const data = await response.json();
			setFavorites(data.favorites)
			console.log(data.favorites, "This is the favorites list ")
		  };

		  gettingInfo()
		  }, [])


    

    return (
        
        
        <div class="flexbox">
            {/* <label for="site-search">Search for destination:</label>
            <input type="search" value = {favorites} placeholder="detinations search"/>
			<i onClick={ () =>  ?"fa-regular fas fa-heart fa-lg card-heart": " fa-regular far fa-heart fa-lg card-heart"} />

             
	        <div class="fav-btn">
		    <span href="" class="favme dashicons dashicons-heart"></span>
	         </div> */}
	
        </div>  
    );
};