import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; 
import "../../styles/edit_blog.css";

export const EditBlog = () => {
    const { store } = useContext(Context); 
    const { type, id } = useParams(); 
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        title: '',
        img_header: '',
        img_final: '',
        source: '',
        text_intro: '',
        text_ingredients: '',
        text_steps: '',
        text: ''
    });
    const navigate = useNavigate();

    useEffect(() => {

        if (!store.token) {
            navigate('/login');
            return;
        }

        const fetchBlog = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}api/blog/${type}/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${store.token}`
                    }
                });
                const data = await response.json();
                if (data.msg === 'OK') {
                    setBlog(data.data);
                    setFormData({
                        title: data.data.title,
                        img_header: data.data.img_header,
                        img_final: data.data.img_final,
                        source: data.data.source,
                        text_intro: data.data.text_intro || '',
                        text_ingredients: data.data.text_ingredients || '',
                        text_steps: data.data.text_steps || '',
                        text: data.data.text || ''
                    });
                } else {
                    console.error("Blog not found");
                }
            } catch (error) {
                console.error("Error fetching blog:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlog();
    }, [type, id, store.token, navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.BACKEND_URL}api/edit_blog/${type}/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${store.token}`
                },
                body: JSON.stringify({
                    type,
                    ...formData
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Blog updated successfully:", data);
                navigate(`/blog/${type}/${id}`); 
            } else {
                const errorData = await response.json();
                console.error("Failed to update blog:", errorData);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}api/delete_blog/${type}/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${store.token}`
                }
            });

            if (response.ok) {
                console.log("Blog deleted successfully");
                navigate('/blog'); 
            } else {
                const errorData = await response.json();
                console.error("Failed to delete blog:", errorData);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <div className="container edit-blog-container">
            <h1 className="display-4">Edit Blog</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group edit-blog-form">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="form-control"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group edit-blog-form">
                    <label htmlFor="img_header">Header Image URL</label>
                    <input
                        type="text"
                        id="img_header"
                        name="img_header"
                        className="form-control"
                        value={formData.img_header}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group edit-blog-form">
                    <label htmlFor="img_final">Final Image URL</label>
                    <input
                        type="text"
                        id="img_final"
                        name="img_final"
                        className="form-control"
                        value={formData.img_final}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group edit-blog-form">
                    <label htmlFor="source">Source</label>
                    <input
                        type="text"
                        id="source"
                        name="source"
                        className="form-control"
                        value={formData.source}
                        onChange={handleChange}
                    />
                </div>
                {type === 'recipe' && (
                    <>
                        <div className="form-group edit-blog-form">
                            <label htmlFor="text_intro">Introduction</label>
                            <textarea
                                id="text_intro"
                                name="text_intro"
                                className="form-control"
                                rows="3"
                                value={formData.text_intro}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group edit-blog-form">
                            <label htmlFor="text_ingredients">Ingredients</label>
                            <textarea
                                id="text_ingredients"
                                name="text_ingredients"
                                className="form-control"
                                rows="3"
                                value={formData.text_ingredients}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group edit-blog-form">
                            <label htmlFor="text_steps">Steps</label>
                            <textarea
                                id="text_steps"
                                name="text_steps"
                                className="form-control"
                                rows="5"
                                value={formData.text_steps}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                )}
                {type === 'news' && (
                    <div className="form-group edit-blog-form">
                        <label htmlFor="text">Content</label>
                        <textarea
                            id="text"
                            name="text"
                            className="form-control"
                            rows="5"
                            value={formData.text}
                            onChange={handleChange}
                        />
                    </div>
                )}
                <div className="edit-blog-btn-container">
                <button type="submit" className="btn btn-primary edit-blog-btn-save">Save Changes</button>
                <button type="button" className="btn btn-danger ml-3 edit-blog-btn-delete" onClick={handleDelete}>Delete Blog</button>
                </div>
            </form>
        </div>
    );
};
