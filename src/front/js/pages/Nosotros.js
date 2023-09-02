import React from 'react'
import "../../styles/nosotros.css";

const Nosotros = () => {
  return (
    <div className="landing-page container my-5">
				<div className="first-block d-inline-flex">
					<div className="text-main-box">
						<h1 className="title-nosotros">¿Quiénes somos?</h1>
						<h5 className="text-nosotros">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</h5>
					</div>
					<div className="image-side">
						<img className="img-nosotros" src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80" />
					</div>
				</div>
                </div>
  )
}

export default Nosotros