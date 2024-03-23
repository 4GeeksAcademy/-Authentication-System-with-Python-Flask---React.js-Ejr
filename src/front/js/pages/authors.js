import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AuthorsPage = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch('https://openlibrary.org/authors.json');
        const data = await response.json(); // Convertir la respuesta a JSON
        setAuthors(data.authors);
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    };
  
    fetchAuthors();
  }, []);

  return (
    <div>
      <h1>List of Authors</h1>
      <ul>
        {authors.map(author => (
          <li key={author.key}>
            <Link to={`/author/${author.key}`}>{author.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AuthorsPage;
