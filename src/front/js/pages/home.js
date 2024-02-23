import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import logo from "../../img/logoOCEANOM.png"

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid p-0 overflow-y-hidden h-100 landingfixed">
			<img src="https://res.cloudinary.com/dx23woi99/image/upload/v1708541359/IMG_5841_tkuzrc.jpg" className="card-img-top p-0" alt="..." style={{width: "100%"}}/>
			<div className="card-img-overlay">
				
					
				
					<div className="d-flex justify-content-end">
						<button type="button" className="btn btn-outline-light p-2 mx-2">Free Trial</button>
						<button type="button" className="btn btn-outline-light">Login</button>
					</div>

					<div className="mt-5 ms-4">
						<img src={logo} className="card-img-top p-0" alt="..." style={{width: "50%"}}/>
						
					</div>
					<div>
						<Link to="/login">
						<button type="button" className="btn btn-outline-light btn-lg ms-5">Dive In</button>
						</Link>
						
					</div>
					
					

					<div className="d-flex justify-content-end align-items-end">
						<span className="text-light text-end fs-5">
						An ocean of online yoga classes. <br></br>
						An ocean of different styles & practices. <br></br>
						Teachers from all over the globe. <br></br>
						Here, all as one.
						</span>
					</div>
			</div>
		
		
		</div>
	);
};
