import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

import AuthComponent from "../component/auth";
import "../../styles/exhibit.css";

export const Exhibits = () => {
	let fallBackURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzqX-q4R4VGGs1ArQpqZ-Y5deWIBVJ97KHOp4bkuQlmg&s"
	const { store, actions } = useContext(Context);
	const [artPieces , setArtPieces] = useState([])
	useEffect(()=>{
		setArtPieces(store.artPieces)
	},[store])
	return (
	<AuthComponent>	
		<div className="text-center mt-5">
			<div> 
				{artPieces.map(item => (
					<div className="row1">
					<Link to={`single/${item.objectID}`}>
						<div className="art-poster">
							<img className="w-100" src={item.primaryImageSmall} onError= {(e)=>{e.target.src = fallBackURL}} alt = {item.objectName} />
							<p>{item.title} </p>
						</div>
					</Link>
					</div>
						
					))}	
			</div>
		</div>	
	</AuthComponent>
		
	);
};
