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

				<div className="row" id="about-us">
					<div className="info">
						<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
					</div>
				</div>

				<div className="row" id="list">
					<h1 className="features">Features</h1>
				<div contenteditable>

  				<div className="line1">
					View world-class pieces of art
				</div>

  				<div className="line2">
    				Rate the pieces of art on a scale of 1-5 stars
  				</div>

				<div className="line3">
    				If you love a specific piece of art 'favorite' it and it will save to your profile
  				</div>

				<div className="line4">
    				Future iterations will recommend museums based on your ratings and favorites
  				</div>

				</div>

				</div>


			</div>
		</div>
	);
};
