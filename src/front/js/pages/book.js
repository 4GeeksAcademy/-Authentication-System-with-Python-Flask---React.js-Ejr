import React from "react";
import { useParams } from "react-router-dom";

const BookDetails = () => {
  const { id, title, author, publishDate } = useParams();

  return (
    <div>
      <h2>Detalles del Libro</h2>
      <img src={`https://covers.openlibrary.org/b/id/${id}-L.jpg`} alt="Portada del libro" />
      <h3>Título: {title}</h3>
      <p>Autor: {author}</p>
      <p>Año de Publicación: {publishDate}</p>
      {/* Aquí puedes mostrar más detalles del libro si es necesario */}
    </div>
  );
};

export default BookDetails;
