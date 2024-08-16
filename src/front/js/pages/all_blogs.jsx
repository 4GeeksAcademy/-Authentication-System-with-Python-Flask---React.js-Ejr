import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const All_Blogs = props => {
    const { store, actions } = useContext(Context);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(process.env.BACKEND_URL + "api/blog");
                const data = await response.json();
                console.log(data.data); // Verifica aquí los datos
                setBlogs(data.data);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };
    
        fetchBlogs();
    }, []);

    return (
        <div className="container">
            <h1 className="display-4 mb-4">All Blogs</h1>
            <div className="d-flex overflow-auto">
                {blogs.map(blog => (
                    <div key={blog.id} className="card me-3" style={{ minWidth: '250px', maxWidth: '250px' }}>
                        <img src={blog.img_header} className="card-img-top" alt={blog.title} />
                        <div className="card-body">
                            <h5 className="card-title">{blog.title}</h5>
                            <p className="card-text">
                                {blog.text_intro ? blog.text_intro : blog.text}
                            </p>
                            <Link to={`/blog/${blog.type}/${blog.id}`} className="btn btn-primary">
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            <Link to="/" className="btn btn-secondary mt-3">
                Back home
            </Link>
            <Link to="/new_blog" className="btn btn-secondary mt-3">
                New Blog
            </Link>
        </div>
    );
};

All_Blogs.propTypes = {
    match: PropTypes.object
};
