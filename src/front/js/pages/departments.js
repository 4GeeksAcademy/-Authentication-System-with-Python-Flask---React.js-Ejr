import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

import "../../styles/departments.css";
import { Link } from "react-router-dom";

export const Departments = () => {
	const { store, actions } = useContext(Context);
	const [artDepartments , setArtDepartments] = useState([])
	
	useEffect(()=>{
			actions.getDepartments()
	},[])
	
	useEffect(() => {
		setArtDepartments(store.artDepartments)
	},[store.artDepartments])

	// console.log(artDepartments);
	return (
		
		<div className="text-center mt-5">
			<p>This is the department page</p>
			<div className="row1"> 
				{artDepartments.map(item => (
					<div className="art-Poster">
						{/* {console.log(item)} */}
						<p>{item.displayName} </p>
					</div>
					
				))}
			</div>
		</div>
	);
	
};
