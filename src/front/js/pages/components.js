import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

//import { logo } from "src/front/img/category-buttons.png";
//import logo2 from '/workspaces/componentify/src/front/img/category-buttons.png';

import { ComponentSideBar } from "../component/componentSideBar";


export const Components = () => {
	const { store, actions } = useContext(Context);

	
	const component_category = [
		{
		  title: 'Colors', 
		  description: 'Get all yours Colors here!',
		  image: 'https://buddhistchurchofoakland.org/wp-content/uploads/2018/03/sidebar-placeholder-grey.png'
		},
		{  
		  title: 'Buttons',
		  description: 'Get all yours Buttons here!', 
		  image: 'https://buddhistchurchofoakland.org/wp-content/uploads/2018/03/sidebar-placeholder-grey.png'
		} 
		,
		{  
		  title: 'Cards',
		  description: 'Get all yours Cards here!', 
		  image: 'https://buddhistchurchofoakland.org/wp-content/uploads/2018/03/sidebar-placeholder-grey.png'
		} 
		,
		{  
		  title: 'Nav-bars',
		  description: 'Get all yours Nav-bars here!', 
		  image: 'https://buddhistchurchofoakland.org/wp-content/uploads/2018/03/sidebar-placeholder-grey.png'
		} 
		,
		{  
		  title: 'Acordeons',
		  description: 'Get all yours Acordeons here!', 
		  image: 'https://buddhistchurchofoakland.org/wp-content/uploads/2018/03/sidebar-placeholder-grey.png'
		} 
		,
		{  
		  title: 'Dropdowns',
		  description: 'Get all yours Dropdowns here!', 
		  image: 'https://buddhistchurchofoakland.org/wp-content/uploads/2018/03/sidebar-placeholder-grey.png',
		  path: '/dropdowns'
		} 
	  ];

	  const hoverStyles = {
		backgroundColor: '#ff6600',
		color: 'white',
		cursor: 'pointer'
	  };

	return (
		<div className="container">
			<p className="text-warning fw-bolder mt-5">/Components</p>
			<h2 className="fw-bolder" >Beautifully crafted UI components, ready for your next project.</h2>

			<p>Over 500+ professionally designed, fully responsive, expertly crafted component examples you can drop into your Tailwind projects and customize to your heart’s content.	</p>
		
			<p className="text-warning fw-bolder">Browse all components →</p>

			<div class="row">
				{component_category.map((item, index) => (

					<div class="col-12 col-md-6 col-lg-4 mb-4"
					onMouseEnter={e => e.target.style = hoverStyles} 
					onMouseLeave={e => e.target.style = {}}
					>

						<div class="card h-100 border-0 shadow">
							<img src={item.image} class="card-img-top" alt={item.title}/>
							<div class="card-body p-4">
							<h5 class="card-title text-warning">{item.title}</h5>
							<p class="card-text text-muted">{item.description}</p>
							</div>
						</div>

					</div>
				))}
			</div>

      		{/* <ComponentSideBar/> */}
		</div>
	);
};
