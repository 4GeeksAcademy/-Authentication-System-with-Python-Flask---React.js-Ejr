import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams, Link } from "react-router-dom"; // Importa Link desde react-router-dom
import { Container } from "react-bootstrap";
import { Context } from "../store/appContext";
import debounce from 'lodash.debounce';

export const BookDetails = () => {
    const { id } = useParams();
    const { store, actions } = useContext(Context);
    const [bookDetails, setBookDetails] = useState(null);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        // Fetch book details when the component mounts
        fetchBookDetails();
    }, [id]);

    const fetchBookDetails = async () => {
        try {
            const response = await fetch(`https://openlibrary.org/works/${id}.json`);
            if (!response.ok) {
                throw new Error("Error fetching book details");
            }
            const data = await response.json();
            setBookDetails(data);
            // Fetch author details only if bookDetails is not null
            if (data && data.authors && data.authors[0]) {
                authorDetails(data.authors[0].author.key);
            }
        } catch (error) {
            console.error('Error fetching book details:', error);
        }
    };

    const authorDetails = useCallback(debounce(async (authorKey) => {
        try {
            const details = await fetch(`https://openlibrary.org${authorKey}.json`);
            const authorData = await details.json();
            setAuthor(authorData);
        } catch (error) {
            console.error("Error fetching author details:", error);
        }
    }, 500), []);

    if (!author) {
        return <div>Cargando</div>;
    } else {
        return (
            <Container>
                <div className="container-fluid d-flex bg-light"> 
                    <div className="m-2">
                        <img src={`https://covers.openlibrary.org/b/id/${bookDetails.covers}-L.jpg`} alt="Portada del libro" />
                    </div>
                    <div>
                        <h2>{bookDetails.title}</h2>
                        <p>Autor: {author.name}</p>
                        <p>Año de publicacion: {bookDetails.first_publish_date}</p>
                        <p>Descripcion:{bookDetails.description}</p>
                        <p>ISBN: {bookDetails.isbn}</p>
                        <Link to={`/books/${id}/reviews`}>
                            <button className="btn btn-success">DEJAR RESEÑA</button>
                        </Link>
                    </div>
                    
                </div>
            </Container>
        );
    }
};

export default BookDetails;
