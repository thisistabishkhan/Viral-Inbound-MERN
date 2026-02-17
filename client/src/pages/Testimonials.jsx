import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import './Testimonials.css';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/testimonials');
                setTestimonials(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching testimonials:', error);
                setIsLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    return (
        <>
            <ParticleBackground />
            <Header />
            <main className="testimonials-page">
                <div className="container">
                    <header className="testimonials-hero">
                        <h1 className="page-title">Client Success Stories</h1>
                        <p className="page-subtitle">Don't just take our word for it. Hear from the businesses we've helped scale through specialized web design and AI-driven SEO.</p>
                    </header>

                    {isLoading ? (
                        <div className="loading">Loading testimonials...</div>
                    ) : (
                        <div className="testimonials-page-grid">
                            {testimonials.length > 0 ? (
                                testimonials.map((testimonial) => (
                                    <div key={testimonial.id} className="testimonial-card test-page-card">
                                        <div className="testimonial-content">
                                            <p>"{testimonial.content}"</p>
                                        </div>
                                        <div className="testimonial-author">
                                            <strong>{testimonial.name}</strong>
                                            <span>{testimonial.position}{testimonial.company ? `, ${testimonial.company}` : ''}</span>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No testimonials available at the moment.</p>
                            )}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </>
    );
};

export default Testimonials;
