import React from "react";
import { render } from "react-dom";
import { Map, MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

class Mapa extends React.Component {
	constructor() {
		super();
	}

	render() {
		const position = [51.505, -0.09];
		return (
			<Map center={position} zoom={13}>
				<TileLayer
					attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
					url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
				/>
				<Marker position={position}>
					<Popup>
						<span>
							A pretty CSS3 popup. <br /> Easily customizable.
						</span>
					</Popup>
				</Marker>
			</Map>
		);
	}
}
export const Mapa2 = () => {
	return (
		<div className="container">
			<Mapa />
		</div>
	);
};
