import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

import "../../styles/exhibit.css";

export const Exhibits = () => {
	let fallBackURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzqX-q4R4VGGs1ArQpqZ-Y5deWIBVJ97KHOp4bkuQlmg&s"
	const { store, actions } = useContext(Context);
	const [artPieces , setArtPieces] = useState([])
	useEffect(()=>{
		setArtPieces(store.artPieces)
	},[store])
	return (
		<div className="text-center mt-5">
			<div className="row1"> 
				{artPieces.map(item => (
					<div className="art-poster">
						<p>{item.title}  ({item.objectID})</p>
						<img className="w-100" src={item.primaryImageSmall} onError= {(e)=>{e.target.src = fallBackURL}} alt = {item.objectName} />
					</div>
				))}
			</div>
		</div>
	);
};
