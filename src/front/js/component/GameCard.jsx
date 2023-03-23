import React from "react";
import { Card, Button } from "react-bootstrap";
import "../../styles/GameCard.css";

const GameCard = ({ title, imageUrl, price, addToCart }) => {
  console.log(typeof price);
  const formattedPrice = `$${(price / 100)
    .toFixed(2)
    .toString()
    .replace(/(\d+)\.(\d{2})/, "$1.$2")}`;

    const handleAddToCart = () => {
      addToCart({ title, imageUrl, price });
    };

  return (
    <div className="col-6 col-md-4 col-lg-3 my-3">
      <Card style={{ backgroundColor: "white", border: "1px solid #ccc" }}>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{title}</Card.Title>
          <div className="mt-auto">
            <Card.Text>{formattedPrice}</Card.Text>
            <Button variant="secondary" onClick={handleAddToCart}>
              Add to cart
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default GameCard;
