import React, { useState, useEffect } from "react";
import { Row, Col, Stack } from "react-bootstrap";
import "../../styles/home.css";
const News_Card = () => {
  const [newsData, setNewsData] = useState([]);

  useEffect(() => {
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
        setNewsData(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  return (
    <Stack className="mt-5" gap={4}>
      {newsData.slice(0, 10).map((item) => (
        <Row
          key={item.id}
          className="border border-end-0 border border-start-0 border border-1"
          style={{ maxHeight: "400px", maxWidth: "100%", overflow: "hidden" }}
        >
          <Col md={3} className="d-inline-flex" style={{ height: "100%" }}>
            <a style={{ color: "white" }} href={item.url}>
              <img
                src={item.image}
                alt="News"
                style={{ objectFit: "cover", width: "100%", height: "100%" }}
              />
            </a>
          </Col>
          <Col className="d-table-row">
            <h3 className="font-weight-bold">{item.title}</h3>
            <p>{item.description}</p>
            <a style={{ color: "white" }} href={item.link}>
              Read More
            </a>
          </Col>
        </Row>
      ))}
    </Stack>
  );
};

export { News_Card as NC };
