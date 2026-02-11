import React, { useState, useEffect } from 'react';
import { fetchBlogs } from '../api';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const { data } = await fetchBlogs();
                setBlogs(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching blogs:", error);
                setLoading(false);
            }
        };

        getBlogs();
    }, []);

    return (
        <>
            <ParticleBackground />
            <Header />
            <main className="blogs-page">
                <section className="page-hero">
                    <div className="container">
                        <h1 className="page-title">Insights & Resources</h1>
                        <p className="page-subtitle">Expert insights on SEO, Web Design, and Digital Growth.</p>
                    </div>
                </section>

                <section className="blogs-list-section">
                    <div className="container">
                        {loading ? (
                            <div className="loading">Loading insights...</div>
                        ) : (
                            <div className="blogs-grid">
                                {blogs.map((blog) => (
                                    <article key={blog._id} className="insight-card">
                                        {blog.imageUrl && (
                                            <div className="insight-image">
                                                <img src={blog.imageUrl} alt={blog.title} />
                                            </div>
                                        )}
                                        <div className="insight-content">
                                            {blog.tags && blog.tags.length > 0 && (
                                                <span className="insight-category">{blog.tags[0]}</span>
                                            )}
                                            <h3>{blog.title}</h3>
                                            <p>{blog.content.replace(/<[^>]+>/g, '').substring(0, 150)}...</p>
                                            <Link to={`/blogs/${blog._id}`} className="insight-link">Read More →</Link>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Blogs;
