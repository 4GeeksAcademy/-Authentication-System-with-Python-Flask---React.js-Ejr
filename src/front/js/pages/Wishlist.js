import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Wishlist = () => {
    const { actions } = useContext(Context);
    const [books, setBooks] = useState([]);
    const [userInformation, setUserInformation] = useState(null)
    const [userWishlist, setUserWishlist] = useState([])

    useEffect(() => {
        actions.getUserInformation().then((data) => {
            if (data) {
                setUserInformation(data);
                actions.UserWishlist(data.user_id).then((data) => {
                    setUserWishlist(data);
                    actions.getAllBooks(booksData => {
                        setBooks(booksData);
                    });
                });
            }
        });

    }, [])


    return (
        <div className="container mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <div className="title">
                            <h1>My Wishlist</h1>
                        </div>
                    </div>
                    {/* Commented out the search bar section
                    <div className="col-6">
                        <div className="search_bar_wishlist">
                            <form className="d-flex justify-content-end">
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
                    */}
                </div>
                <hr className="my-4 bold-hr" />
            </div>
            {userWishlist.map((item) => (
                <div className="book_whislist" style={{ width: "50rem" }} >
                    <div className="card_wishlist">
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={item.book.cover_img} className="card-img-top" alt="..." />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body">
                                    <h5 className="card-title" style={{ margin: "20px 0" }}>{item.book.title}</h5>
                                    <p className="card-author" style={{ margin: "10px 0" }}>{item.book.author}</p>
                                    <div className="my-4 row">
                                        <div className="col">
                                            <Link to={`/book-details/${item.book.book_id}`} className="view_more">
                                                <i className="fas fa-plus"></i> View More
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <a href="#" className="trash"><i className="far fa-trash-alt"></i> Remove</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            <div className="next_page text-end">
                <span>Next Page</span>
            </div>
        </div>
    );
}


