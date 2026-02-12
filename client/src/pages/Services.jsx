import React, { useState, useEffect } from 'react';
import { fetchServices } from '../api';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getServices = async () => {
            try {
                const { data } = await fetchServices();
                setServices(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching services:", error);
                setLoading(false);
            }
        };

        getServices();
    }, []);

    return (
        <>
            <ParticleBackground />
            <Header />
            <main className="services-page">
                <section className="page-hero">
                    <div className="container">
                        <h1 className="page-title">Our Services</h1>
                        <p className="page-subtitle">Comprehensive digital solutions to help your business grow.</p>
                    </div>
                </section>

                <section className="services-list-section">
                    <div className="container">
                        {loading ? (
                            <div className="loading">Loading services...</div>
                        ) : (
                            <div className="services-grid">
                                {services.map((service) => (
                                    <article key={service._id} className="service-card">
                                        <div className="service-icon">
                                            {service.icon && service.icon.trim().startsWith('<svg') ? (
                                                <div dangerouslySetInnerHTML={{ __html: service.icon }} />
                                            ) : (
                                                <img src={service.icon} alt={service.title} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                                            )}
                                        </div>
                                        <div className="service-content">
                                            <h3>{service.title}</h3>
                                            <p>{service.description.substring(0, 150)}...</p>
                                            <Link to={`/services/${service._id}`} className="service-link">Learn More →</Link>
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

export default Services;
