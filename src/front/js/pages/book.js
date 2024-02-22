import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

const BookDetails = () => {
  const { id } = useParams(); // Obtén el parámetro de la URL que contiene el ID del libro
  const [bookDetails, setBookDetails] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const response = await fetch(`https://openlibrary.org/works/${id}.json`);
        if (!response.ok) {
          throw new Error('meee');
        }
        const data = await response.json();
        setBookDetails(data);
      } catch (error) {
        console.error('meee', error);
      }
    };

    fetchBookDetails();
  }, [id]);

  if (!bookDetails) {
    return <div>Cargando cargando librito</div>;
  }

  return (
    <Container>
      <Row>
        <Col md={4}>
          <img src={`https://covers.openlibrary.org/b/id/${bookDetails.cover_id}-L.jpg`} alt="Portada del libro" />
        </Col>
        <Col md={8}>
          <h2>{bookDetails.title}</h2>
          <p>Autor: {bookDetails.author_name}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default BookDetails;
