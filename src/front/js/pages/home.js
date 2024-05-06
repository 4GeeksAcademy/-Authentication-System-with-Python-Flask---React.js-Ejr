import React, { useContext } from "react";
import { Context } from "../store/appContext";
import RegionCard from "../component/RegionCard";
import { Grid, Typography, } from "@mui/material"; // Import Material-UI components
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<Grid container spacing={2}>
			<Grid item xs={8}>
				<div className="text-center mt-5">
					<Typography variant="h1">Hello Rigo!!</Typography>
					<p>
						<img src={rigoImageUrl} alt="Rigo Baby" />
					</p>
					<div className="alert alert-info">
						{store.message || "Loading message from the backend (make sure your python backend is running)..."}
					</div>
					<p>
						This boilerplate comes with lots of documentation:{" "}
						<a href="https://start.4geeksacademy.com/starters/react-flask">
							Read documentation
						</a>
					</p>
				</div>
			</Grid>
			<Grid item xs={4}>
				<RegionCard />
			</Grid>
		</Grid>
	);
};
