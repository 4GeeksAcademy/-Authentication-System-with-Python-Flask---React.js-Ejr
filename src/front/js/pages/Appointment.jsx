import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/calendar.css";
import { Calendar } from "./Calendar.jsx";
import { MedicalCenter } from "./Medical Center.jsx";
import { Month } from "./Month.jsx"
import { Hours } from "./Hours.jsx"

export const Appointment = () => {

	return (
		<div className="container container-center">
          <MedicalCenter />  
          <Month />
          <Hours />
        </div>
	);
};