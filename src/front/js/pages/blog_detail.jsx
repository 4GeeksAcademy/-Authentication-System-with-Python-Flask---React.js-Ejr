import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faTag } from '@fortawesome/free-solid-svg-icons';
import "../../styles/blog_detail.css";


export const BlogDetail = () => {
    const { type, id } = useParams();
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
        <div className="container blog-detail-container-bg">
            <div className="container blog-detail-container">
                <img src={blog.img_header} className="img-fluid mb-3 img-header" alt={blog.title} />
                <h1 className="display-4">{blog.title}</h1>
                <div className="blog-detail-legend">
                    <p><strong><FontAwesomeIcon icon={faUser} /></strong> {blog.author}</p>
                    <p><strong><FontAwesomeIcon icon={faTag} /></strong> {blog.source}</p>
                </div>
                <div className="blog-detail-text">
                    {blog.text_intro && <p>{blog.text_intro}</p>}
                    <div className="blog-detail-text-ingredients">{blog.text_ingredients && <p><strong>Ingredients:</strong> {blog.text_ingredients}</p>}</div>
                    {blog.text_steps && <p>{blog.text_steps}</p>}
                    {blog.text && <p>{blog.text}</p>}
                </div>
                <img src={blog.img_final} className="img-fluid mt-3 blog-detail-container-img-final" alt="Final" />
                <div className="blog-detail-btn-container">
                    <Link to="/blog" className="btn btn-secondary mt-3 blog-detail-btn">
                        ...
                    </Link>
                </div>
            </div>
        </div>
    );
};
