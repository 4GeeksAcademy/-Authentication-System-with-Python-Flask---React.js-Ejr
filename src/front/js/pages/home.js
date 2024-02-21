import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid p-0">
			<img src="https://res.cloudinary.com/dx23woi99/image/upload/v1708541359/IMG_5841_tkuzrc.jpg" className="card-img-top p-0" alt="..." style={{height: "100%"}}/>
			<div className="card-img-overlay">
				
					
				
					<div className="d-flex justify-content-end">
						<button type="button" className="btn btn-outline-light p-2 mx-2">Free Trial</button>
						<button type="button" className="btn btn-outline-light">Login</button>
					</div>

					<div>
						<img src="https://res.cloudinary.com/dx23woi99/image/upload/v1708547841/Captura_de_pantalla_2024-02-21_a_las_9.30.16_p._m._sknukg.png" className="card-img-top p-0" alt="..." style={{width: "50%"}}/>
					</div>
				
					<div className="mx-5 mt-3">
						<button type="button" className="btn btn-outline-light">Dive In</button>
					</div>
					

					<div className="d-flex justify-content-end align-items-end">
						<span className="text-light text-end mt-3 fs-5">
						An ocean of <br></br> online yoga classes. <br></br>
						An ocean of different <br></br> styles & practices. <br></br>
						Teachers from all <br></br>over the globe. <br></br>
						Here, all as one.
						</span>
					</div>
			</div>
		
		
		</div>
	);
};
