import React from "react";
import { Row, Col, Stack } from "react-bootstrap";

const News_Card = () => {
  return (
    <Stack className="mt-5" gap={4}>
      <Row className="border border-end-0 border border-start-0 border border-1">
        <Col md={3} className="d-inline-flex">
          <a style={{ color: "white" }} href="https://www.google.com/">
            Image Goes Here
          </a>
        </Col>
        <Col className="d-table-row">
          <h3 className="font-weight-bold">Title of Article</h3>
          <p>Desciption of Article 1-2 Sentences</p>
          <a style={{ color: "white" }} href="https://www.google.com/">
            Read More
          </a>
        </Col>
      </Row>
    </Stack>
  );
};

export { News_Card as NC };
