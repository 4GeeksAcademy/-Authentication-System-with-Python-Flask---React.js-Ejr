import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { HomeBanner } from "../component/homeBanner";
import { HomeExercises } from "../component/homeExercises";
import { SectionTest } from "../component/sectionTest";
import { SectionTabs } from "../component/sectionTabs";

export const Home = () => {
	const { store, actions } = useContext(Context);


	return (
		<>
			<HomeBanner />
			<HomeExercises />
			<hr className="divider"></hr>
			<SectionTabs />
			<hr className="divider"></hr>
			<SectionTest />
			<hr className="divider animate-ping"></hr>
		</>
	);
};
