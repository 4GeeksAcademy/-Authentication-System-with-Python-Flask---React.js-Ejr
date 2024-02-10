import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import EventSearchBar from "../component/EventSearchBar";
import Hero from "../component/Hero";
import AboutSection from "../sections/about";
import { LoginForm } from "../component/LogInForm";
import { SignUpForm } from "../component/SignUpForm";
import PopularEvents from "../sections/PopularEvents";
import EventForm from "../component/CreateEventForm";
import PopularCategories from "../sections/PopularCategories";
import { ContactForm } from "../component/ContactForm";
import HeroImage from "/workspaces/europe-fs-pt-14-ryandornan-mariahurtado/src/front/img/music/crowd-02.png";
import EventSingle from "../component/EventSingle";
import SignUpNow from "../sections/SignUpNow";
import PopularEventsTwo from "../sections/PopularEventsTwo";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center">

			<div className="hero" /*style={{ backgroundImage: `url(${HeroImage})` }}*/>
				<div className="hero-content">
					<Hero 
					header="Welcome to Eventure, Where Experiences Await."
					text=
					"We’re here to bring you a variety of exciting experiences. 
					Whether you love culture, adventure, or simply good times, we’ve got something for everyone. 
					Explore our events and join us in celebrating life’s moments. 
					Let’s create unforgettable memories together!"
					/>
				</div>
			</div>

			<AboutSection />

			<PopularEventsTwo />

			<PopularCategories />

			<SignUpNow /> 

			<ContactForm />

		</div>
	);
};
