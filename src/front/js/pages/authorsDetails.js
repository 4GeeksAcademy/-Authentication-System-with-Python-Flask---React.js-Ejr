import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AuthorDetailPage = () => {
  const { authorKey } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooksByAuthor = async () => {
      try {
        const response = await axios.get(`https://openlibrary.org/authors/${authorKey}.json`);
        // Corrige la línea siguiente para acceder a los libros (works) del autor
        setBooks(response.data.works);
      } catch (error) {
        console.error('Error fetching books by author:', error);
      }
    };

    fetchBooksByAuthor();
  }, [authorKey]);

  return (
    <div>
      <h1>Books by Author</h1>
      <ul>
        {books.map(book => (
          <li key={book.key}>
            {/* Aquí puedes mostrar la información del libro */}
            {/* Por ejemplo, book.title, book.cover_image, etc. */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorDetailPage;
