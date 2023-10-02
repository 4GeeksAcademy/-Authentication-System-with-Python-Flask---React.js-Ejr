import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const OurBooks = () => {
    const { store, actions } = useContext(Context);
    const [genres, setGenres] = useState([]);
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {

        actions.getAllBooks(booksData => {
            setBooks(booksData);
        });
        actions.getGenres(setGenres);
    }, []);

    const getCurrentPageBooks = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return books.slice(startIndex, endIndex);
    };

    return (
        <div className="container mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="title">
                            <h1>Our Books</h1>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="search_bar_wishlist">
                            <form className="d-flex justify-content-end">
                                <div className="dropdown mx-5">
                                    <button
                                        className="btn alert-info-decline dropdown-toggle"
                                        type="button"
                                        id="genreDropdown"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        style={{ borderRadius: "15px" }}
                                    >
                                        Select Genre
                                    </button>
                                    <ul className="dropdown-menu overflow-scroll" aria-labelledby="genreDropdown" style={{ height: "250px" }}>
                                        {genres.map((genre, index) => (
                                            <li key={index}>
                                                <a className="dropdown-item" href="#">
                                                    {genre.display_name}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div class="input-group" style={{ width: "230px" }}>
                                    <input class="form-control border-end-0 border" type="text" value="search" id="example-search-input" />
                                    <span class="input-group-append">
                                        <button class="btn btn-outline-secondary border-start-0 border-bottom-0 border ms-n5" type="button">
                                            <i class="fa fa-search"></i>
                                        </button>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <hr className="my-4 bold-hr" />
            </div>
            {getCurrentPageBooks().map((book, index) => (
                <div key={index}>
                        <div className="books" style={{ width: "50rem" }}>
                            <div className="card_wishlist">
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img src={book.book_image} className="card-img-top my-2" alt="..." style={{ height: "40", width: "10rem" }} />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title" style={{ margin: "20px 0" }}>
                                                {book.title}
                                            </h5>
                                            <p className="card-author" style={{ margin: "10px 0" }}>
                                                {book.author}
                                            </p>
                                            <div className="my-4 row">
                                                <div className="col">
                                                    <a href="#" className="paper_plane">
                                                        <i className="far fa-paper-plane"></i> Request Swap
                                                    </a>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col">
                                                    <Link to="/book_details" className="view_more">
                                                        <i className="fas fa-plus"></i> View More
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                </div>
            ))}

            <div className="next_page text-end">
                <button
                    className="btn btn-link"
                    onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous Page
                </button>
                <span className="mx-2">Page {currentPage}</span>
                <button
                    className="btn btn-link"
                    onClick={() => setCurrentPage(prevPage => prevPage + 1)}
                    disabled={currentPage === Math.ceil(books.length / itemsPerPage)}
                >
                    Next Page
                </button>
            </div>
        </div>
    );
};