import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export const BlogDetail = () => {
    const { type, id } = useParams(); // Obtiene el tipo y el ID del blog desde los parámetros de la URL
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await fetch(`${process.env.BACKEND_URL}api/blog/${type}/${id}`);
                const data = await response.json();
                if (data.msg === 'OK') {
                    setBlog(data.data);
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
    }, [type, id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <div className="container">
            <h1 className="display-4">{blog.title}</h1>
            <img src={blog.img_header} className="img-fluid mb-3" alt={blog.title} />
            <p><strong>Author:</strong> {blog.author}</p>
            <p><strong>Source:</strong> {blog.source}</p>
            <div>
                {blog.text_intro && <p><strong>Introduction:</strong> {blog.text_intro}</p>}
                {blog.text_ingredients && <p><strong>Ingredients:</strong> {blog.text_ingredients}</p>}
                {blog.text_steps && <p><strong>Steps:</strong> {blog.text_steps}</p>}
                {blog.text && <p><strong>Content:</strong> {blog.text}</p>}
            </div>
            <img src={blog.img_final} className="img-fluid mt-3" alt="Final" />
            <Link to="/blog" className="btn btn-secondary mt-3">
                Back to all blogs
            </Link>
        </div>
    );
};
