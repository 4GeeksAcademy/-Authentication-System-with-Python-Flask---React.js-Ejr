import React from "react";
import { useState } from "react";
import { Carousel, Container, Media } from "react-bootstrap";
import { personB, personA, personC } from "../../img/image";

const CarouselReviews = () => {
	const [index, setIndex] = useState(0);
	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};
	return (
		<Container className="my-5">
			<div className="transBox" />
			<h3 className="text-center">Comentario de los clientes </h3>
			<Carousel activeIndex={index} onSelect={handleSelect}>
				<Carousel.Item>
					<Media className="shdow p-5 bg-light rounded mx-5">
						<img
							src={personA}
							width="100"
							height="100"
							className="d-inline-block align-top img-thumbnail d-flex"
							alt="person_Image"
							style={{ borderRadius: "50%" }}
						/>
						<Media.Body className="ml-3 ">
							<h5 className="font-weight-bold">El Nombre de Freelancer</h5>
							<p>
								<i className="far fa-star h4" />
								<i className="far fa-star h4" />
								<i className="far fa-star h4" />
								<i className="far fa-star h4" />
								<i className="far fa-star h4" /> calificación 4.8/5
							</p>
							<p>
								Never before has there been a good film portrayal of ancient Greece favourite myth. So
								why would Hollywood start now
							</p>
						</Media.Body>
					</Media>
				</Carousel.Item>
				<Carousel.Item>
					<Media className="p-5 bg-light rounded mx-5">
						<img
							src={personB}
							width="100"
							height="100"
							className="d-inline-block align-top img-thumbnail d-flex"
							alt="person_Image"
							style={{ borderRadius: "50%" }}
						/>
						<Media.Body className="ml-3 ">
							<h5 className="font-weight-bold">El Nombre de Freelancer</h5>
							<p>
								<i className="far fa-star h4" />
								<i className="far fa-star h4" />
								<i className="far fa-star h4" />
								<i className="far fa-star h4" />
								<i className="far fa-star h4" /> calificación 4.8/5
							</p>
							<p>
								Never before has there been a good film portrayal of ancient Greece favourite myth. So
								why would Hollywood start now
							</p>
						</Media.Body>
					</Media>
				</Carousel.Item>
				<Carousel.Item>
					<Media className="shdow p-5 bg-light rounded mx-5">
						<img
							src={personC}
							width="100"
							height="100"
							className="d-inline-block align-top img-thumbnail d-flex"
							alt="person_Image"
							style={{ borderRadius: "50%" }}
						/>
						<Media.Body className="ml-3 ">
							<h5 className="font-weight-bold">El Nombre de Freelancer</h5>
							<p>
								<i className="far fa-star h4" />
								<i className="far fa-star h4" />
								<i className="far fa-star h4" />
								<i className="far fa-star h4" />
								<i className="far fa-star h4" /> calificación 4.8/5
							</p>
							<p>
								Never before has there been a good film portrayal of ancient Greece favourite myth. So
								why would Hollywood start now
							</p>
						</Media.Body>
					</Media>
				</Carousel.Item>
			</Carousel>
			<div className="transBox" />
		</Container>
	);
};
export default CarouselReviews;
