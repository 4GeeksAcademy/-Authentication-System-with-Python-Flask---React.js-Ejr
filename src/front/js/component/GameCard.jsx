import React from "react";
import { Card, Button } from "react-bootstrap";

import GameData from "./GameAPI.jsx";

const GameCard = ({ title, imageUrl, final_price,  }) => {
  return (
    <div className="col-6 col-md-4 col-lg-3 my-3">
      <Card style={{ backgroundColor: "white", border: "1px solid #ccc" }}>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <p>{"$"+ final_price}</p>
          <Button variant="secondary">
            Add to cart
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default GameCard;
