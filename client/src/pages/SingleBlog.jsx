import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios'; // We can use direct axios or extend API
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

const SingleBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBlog = async () => {
            try {
                // Using the specific endpoint for fetching by ID from routes/blogs.js
                // Assuming GET /:id is implemented
                const { data } = await axios.get(`/api/blogs/${id}`);
                setBlog(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blog:", error);
                setLoading(false);
            }
        };

        getBlog();
    }, [id]);

    if (loading) return (
        <>
            <Header />
            <div className="loading-container">Loading...</div>
            <Footer />
        </>
    );

    if (!blog) return (
        <>
            <Header />
            <div className="error-container">Blog post not found.</div>
            <Footer />
        </>
    );

    return (
        <>
            <ParticleBackground />
            <Header />
            <main className="single-blog-page">
                <article className="blog-post">
                    <div className="container">
                        <header className="blog-header">
                            <div className="blog-meta">
                                {blog.tags && blog.tags.map(tag => (
                                    <span key={tag} className="blog-tag">{tag}</span>
                                ))}
                                <span className="blog-date">{new Date(blog.date).toLocaleDateString()}</span>
                            </div>
                            <h1 className="blog-title">{blog.title}</h1>
                            {blog.author && <p className="blog-author">By {blog.author}</p>}
                        </header>

                        {blog.imageUrl && (
                            <div className="blog-featured-image">
                                <img src={blog.imageUrl} alt={blog.title} />
                            </div>
                        )}

                        <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }}>
                            {/* CAUTION: Using dangerouslySetInnerHTML. Ensure content is sanitized if user-submitted. */}
                        </div>

                        <div className="blog-footer">
                            <Link to="/blogs" className="btn btn-secondary">← Back to Insights</Link>
                        </div>
                    </div>
                </article>
            </main>
            <Footer />
        </>
    );
};

export default SingleBlog;
