import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import EventSearchBar from "../component/EventSearchBar";
import Hero from "../component/Hero";
import AboutSection from "../sections/about";
import { LoginForm } from "../component/logInForm";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center">

			<div className="home-hero">
				<div className="home-hero-content">
					<Hero 
					header="Experience Events Near You!"
					text="We’re here to bring you a variety of exciting experiences. 
					Whether you love culture, adventure, or just good times, we’ve got something for you. 
					Explore events on our homepage and join us in celebrating life’s moments. Let’s make memories together!"
					/>
				</div>
			</div>
			
			<AboutSection />

			<LoginForm />
			

		</div>
	);
};
