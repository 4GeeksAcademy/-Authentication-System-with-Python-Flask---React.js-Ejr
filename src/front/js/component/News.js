import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import "../../styles/home.css";
import { NC } from "./news_card.jsx";

const NewsCard = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch("https://videogames-news2.p.rapidapi.com/videogames_news/recent", {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "43a16cc10emsh7ff0e79b253cf89p197848jsnd06fbc992b41",
        "X-RapidAPI-Host": "videogames-news2.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((data) => setArticles(data));
  }, []);

  const handleMouseOver = (e) => {
    e.currentTarget.querySelector(".card-img").classList.remove("blur");
    e.currentTarget.querySelector(".card-img > div").classList.add("visible");
  };

  const handleMouseOut = (e) => {
    e.currentTarget.querySelector(".card-img").classList.add("blur");
    e.currentTarget
      .querySelector(".card-img > div")
      .classList.remove("visible");
  };

  return (
    <>
      <Container fluid className="d-flex justify-content-center">
        <Container style={{ color: "white" }}>
          <Row>
            {articles.slice(0, 2).map((article) => (
              <Col key={article.id}>
                <Card
                  style={{ width: "600px", height: "500px" }}
                  className="hover-card"
                  onMouseOver={handleMouseOver}
                  onMouseOut={handleMouseOut}
                >
                  <div
                    className="card-img"
                    style={{
                      backgroundImage: `url(${article.image})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center center",
                      backgroundSize: "cover",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    <div
                      className="position-absolute top-0 bottom-0 left-0 right-0"
                      style={{ backgroundColor: "#1b1b1b", opacity: 0.8 }}
                    >
                      <Card.Body style={{ color: "white" }}>
                        <Card.Title className="card-title">
                          {article.title}
                        </Card.Title>
                        <Card.Text className="card-text">
                          {article.description}
                        </Card.Text>
                        <a
                          className="card-text"
                          style={{ color: "white" }}
                          href={article.link}
                        >
                          Read More
                        </a>
                      </Card.Body>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
      <Container
        fluid
        className="d-flex justify-content-center mt-5"
        style={{ color: "white" }}
      >
        <NC />
      </Container>
    </>
  );
};

export { NewsCard as News };
