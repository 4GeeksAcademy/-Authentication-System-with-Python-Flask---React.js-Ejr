import React, { useContext } from "react";
import { LoginModal } from "../component/LoginModal.js"
import "../../styles/home.css";

import Card from "../component/card.js";
import {Navbar} from "../component/navbar.js";

//include images into your bundle
// import rigoImage from "../../img/rigo-baby.jpg";
import Jumbotron from "../component/jumbotron.js";
import {Footer} from "../component/footer.js";

export const Home = () => {

	return (
		<div className="container">
			<Jumbotron />
			<div className="4-botones py-5 d-flex justify-content-center row m-1">
				<button type="button" class="btn btn-lg m-1 bg-400 text-white col-sm-8 col-md-12 col-lg-2">EVENTS</button>
				<button type="button" class="btn btn-lg m-1 bg-300 text-black col-sm-8 col-md-12 col-lg-2">Sports</button>
				<button type="button" class="btn btn-lg m-1 bg-300 text-black col-sm-8 col-md-12 col-lg-2">Music</button>
				<button type="button" class="btn btn-lg m-1 bg-400 text-white col-sm-8 col-md-12 col-lg-2">and a lot of fun</button>
			</div>

			<div className="Don't forget to see the events row py-5">
				<p className="fs-2 col-sm-12 col-md-6 col-lg-5"><strong>Don't forget to see the events!</strong></p>

				<div className="col-sm-12 col-md-6 col-lg-2">
					<label class="visually-hidden" for="inlineFormSelectPref">Preference</label>
					<select class="form-select" id="inlineFormSelectPref">
						<option selected>Choose...</option>
						<option value="1">One</option>
						<option value="2">Two</option>
						<option value="3">Three</option>
					</select>
				</div>

				<p className="d-flex justify-content-end col-sm-12 col-md-6 col-lg-3"><strong>or took all the events today!</strong></p>

			</div>
			<div className="row m-1">
				<div className="col-sm-12 col-md-6 col-lg-4">
					<Card />
				</div>
				<div className="col-sm-12 col-md-6 col-lg-4  ">
					<Card />
				</div>
				<div className="col-sm-12 col-md-6 col-lg-4  ">
					<Card />
				</div>
			</div>
			<div className="row m-1">
				<div className="col-sm-12 col-md-6 col-lg-4">
					<Card />
				</div>
				<div className="col-sm-12 col-md-6 col-lg-4  ">
					<Card />
				</div>
				<div className="col-sm-12 col-md-6 col-lg-4  ">
					<Card />
				</div>
			</div>
			<p className="fs-2 col-sm-12 col-md-6 col-lg-12 d-flex justify-content-center py-5"><strong>If you don't have the time to travel, we bring the plans for you!</strong></p>

		</div>
	);
};
