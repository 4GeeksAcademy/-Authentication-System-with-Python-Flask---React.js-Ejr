import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import PropTypes from "prop-types";

const mapStyles = {
	width: "100%",
	height: "100%"
};

export class MapContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			cords: [
				{ lat: 9.8739146, lng: -85.5294764 },
				{ lat: 9.878, lng: -85.534 },
				{ lat: 9.8696866, lng: -85.5071604 },
				{ lat: 9.88208, lng: -85.52709 }
			]
		};
	}

	showMarkers = () => {
		return this.state.cords.map((store, index) => {
			return (
				<Marker
					key={index}
					id={index}
					position={{
						lat: store.lat,
						lng: store.lng
					}}
					onClick={() => console.log("Clicked")}
				/>
			);
		});
	};

	render() {
		return (
			<Map
				google={this.props.google}
				zoom={12}
				style={mapStyles}
				initialCenter={{
					lat: 9.8739146,
					lng: -85.5294764
				}}>
				{this.showMarkers()}
			</Map>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: "AIzaSyDJie0dS3Kh2dUzWVFtzLrZXUZRV_3D1z8"
})(MapContainer);

MapContainer.propTypes = {
	google: PropTypes.object
};
