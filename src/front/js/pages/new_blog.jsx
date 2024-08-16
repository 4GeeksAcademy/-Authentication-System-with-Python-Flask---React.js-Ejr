import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

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

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async e => {
        e.preventDefault();
    
        // Validación básica
        if (!formData.author || !formData.title || !formData.img_header || !formData.img_final || !formData.source) {
            console.error("Faltan campos obligatorios");
            return;
        }
    
        if (blogType === "recipe" && (!formData.text_intro || !formData.text_ingredients || !formData.text_steps)) {
            console.error("Faltan campos obligatorios en la receta");
            return;
        }
    
        if (blogType === "news" && !formData.text) {
            console.error("Falta el contenido para las noticias");
            return;
        }
    
        // Crea el objeto de datos a enviar
        const dataToSend = {
            type: blogType,
            ...formData
        };
    
        try {
            const response = await fetch(process.env.BACKEND_URL + "api/new_blog", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // Eliminar autorización si no se requiere en esta fase
                    // Authorization: `Bearer ${store.token}`
                },
                body: JSON.stringify(dataToSend)
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log("Blog creado con éxito:", data);
                navigate("/blog");
            } else {
                const errorData = await response.json();
                console.error("Error al crear el blog:", errorData);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="container">
            <h1 className="display-4">NEW BLOG</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
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

                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
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
                        <div className="form-group">
                            <label htmlFor="text_intro">Introduction</label>
                            <textarea
                                name="text_intro"
                                value={formData.text_intro}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="text_ingredients">Ingredients</label>
                            <textarea
                                name="text_ingredients"
                                value={formData.text_ingredients}
                                onChange={handleChange}
                                className="form-control"
                            />
                        </div>

                        <div className="form-group">
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
                    <div className="form-group">
                        <label htmlFor="text">Content</label>
                        <textarea
                            name="text"
                            value={formData.text}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="img_final">Final Image URL</label>
                    <input
                        type="text"
                        name="img_final"
                        value={formData.img_final}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="source">Source</label>
                    <input
                        type="text"
                        name="source"
                        value={formData.source}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Create Blog
                </button>
            </form>

            <Link to="/blog">
                <span className="btn btn-secondary mt-3" role="button">
                    All Blogs
                </span>
            </Link>
        </div>
    );
};

New_Blog.propTypes = {
    match: PropTypes.object
};
