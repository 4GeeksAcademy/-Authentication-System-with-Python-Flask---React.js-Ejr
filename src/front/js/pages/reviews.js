import React, { useState, useContext } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { FavoritesContext } from "./home";


const Reviews = () => {
  const { bookKey } = useParams(); // Obtener el ID del libro de los parámetros de la URL
  const { favorites } = useContext(FavoritesContext);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  // Función para manejar el envío del comentario
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar el comentario y la calificación a tu backend
    console.log("Comentario:", comment);
    console.log("Calificación:", rating);
    // Limpia el formulario después del envío
    setComment("");
    setRating(0);
  };

  // Encuentra el libro por su ID en la lista de libros favoritos
  const book = favorites.find((book) => book.key === bookKey);

  if (!book) {
    return <div>Libro no encontrado</div>;
  }

  return (
    <Container>
      <Row>
        <Col className="col-6">
          {/* Mostrar la portada del libro en la primera columna */}
          <img
            src={`https://covers.openlibrary.org/b/id/${book.cover_id ? book.cover_id : 'default'}-L.jpg`}
            alt="Portada del libro"
            className="img-fluid"
          />
        </Col>
        <Col className="col-6">
          {/* Mostrar el formulario de comentario en la segunda columna */}
          <Card>
            <Card.Body>
              <Card.Title>{book.title}</Card.Title>
              <Card.Text>{book.author_name}</Card.Text>
              {/* Formulario de comentario */}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="comment">
                  <Form.Label>Deja tu comentario</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="rating">
                  <Form.Label>Calificación</Form.Label>
                  <Form.Control
                    as="select"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value={0}>Selecciona una calificación</option>
                    <option value={1}>1 estrella</option>
                    <option value={2}>2 estrellas</option>
                    <option value={3}>3 estrellas</option>
                    <option value={4}>4 estrellas</option>
                    <option value={5}>5 estrellas</option>
                  </Form.Control>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Enviar comentario
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Reviews;
