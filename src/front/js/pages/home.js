/*


import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import "../../styles/home.css";

export const Home = () => {
  return (
    <Container fluid className="mt-3">
      <Row className="justify-content-center">
        <Col md={3} className="p-1">
          <Card className="game-card">
            <Card.Img variant="top" src="https://via.placeholder.com/400x225" />
            <Card.Body>
              <Card.Title>Game Title</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nunc lacinia, ullamcorper arcu vel,
                gravida massa.
              </Card.Text>
              <Button variant="primary">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="p-1">
          <Card className="game-card">
            <Card.Img variant="top" src="https://via.placeholder.com/400x225" />
            <Card.Body>
              <Card.Title>Game Title</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nunc lacinia, ullamcorper arcu vel,
                gravida massa.
              </Card.Text>
              <Button variant="primary">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="p-1">
          <Card className="game-card">
            <Card.Img variant="top" src="https://via.placeholder.com/400x225" />
            <Card.Body>
              <Card.Title>Game Title</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nunc lacinia, ullamcorper arcu vel,
                gravida massa.
              </Card.Text>
              <Button variant="primary">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3} className="p-1">
          <Card className="game-card">
            <Card.Img variant="top" src="https://via.placeholder.com/400x225" />
            <Card.Body>
              <Card.Title>Game Title</Card.Title>
              <Card.Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nunc lacinia, ullamcorper arcu vel,
                gravida massa.
              </Card.Text>
              <Button variant="primary">Buy Now</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};*/
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import GameCard from "../component/GameCard.jsx";
import "../../styles/home.css";
import GameData from "../component/GameAPI.jsx";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Home = () => {
  GameData();
  const slideImages = [
    "https://picsum.photos/800/600",
    "https://picsum.photos/800/601",
    "https://picsum.photos/800/602",
  ];
  const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    indicators: true,
    arrows: true,
  };
  return (
    <div className="home-container">
      <div className="hero-container">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="order-md-1">
              <h1>Welcome to My Game Store</h1>
              <p className="lead">
                Find your favorite games and discover new ones, all in one
                place.
              </p>
              <Button variant="primary">Explore games</Button>
            </Col>
            <Col md={6} className="order-md-2">
              <div className="slide-container">
                <Slide {...properties}>
                  {slideImages.map((each, index) => (
                    <div key={index} className="each-slide">
                      <img src={each} alt="slide" />
                    </div>
                  ))}
                </Slide>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Row className="my-5">
          <Col>
            <h2>Top Games</h2>
          </Col>
          <Col className="text-end">
            <Button variant="link" className="text-decoration-none">
              View All
            </Button>
          </Col>
        </Row>
        <Row>
          <GameCard title="Game 1" imageUrl="https://picsum.photos/300/200" />
          <GameCard title="Game 2" imageUrl="https://picsum.photos/300/200" />
          <GameCard title="Game 3" imageUrl="https://picsum.photos/300/200" />
          <GameCard title="Game 4" imageUrl="https://picsum.photos/300/200" />
          <GameCard title="Game 5" imageUrl="https://picsum.photos/300/200" />
          <GameCard title="Game 6" imageUrl="https://picsum.photos/300/200" />
        </Row>
      </Container>
    </div>
  );
};

export default Home;
