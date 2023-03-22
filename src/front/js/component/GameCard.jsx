import React from "react";
import { Card, Button } from "react-bootstrap";
import "../../styles/GameCard.css";

import GameData from "./GameAPI.jsx";

<<<<<<< HEAD
const GameCard = ({ title, imageUrl, onAddToCart }) => {
  const handleAddToCart = () => {
    onAddToCart({ title, imageUrl });
=======
const GameCard = ({ title, imageUrl }) => {
  const { setCartItems } = useContext(Context);

  const addToCart = () => {
    const item = { title, imageUrl };
    setCartItems((prevCartItems) => [...prevCartItems, item]);
>>>>>>> 4d47136 (feat)
  };


  return (
    <div className="col-6 col-md-4 col-lg-3 my-3">
      <Card style={{ backgroundColor: "white", border: "1px solid #ccc" }}>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
<<<<<<< HEAD
          <Button variant="secondary" onClick={handleAddToCart}>
<<<<<<< HEAD
            Add to cart
=======
            Add to carts
=======
          <Button variant="secondary" onClick={addToCart}>
            Add to cart
>>>>>>> a947074 (feat)
>>>>>>> 4d47136 (feat)
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default GameCard;
