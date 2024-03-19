import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";

const Reviews = () => {
  const { id } = useParams(); // Obtener el ID del libro de los parámetros de la URL
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

  return (
    <Container>
      <Row>
        <Col className="col-6">
          {/* Mostrar la portada del libro en la primera columna */}
          {/* Puedes agregar aquí la portada del libro si lo deseas */}
        </Col>
        <Col className="col-6">
          {/* Mostrar el formulario de comentario en la segunda columna */}
          <Card>
            <Card.Body>
              <h1>Título del Libro</h1>
              <p>Autor del Libro</p>
              {/* Formulario de comentario */}
              <Form onSubmit={handleSubmit}>
                <div controlId="comment">
                  <label>Deja tu comentario</label>
                  <input
                    as="textarea"
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div controlId="rating">
                  <label>Calificación</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value={0}>Selecciona una calificación</option>
                    <option value={1}>1 estrella</option>
                    <option value={2}>2 estrellas</option>
                    <option value={3}>3 estrellas</option>
                    <option value={4}>4 estrellas</option>
                    <option value={5}>5 estrellas</option>
                  </select>
                </div>
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
