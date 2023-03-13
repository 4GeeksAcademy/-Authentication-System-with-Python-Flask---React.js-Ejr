import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";


const GameCard = ({ title, imageUrl }) => {
  

  return (
    <div className="col-6 col-md-4 col-lg-3 my-3">
      <Card>
        <Card.Img variant="top" src={imageUrl} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Button variant="primary">Buy Now</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default GameCard;
