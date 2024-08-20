import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import "../../styles/all_blogs.css";

export const All_Recipes = props => {
    const { store, actions } = useContext(Context);
    const [blogs, setBlogs] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(process.env.BACKEND_URL + "api/blog");
                const data = await response.json();
                
                const filteredBlogs = data.data.filter(blog => blog.type === 'recipe');
                
                setBlogs(filteredBlogs);
            } catch (error) {
                console.error("Error fetching blogs:", error);
            }
        };

        const checkAdminStatus = async () => {
            try {
                const response = await fetch(process.env.BACKEND_URL + "api/check_admin", {
                    headers: {
                        'Authorization': `Bearer ${store.token}` 
                    }
                });
                const data = await response.json();
                setIsAdmin(data.is_admin);
            } catch (error) {
                console.error("Error checking admin status:", error);
            }
        };

        fetchBlogs();
        checkAdminStatus();
    }, [store.token]);

    return (
        <div className="container all-blogs-container">
            <h1 className="display-4 mb-4 all-blogs-title">Blog</h1>
            <div className="d-flex overflow-auto">
                {blogs.length > 0 ? (
                    blogs.map(blog => (
                        <div key={blog.id} className="card me-3 all-blogs-card" style={{ minWidth: '300px', maxWidth: '300px' }}>
                            <img src={blog.img_header} className="card-img-top" alt={blog.title} style={{ width: '300px', height: '300px', objectFit: 'cover' }} />
                            <div className="card-body">
                                <h5 className="card-title">{blog.title}</h5>
                                <p className="card-text">
                                    {blog.text_intro ? blog.text_intro : blog.text}
                                </p>
                                <div className="all-blogs-btn-container">
                                    <Link to={`/blog/${blog.type}/${blog.id}`} className="btn btn-primary all-blogs-btn">
                                        Learn More
                                    </Link>
                                    {isAdmin && (
                                        <div className="mt-2">
                                            <Link to={`/edit_blog/${blog.type}/${blog.id}`} className="btn btn-warning me-2 all-blogs-btn">
                                                <FontAwesomeIcon icon={faPencil} />
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-found">
                        <p>No recipes found.</p>
                    </div>
                )}
            </div>
            {isAdmin && (
                <Link to="/new_blog" className="btn btn-secondary mt-3 all-blogs-btn">
                    New Blog
                </Link>
            )}
        </div>
    );
};

All_Recipes.propTypes = {
    match: PropTypes.object
};
