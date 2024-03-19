import React, { useState, useEffect, useContext, createContext } from "react";
import "../../styles/home.css";
import { Container, Row, Col, Card, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";


// Creamos un contexto para almacenar los libros favoritos
const FavoritesContext = React.createContext();

export const Home = () => {
  const { store, actions } = useContext(Context);
  const [popularBooks, setPopularBooks] = useState([]);
  const [romanceBooks, setRomanceBooks] = useState([]);
  const [suspenseBooks, setSuspenseBooks] = useState([]);

  useEffect(() => {
    fetchBooksByCategory('popular', setPopularBooks);
    fetchBooksByCategory('romance', setRomanceBooks);
    fetchBooksByCategory('suspense', setSuspenseBooks);
  }, []);

  // 3 Libros por Carrusel
  const chunkBooks = (books, size) => {
    const chunked = [];
    for (let i = 0; i < books.length; i += size) {
      chunked.push(books.slice(i, i + size));
    }
    return chunked;
  };

  return (
    <Container>
      {popularBooks.length > 0 && (
        <BookCarousel title="Popular Books" books={chunkBooks(popularBooks, 3)} />
      )}
      {romanceBooks.length > 0 && (
        <BookCarousel title="Romance Books" books={chunkBooks(romanceBooks, 3)} />
      )}
      {suspenseBooks.length > 0 && (
        <BookCarousel title="Suspense Books" books={chunkBooks(suspenseBooks, 3)} />
      )}
      {/* Repite el componente BookCarousel para las otras secciones... */}
    </Container>
  );
};

const BookCarousel = ({ title, books }) => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className="mb-5">
      <h2>{title}</h2>
      <Carousel activeIndex={index} onSelect={handleSelect} indicators={false} nextLabel="" prevLabel="">
        {books.map((bookGroup, idx) => (
          <Carousel.Item key={idx}>
            <Row xs={1} md={3} className="g-4">
              {bookGroup.map((book) => (
                <Col key={book.key}>
                  <BookCard book={book} />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

const BookCard = ({ book }) => {
  return (
    <Card className="d-flex flex-column h-100">
      <Card.Img variant="top" src={`https://covers.openlibrary.org/b/id/${book.cover_id ? book.cover_id : 'default'}-M.jpg`} />
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.authors[0].name}</Card.Text>
        <Link to={`/books${book.key}`}>
          <button className="btn btn-success">VIEW BOOK</button>
        </Link>
      </Card.Body>
    </Card>
  );
};
const fetchBooksByCategory = async (category, setter) => {
  try {
    const response = await fetch(`https://openlibrary.org/subjects/${category}.json?limit=6`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setter(data.works);
  } catch (error) {
    console.error('Error fetching books:', error);
  }
};

export default Home;
