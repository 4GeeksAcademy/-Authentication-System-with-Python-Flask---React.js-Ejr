import React, { useContext } from "react";
//import { Context } from "../store/appContext";
import { Container, Row, Col, Image, Card, Media } from "react-bootstrap";
import "../../styles/home.scss";
import "../../styles/home_cards.scss";
import tomatelo from "../../img/logo/tomatelo2.png";
export const Home = () => {
	//const { store, actions } = useContext(Context);

	return (
		<Container>
			<Row>
				<Col xs={6} md={4}>
					<Image src="https://images6.alphacoders.com/349/349908.jpg" thumbnail />
				</Col>
				<Col xs={6} md={4}>
					<Image src="https://images2.alphacoders.com/876/876244.jpg" thumbnail />
				</Col>
				<Col xs={6} md={4}>
					<Image
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFaVw6IQbSpeDIH7oeJ8DF5yD0A35u5onlA&usqp=CAU"
						thumbnail
					/>
				</Col>
				<Col xs={6} md={4}>
					<Image src="https://images8.alphacoders.com/503/thumb-1920-503131.jpg" thumbnail />
				</Col>
				<Col xs={6} md={4}>
					<Image
						src="https://kkinziger.files.wordpress.com/2014/08/8589130414963-grasshopper-cocktail-wallpaper-hd.jpg"
						thumbnail
					/>
				</Col>
				<Col xs={6} md={4}>
					<Image
						src="https://www.wallpapers4u.org/wp-content/uploads/vodka_alcohol_cocktail_bottle_glass_5447_1920x1080.jpg"
						thumbnail
					/>
				</Col>
				<Col xs={6} md={4}>
					<Image
						src="https://lh3.googleusercontent.com/proxy/VhePaqXfEvavwmpZ2R5jSBi81BZdP2AfaNtNAlX8ddUjYLd_MZcOkMHEVqW1qhfQAGHZYU_E4JB5nFMBAz8VK6mNeBojePiQd4QGBeeapLb2NpP9x11dwPO9"
						thumbnail
					/>
				</Col>
				<Col xs={6} md={4}>
					<Image
						src="https://i.pinimg.com/originals/72/31/ee/7231ee17808ec6ddab1806870716a76c.jpg"
						thumbnail
					/>
				</Col>
				<Col xs={6} md={4}>
					<Image src="https://www.wallpapertip.com/wmimgs/50-504541_best-cocktails.jpg" thumbnail />
				</Col>
				<Col xs={6} md={4}>
					<Image src="https://www.wallpapertip.com/wmimgs/50-504541_best-cocktails.jpg" thumbnail />
				</Col>
				<Col xs={6} md={4}>
					<Image src="https://images2.alphacoders.com/876/876244.jpg" thumbnail />
				</Col>
				<Col xs={6} md={4}>
					<Image
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFaVw6IQbSpeDIH7oeJ8DF5yD0A35u5onlA&usqp=CAU"
						thumbnail
					/>
				</Col>
			</Row>

			{/* categorias login */}
			<Row>
				<Col xs={6} md={4}>
					xs=6 md=4
				</Col>
				<Col xs={6} md={4}>
					xs=6 md=4
				</Col>
				<Col xs={6} md={4}>
					xs=6 md=4
				</Col>
			</Row>
			<Row>
				<Card>
					<Media>
						<Col xs={6} md={4}>
							<img
								className="mr-I"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFaVw6IQbSpeDIH7oeJ8DF5yD0A35u5onlA&usqp=CAU"
								alt="Generic placeholder"
							/>
						</Col>
						<Media.Body>
							<Col>
								<h5>Media Heading</h5>
								<p>
									Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
									sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
									turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
									felis in faucibus.
								</p>
							</Col>
						</Media.Body>
					</Media>
				</Card>

				<Card>
					<Media>
						<Media.Body>
							<Col>
								<h5>Media Heading</h5>
								<p>
									Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
									sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
									turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
									felis in faucibus.
								</p>
							</Col>
						</Media.Body>
						<Col xs={6} md={4}>
							<img
								className="mr-D"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFaVw6IQbSpeDIH7oeJ8DF5yD0A35u5onlA&usqp=CAU"
								alt="Generic placeholder"
							/>
						</Col>
					</Media>
				</Card>

				<Card>
					<Media>
						<Col xs={6} md={4}>
							<img
								className="mr-I"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFaVw6IQbSpeDIH7oeJ8DF5yD0A35u5onlA&usqp=CAU"
								alt="Generic placeholder"
							/>
						</Col>
						<Media.Body>
							<Col>
								<h5>Media Heading</h5>
								<p>
									Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
									sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
									turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
									felis in faucibus.
								</p>
							</Col>
						</Media.Body>
					</Media>
				</Card>
				<Card>
					<Media>
						<Media.Body>
							<Col>
								<h5>Media Heading</h5>
								<p>
									Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
									sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
									turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
									felis in faucibus.
								</p>
							</Col>
						</Media.Body>
						<Col xs={6} md={4}>
							<img
								className="mr-D"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFaVw6IQbSpeDIH7oeJ8DF5yD0A35u5onlA&usqp=CAU"
								alt="Generic placeholder"
							/>
						</Col>
					</Media>
				</Card>

				<Card>
					<Media>
						<Col xs={6} md={4}>
							<img
								className="mr-I"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFaVw6IQbSpeDIH7oeJ8DF5yD0A35u5onlA&usqp=CAU"
								alt="Generic placeholder"
							/>
						</Col>
						<Media.Body>
							<Col>
								<h5>Media Heading</h5>
								<p>
									Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
									sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
									turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
									felis in faucibus.
								</p>
							</Col>
						</Media.Body>
					</Media>
				</Card>

				<Card>
					<Media>
						<Media.Body>
							<Col>
								<h5>Media Heading</h5>
								<p>
									Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante
									sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra
									turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue
									felis in faucibus.
								</p>
							</Col>
						</Media.Body>
						<Col xs={6} md={4}>
							<img
								className="mr-D"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmFaVw6IQbSpeDIH7oeJ8DF5yD0A35u5onlA&usqp=CAU"
								alt="Generic placeholder"
							/>
						</Col>
					</Media>
				</Card>
			</Row>
		</Container>
	);
};

//Comentario
