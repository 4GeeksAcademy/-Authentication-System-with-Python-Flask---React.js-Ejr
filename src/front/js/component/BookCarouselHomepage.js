import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";

export const BookCarouselHomepage = () => {
    const { store, actions } = useContext(Context);
    const [books, setBooks] = useState([]);
    const itemsPerSlide = 7; 

    useEffect(() => {
        actions.getAllBooksCaroussel(booksData => {
            setBooks(booksData);
        });
    }, []);

    const chunkArray = (arr, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
            chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
    };

    const bookChunks = chunkArray(books, itemsPerSlide);


    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-12">
                    <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {bookChunks.map((chunk, chunkIndex) => (
                                <div key={chunkIndex} className={`carousel-item ${chunkIndex === 0 ? 'active' : ''}`}>
                                    <div className="d-flex justify-content-between">
                                        {chunk.map((book, index) => (
                                            <img
                                                key={index}
                                                src={book.book_image}
                                                className="d-block"
                                                alt={`Book ${index + 1}`}
                                                style={{
                                                    width: "100px", 
                                                    height: "150px", 
                                                }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button id="custom-next-button" className="carousel-control-prev custom-carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span className="fas fa-chevron-left" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button id="custom-next-button" className="carousel-control-next custom-carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span className="fas fa-chevron-right" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
