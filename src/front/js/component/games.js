import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import GameData from "./GameAPI.jsx";

const GameList = () => {
  const [games, setGames] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortMethod, setSortMethod] = useState("title");

  useEffect(() => {
    GameData().then((data) => setGames(data));
  }, []);

  const handleFilterSelect = (eventKey) => {
    setFilter(eventKey);
  };

  const handleSortSelect = (eventKey) => {
    setSortMethod(eventKey);
  };

  const filteredGames = games.filter((game) => {
    if (filter === "all") {
      return true;
    } else {
      return game.category === filter;
    }
  });

  let sortedGames;
  if (sortMethod === "price") {
    sortedGames = [...filteredGames].sort((final_price) =>
      a.final_price.localeCompare(b.final_price)
    );
  } else {
    sortedGames = [...filteredGames].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  return (
    <Container>
      <Row className="mb-3">
        <Col xs={12} md={6} className="mb-2 mb-md-0">
          <DropdownButton
            title={`Filter: ${filter === "all" ? "All Categories" : filter}`}
          >
            <Dropdown.Item eventKey="all" onSelect={handleFilterSelect}>
              All Categories
            </Dropdown.Item>
            <Dropdown.Item eventKey="action" onSelect={handleFilterSelect}>
              Action
            </Dropdown.Item>
            <Dropdown.Item eventKey="adventure" onSelect={handleFilterSelect}>
              Adventure
            </Dropdown.Item>
            <Dropdown.Item eventKey="strategy" onSelect={handleFilterSelect}>
              Strategy
            </Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col xs={12} md={6}>
          <DropdownButton
            title={`Sort by: ${
              sortMethod === "title" ? "Alphabetical" : "Price"
            }`}
          >
            <Dropdown.Item eventKey="title" onSelect={handleSortSelect}>
              Alphabetical
            </Dropdown.Item>
            <Dropdown.Item eventKey="final_price" onSelect={handleSortSelect}>
              Price
            </Dropdown.Item>
          </DropdownButton>
        </Col>
      </Row>
      <Row>
        {sortedGames.map((game) => (
          <Col key={game.id} sm={6} md={4} lg={3}>
            <Card>
              <Card.Img variant="top" src={game.imageUrl} />
              <Card.Body>
                <Card.Title>{game.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export { GameList as Games };
