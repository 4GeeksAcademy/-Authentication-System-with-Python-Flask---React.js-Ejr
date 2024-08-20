import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/edit_blog.css";

export const New_Blog = props => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    
    const [blogType, setBlogType] = useState("recipe");
    const [formData, setFormData] = useState({
        author: "",
        title: "",
        img_header: "",
        img_final: "",
        source: "",
        text_intro: "",
        text_ingredients: "",
        text_steps: "",
        text: ""
    });

    useEffect(() => {
        if (!store.token) {
            navigate('/login');
            return;
        }
    }, [store.token, navigate]);

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
    
        if (!formData.author || !formData.title || !formData.img_header || !formData.img_final || !formData.source) {
            console.error("Required fields are missing");
            return;
        }
    
        if (blogType === "recipe" && (!formData.text_intro || !formData.text_ingredients || !formData.text_steps)) {
            console.error("Required 'Recipe' fields are missing");
            return;
        }
    
        if (blogType === "news" && !formData.text) {
            console.error("Required 'News' fields are missing");
            return;
        }

        try {
            const response = await fetch(process.env.BACKEND_URL + "api/new_blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${store.token}`  
                },
                body: JSON.stringify({
                    type: blogType,
                    ...formData
                })
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("Blog created successfully:", data);
                navigate("/blog");
            } else {
                const errorData = await response.json();
                console.error("Error creating Blog:", errorData);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container edit-blog-container">
            <h1 className="display-4">New Blog</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group edit-blog-form">
                    <label htmlFor="type">Blog Type</label>
                    <select
                        name="type"
                        value={blogType}
                        onChange={e => setBlogType(e.target.value)}
                        className="form-control"
                    >
                        <option value="recipe">Recipe</option>
                        <option value="news">News</option>
                    </select>
                </div>

                <div className="form-group edit-blog-form">
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group edit-blog-form">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group edit-blog-form">
                    <label htmlFor="img_header">Header Image URL</label>
                    <input
                        type="text"
                        name="img_header"
                        value={formData.img_header}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                {blogType === "recipe" && (
                    <>
                        <div className="form-group edit-blog-form">
                            <label htmlFor="text_intro">Introduction</label>
                            <textarea
                                name="text_intro"
                                value={formData.text_intro}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group edit-blog-form">
                            <label htmlFor="text_ingredients">Ingredients</label>
                            <textarea
                                name="text_ingredients"
                                value={formData.text_ingredients}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group edit-blog-form">
                            <label htmlFor="text_steps">Steps</label>
                            <textarea
                                name="text_steps"
                                value={formData.text_steps}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>
                    </>
                )}

                {blogType === "news" && (
                    <div className="form-group edit-blog-form">
                        <label htmlFor="text">Content</label>
                        <textarea
                            name="text"
                            value={formData.text}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                )}

                <div className="form-group edit-blog-form">
                    <label htmlFor="img_final">Final Image URL</label>
                    <input
                        type="text"
                        name="img_final"
                        value={formData.img_final}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group edit-blog-form">
                    <label htmlFor="source">Source</label>
                    <input
                        type="text"
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary edit-blog-btn-save">
                    Create Blog
                </button>
            </form>

            <Link to="/blog">
                <span className="btn btn-secondary mt-3 edit-blog-btn-save" role="button">
                    All Blogs
                </span>
            </Link>
        </div>
    );
};

New_Blog.propTypes = {
    match: PropTypes.object
};
