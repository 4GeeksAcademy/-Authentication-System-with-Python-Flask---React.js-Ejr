import React, { useContext } from "react";
import { Context } from "../store/appContext";
import logo from "../../img/logo.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="">
			<div className="container-fluid">
  				
				<div className="row">
    				<div className="col-md-12 text-center">
     			 		<h3 className="animate-charcter"> ArtSeekers</h3>
    				</div>
  				</div>

				<div className="row" id="list">
				<h1>Features</h1>
				<div contenteditable>
  				<div>
					View world-class pieces of art
				</div>
  				<div>
    				Rate the pieces of art on a scale of 1-5 stars
  				</div>
				<div>
    				If you love a specific piece of art 'favorite' it and it will save to your profile
  				</div>
				<div>
    				Future iterations will recommend museums based on your ratings and favorites
  				</div>
			</div>

				</div>

			</div>
		</div>
	);
};
