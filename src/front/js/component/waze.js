import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Waze = () => {
	const { store } = useContext(Context);
	let latLong = "https://embed.waze.com/es/iframe?zoom=12&lat=9.9333&lon=-84.0833";
	// if (props.lat !== undefined && props.long !== undefined) {
	// 	latLong = `https://embed.waze.com/es/iframe?zoom=12&lat=${store.lat}&lon=${store.long}`;
	// } else {
	// 	latLong = "https://embed.waze.com/es/iframe?zoom=12&lat=9.9333&lon=-84.0833";
	// }

	return (
		<div className="text-center mh-100" style={{ height: "500px" }}>
			<iframe src={latLong} width="800" height="700" frameBorder="0" style={{ border: "0" }} allowFullScreen />
		</div>
	);
};
