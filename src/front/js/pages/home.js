import React, { useContext } from "react";
import { Context } from "../store/appContext";
import IMG_blog from "../../img/IMG_blog.jpg";
import IMG_foro from "../../img/IMG_foro.png";
import IMG_tracker from "../../img/IMG_tracker.png";
import IMG_familia from "../../img/IMG_familia.jpg";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-fluid" style={{ marginTop:'55px' }}>
			<div className="jumbotron text-center" style={{backgroundImage: `url(${IMG_familia})`}}>
				<div className="overlay"> 		
					<h1 className="display-2 mb-3 tituloApp">BabyTracker</h1>
					<div className="ml-auto">
						<Link to="/Register">
							<button className="btn btn-primary btn-lg custom-btn">Sign up now!</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="m-5">
				<div className="mb-5">
					<h1>Welcome to BabyTracker</h1>
				</div>
				<div className="mb-3">
					<p>Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen.
					</p>
				</div>
				<div className="card-group">
					<div className="card">
						<img src={IMG_tracker} className="card-img-top img-size" alt="IMG_tracker"/>
						<div className="card-body">
							<h5 className="card-title">Tracker</h5>
						</div>
					</div>
					<div className="card">
						<img src={IMG_blog} className="card-img-top img-size" alt="IMG_blog"/>
						<div className="card-body">
							<h5 className="card-title">Blog</h5>
						</div>
					</div>
					<div className="card">
						<img src={IMG_foro} className="card-img-top img-size" alt="IMG_foro"/>
						<div className="card-body">
							<h5 className="card-title">Foro</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
