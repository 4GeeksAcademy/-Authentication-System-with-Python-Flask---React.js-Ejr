import React from "react";
import { Row, Col, Stack } from "react-bootstrap";

const News_Card = () => {
  const axios = require("axios");

  const options = {
    method: "GET",
    url: "https://videogames-news2.p.rapidapi.com/videogames_news/recent",
    headers: {
      "X-RapidAPI-Key": "43a16cc10emsh7ff0e79b253cf89p197848jsnd06fbc992b41",
      "X-RapidAPI-Host": "videogames-news2.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });

  return (
    <Stack className="mt-5" gap={4}>
      <Row className="border border-end-0 border border-start-0 border border-1">
        <Col md={3} className="d-inline-flex">
          <a style={{ color: "white" }} href={Object.link}>
            {Object.image}
          </a>
        </Col>
        <Col className="d-table-row">
          <h3 className="font-weight-bold">{Object.title}</h3>
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
