import React from "react";
import { Card, Container, Row, Col, Stack } from "react-bootstrap";
import "../../styles/home.css";
import { NC } from "./news_card.jsx";
const NewsCard = () => {
  return (
    <>
      <Container>
        <Container style={{ color: "white" }}>
          <Row>
            <Col>
              <Card style={{ width: "600px", background: "gray" }}>
                <Card.Img variant="top" src="holder.js/100px180" alt="img" />
                <Card.Body style={{ height: "400px" }}></Card.Body>
              </Card>
              <Card.Title>Title of Article</Card.Title>
              <Card.Text>Short Summary of Article</Card.Text>
            </Col>
            <Col>
              <Card style={{ width: "600px", background: "gray" }}>
                <Card.Img variant="top" src="holder.js/100px180" alt="img" />
                <Card.Body style={{ height: "400px" }}></Card.Body>
              </Card>
              <Card.Title>Title of Article</Card.Title>
              <Card.Text>Short Summary of Article</Card.Text>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container style={{ color: "white" }}>
        <NC />
        <NC />
        <NC />
        <NC />
        <NC />
        <NC />
        <NC />
        <NC />
        <NC />
        <NC />
      </Container>
    </>
  );
};

export { NewsCard as News };
