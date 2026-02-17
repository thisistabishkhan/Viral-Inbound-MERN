import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPortfolioItem } from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import './SinglePortfolio.css';

const SinglePortfolio = () => {
    const { slug } = useParams();
    const [portfolio, setPortfolio] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadPortfolio();
    }, [slug]);

    const loadPortfolio = async () => {
        try {
            const { data } = await fetchPortfolioItem(slug);
            setPortfolio(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Portfolio item not found');
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <>
                <ParticleBackground />
                <Header />
                <main className="single-portfolio-page">
                    <div className="loading">Loading...</div>
                </main>
                <Footer />
            </>
        );
    }

    if (error || !portfolio) {
        return (
            <>
                <ParticleBackground />
                <Header />
                <main className="single-portfolio-page">
                    <div className="container">
                        <div className="error">{error || 'Portfolio item not found'}</div>
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
            <main className="single-portfolio-page">
                {/* Featured Image Hero Section with White Card */}
                {portfolio.imageUrl && (
                    <div className="portfolio-hero">
                        <img src={portfolio.imageUrl} alt={portfolio.title} className="portfolio-hero-image" />
                        <div className="portfolio-hero-overlay">
                            <div className="portfolio-hero-card">
                                <h1 className="portfolio-hero-title">{portfolio.title}</h1>
                                <div className="portfolio-hero-divider"></div>
                                {portfolio.client && (
                                    <p className="portfolio-hero-client">{portfolio.client}</p>
                                )}
                                {portfolio.description && (
                                    <p className="portfolio-hero-description">{portfolio.description}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Subtitle Section - Removed, now in hero card */}

                {/* Image Gallery - Vertical Stack, showing all images (Boxed Width) */}
                {portfolio.gallery && portfolio.gallery.length > 0 && (
                    <div className="portfolio-gallery container">
                        {portfolio.gallery.map((imageUrl, index) => (
                            <div key={index} className="gallery-image-wrapper">
                                <img
                                    src={imageUrl}
                                    alt={`${portfolio.title} - Image ${index + 1}`}
                                    className="gallery-image"
                                />
                            </div>
                        ))}
                    </div>
                )}

            </main>
            <Footer />
        </>
    );
};

export default SinglePortfolio;
