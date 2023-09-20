import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import imgSize from "../../img/240x120.png";

export const SideBar = () => {
	const navigate = useNavigate();

	const component_category = [
		{
			title: 'Alerts',
			description: 'Different types of alerts', 
			path: "docs/components/alerts" 
		},
		{
			title: 'Badges', 
			description: 'Small count indicators',
			path: "badges"
		},
		{
			title: 'Breadcrumbs',
			description: 'Indicates page location',
			path: "breadcrumbs"
		},
		{
			title: 'Buttons',
			description: 'Various button styles',
			path: "docs/components/buttons"
		},
		{
			title: 'Button Groups',
			description: 'Grouped buttons',
			path: "button-groups"
		},
		{
			title: 'Cards',
			description: 'Flexible content containers',
			path: "docs/components/cards"
		},
		{
			title: 'Carousels', 
			description: 'Rotating content slides',
			path: "carousels"
		},
		{
			title: 'Collapses',
			description: 'Toggleable content sections', 
			path: "collapses"
		},
		{
			title: 'Dropdowns',
			description: 'Toggleable menu buttons',
			path: "dropdowns"
		},
		{
			title: 'List Groups',
			description: 'List element styles', 
			path: "list-groups" 
		},
		{
			title: 'Modals',
			description: 'Overlay pop up windows',
			path: "modals"
		},
		{
			title: 'Navs & Navbars',
			description: 'Navigation components',
			path: "navs-navbars"
		},
		{
			title: 'Pagination', 
			description: 'Page number indicators',
			path: "pagination"
		},
		{
			title: 'Popovers',
			description: 'Small overlay content',
			path: "popovers"
		},
		{
			title: 'Progress Bars',
			description: 'Progress indicators',
			path: "progress-bars"
		}
	]

	const getting_started =[
		{
			title: 'Introduction',
			path: "introduction" 
		},
		{
			title: 'Download',
			path: "download" 
		},
		{
			title: 'Contents',
			path: "components" 
		},
		
	]

	const utilities_category = [
		{
			title: 'Colors',
			description: 'Different text colors', 
			path: "docs/utilities/colors" 
		},
		{
			title: 'Background', 
			description: 'Different type of background colors',
			path: "docs/utilities/bg-colors"
		}
	]

	const handleMouseOver = (e) => {
		e.target.style.backgroundColor = '#ff9e60';
		e.target.style.borderRadius = '5px';
		e.target.style.cursor = 'pointer'; 
		e.target.style.fontWeight = 'bolder';
	}
		
	const handleMouseOut = (e) => {
		e.target.style.backgroundColor = '';
		e.target.style.borderRadius = ''; 
		e.target.style.cursor = 'default';
		e.target.style.padding = ''; 
		e.target.style.fontWeight = 'light';
	}

	const handleClick = (e, path) => {
		e.target.style.backgroundColor = 'rgb(254,236,189)';
		e.target.style.borderRadius = '5px'; 
		e.target.style.fontWeight = 'bold';
		navigate(`/${path}`);
	}

	return (
		<div className="col-2 mt-3 border-end" style={{backgroundColor: "#f8f9fa"}}>

			<nav className="nav flex-column mt-3">
			<h5 className="fw-medium" style={{fontSize: '1.1rem'}}>
				<i className="bi bi-boxes"></i>
				Getting started
			</h5>

			<ul className="list-unstyled">
				{getting_started.map(item => (
				<li 
					className="ps-2 fw-lighter"
					style={{fontSize: '0.95rem', marginBottom:"5px"}}
					
				>
					<span className="px-2"
					onMouseOver={handleMouseOver}  
					onMouseOut={handleMouseOut}
					onClick={e => handleClick(e, item.path)}
					>{item.title}</span>
				</li>
				))}
			</ul>
			</nav>

			<nav className="nav flex-column mt-3">
			<h5 className="fw-medium" style={{fontSize: '1.1rem'}}>
				Components
			</h5>

			<ul className="list-unstyled">
				{component_category.map(item => (
				<li
					className="ps-2 fw-lighter" 
					style={{fontSize: '0.95rem', marginBottom:"5px"}}
				>
					<span className="px-2"
					onMouseOver={handleMouseOver}  
					onMouseOut={handleMouseOut}
					onClick={e => handleClick(e, item.path)}
					>{item.title}</span>
				</li>
				))}
			</ul>
			</nav>

			<nav className="nav flex-column mt-3">
			<h5 className="fw-medium" style={{fontSize: '1.1rem'}}>
				Utilities
			</h5>

			<ul className="list-unstyled">
				{utilities_category.map(item => (
				<li
					className="ps-2 fw-lighter" 
					style={{fontSize: '0.95rem', marginBottom:"5px"}}
				>
					<span className="px-2"
					onMouseOver={handleMouseOver}  
					onMouseOut={handleMouseOut}
					onClick={e => handleClick(e, item.path)}
					>{item.title}</span>
				</li>
				))}
			</ul>
			</nav>

		</div>
	)
}







{/* <div>
<p className="text-warning fw-bolder mt-5">/Components</p>
<h2 className="fw-bolder" >Beautifully crafted UI components, ready for your next project.</h2>
<p>Over 500+ professionally designed, fully responsive, expertly crafted component examples you can drop into your Tailwind projects and customize to your heart’s content.	</p>
<p className="text-warning fw-bolder">Browse all components →</p>

<ButtonAdmin/>


<div class="row mt-5">
	{component_category.map((item) => (
		<div className="col-12 col-md-6 col-lg-3 mb-4">
			<div class="card h-100 mx-1 shadow">
				<img src={item.image} class="card-img-top" alt={item.title}/>
				<div class="card-body pt-2">
					<h5 class="card-title text-warning">{item.title}</h5>
					<p class="card-text text-muted">{item.description}</p>
				</div>
			</div>
		</div>
	))}
	
</div>
</div> */}


	{/* <ul>
      <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Item 1</li>
      <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Item 2</li>
      <li onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>Item 3</li>
    </ul> */}