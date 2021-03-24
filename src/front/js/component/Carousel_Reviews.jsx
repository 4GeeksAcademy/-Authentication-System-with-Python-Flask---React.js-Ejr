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
							<h5 className="font-weight-bold">Felipe Morales - Arquitectura TI</h5>
							<p>
								<i className="fas fa-star" style={{ fontSize: "23px" }} />
								<i className="fas fa-star" style={{ fontSize: "23px" }} />
								<i className="fas fa-star" style={{ fontSize: "23px" }} />
								<i className="fas fa-star" style={{ fontSize: "23px" }} />
								<i className="far fa-star h4" /> calificación 4/5
							</p>
							<p>
								Excelente trabajo, muy buen servicio y la aplicación muy expedita para comunicarme con
								el desarrollador.
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
							<h5 className="font-weight-bold">Marcia Canales - Desarrollador Full Stack</h5>
							<p>
								<i className="fas fa-star" style={{ fontSize: "23px" }} />
								<i className="fas fa-star" style={{ fontSize: "23px" }} />
								<i className="fas fa-star" style={{ fontSize: "23px" }} />
								<i className="far fa-star h4" />
								<i className="far fa-star h4" /> calificación 3/5
							</p>
							<p>
								Si bien la desarrolladora hizo lo que le pedimos, al momento de mostrar destreza en
								temas, no fue lo que esperabamos.
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
							<h5 className="font-weight-bold">Federico Ruiz-Tagle - Diseño de logos</h5>
							<p>
								<i className="fas fa-star" style={{ fontSize: "23px" }} />
								<i className="fas fa-star" style={{ fontSize: "23px" }} />
								<i className="fas fa-star" style={{ fontSize: "23px" }} />
								<i className="fas fa-star" style={{ fontSize: "23px" }} />
								<i className="far fa-star h4" /> calificación 4/5
							</p>
							<p>
								Muy buen servicio, muy buen diseñador, esperamos poder volver a trabajar con él en el
								futuro, se adecuó anuestros requerimientos y especificaciones!!
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
