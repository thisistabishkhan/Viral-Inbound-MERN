import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPortfolio } from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import './Portfolio.css';

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadPortfolio();
    }, []);

    const loadPortfolio = async () => {
        try {
            const { data } = await fetchPortfolio();
            setPortfolio(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to load portfolio');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <ParticleBackground />
                <Header />
                <main className="portfolio-page">
                    <div className="container">
                        <div className="loading">Loading portfolio...</div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    if (error) {
        return (
            <>
                <ParticleBackground />
                <Header />
                <main className="portfolio-page">
                    <div className="container">
                        <div className="error">{error}</div>
                    </div>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <ParticleBackground />
            <Header />
            <main className="portfolio-page">
                <div className="container">
                    <div className="page-header">
                        <h1 className="page-title">Portfolio</h1>
                    </div>

                    {portfolio.length === 0 ? (
                        <p className="no-items">No portfolio items yet.</p>
                    ) : (
                        <div className="portfolio-grid">
                            {portfolio.map((item) => (
                                <Link
                                    to={`/portfolio/${item.slug || item.id}`}
                                    key={item.id}
                                    className="portfolio-card"
                                >
                                    <div className="portfolio-card-image">
                                        <img src={item.imageUrl} alt={item.title} />
                                    </div>
                                    <div className="portfolio-card-content">
                                        <h3 className="portfolio-card-title">{item.title}</h3>
                                        <span className="portfolio-card-link">View Case Study →</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Portfolio;
