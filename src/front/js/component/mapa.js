import React from "react";
import { render, ReactDOM } from "react-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../../styles/index.scss";

class Mapa extends React.Component {
	constructor() {
		super();
	}

	render() {
		const position = [51.505, -0.09];
		return (
			<MapContainer
				center={position}
				zoom={13}
				scrollWheelZoom={false}
				/*style={{ height: "230px", width: "100%" }}*/
			>
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
			</MapContainer>
		);
	}
}
export default Mapa;
