import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/testimonials/featured');
                // If there are no featured testimonials, optionally fall back to all or a subset
                if (response.data.length === 0) {
                    const allResponse = await axios.get('http://localhost:5000/api/testimonials');
                    setTestimonials(allResponse.data.slice(0, 8));
                } else {
                    setTestimonials(response.data);
                }
            } catch (error) {
                console.error('Error fetching testimonials:', error);
            }
        };
        fetchFeatured();
    }, []);

    // Helper to render testimonials (original + duplicate for infinite loop)
    const renderTestimonialCards = (items) => {
        if (!items || items.length === 0) return null;

        // We need at least enough items to fill the track and scroll
        // Duplicate the items to create the infinite scroll effect
        const displayItems = [...items, ...items];

        return displayItems.map((item, index) => (
            <div key={`${item.id}-${index}`} className="testimonial-card">
                <div className="testimonial-content">
                    <p>"{item.content}"</p>
                </div>
                <div className="testimonial-author">
                    <strong>{item.name}</strong>
                    <span>{item.position}{item.company ? `, ${item.company}` : ''}</span>
                </div>
            </div>
        ));
    };

    return (
        <section className="testimonials">
            <div className="container">
                <h2 className="section-title">What Our Clients Say</h2>
                <p className="section-subtitle">Hear from businesses that have transformed their digital presence with Viral Inbound</p>
                <div className="testimonials-grid">
                    <div className="testimonials-track">
                        {testimonials.length > 0 ? renderTestimonialCards(testimonials) : (
                            <p>Loading testimonial excellence...</p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};


export default Testimonials;
