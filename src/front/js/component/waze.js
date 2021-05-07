import React from "react";

export const Waze = () => {
	return (
		<div className="text-center" style={{ height: "500px" }}>
			<iframe
				src="https://embed.waze.com/es/iframe?zoom=12&lat=45.6906304&lon=-120.810983"
				width="500"
				height="500"
				frameBorder="0"
				style={{ border: "0" }}
				allowFullScreen
			/>
		</div>
	);
};
