import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchService } from '../api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import Stats from '../components/Stats';
import WhyChoose from '../components/WhyChoose';
import Expertise from '../components/Expertise';
import FAQ from '../components/FAQ';
import ClientLogos from '../components/ClientLogos';
import Projects from '../components/Projects';
import useFormSubmit from '../hooks/useFormSubmit';

const ServiceContactForm = () => {
    const { loading, error, success, responseMessage, submitForm } = useFormSubmit();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        if (data.phone) {
            data.fullPhone = `${data.countryCode} ${data.phone}`;
        }
        await submitForm(data, 'serviceHeroForm');
    };

    return (
        <form className="hero-form" onSubmit={handleSubmit} noValidate>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Get Your Free Consultation</h3>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: '#666' }}>
                Speak with our experts to see how we can help you grow.
            </p>

            <div className="form-group">
                <input type="text" name="name" placeholder="Your Name" required />
            </div>
            <div className="form-group">
                <input type="email" name="email" placeholder="Work Email" required />
            </div>
            <div className="form-group">
                <div style={{ display: 'flex', gap: '10px' }}>
                    <select name="countryCode" style={{ width: '80px', padding: '10px' }}>
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                    </select>
                    <input type="tel" name="phone" placeholder="Phone Number" required style={{ flex: 1 }} />
                </div>
            </div>
            <div className="form-group">
                <input type="text" name="website" placeholder="Company Website" required />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                {loading ? 'Submitting...' : 'Book My Call Now'}
            </button>

            {error && <div className="form-message error">{error}</div>}
            {success && <div className="form-message success">{responseMessage}</div>}
        </form>
    );
};

const SingleService = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getService = async () => {
            try {
                const { data } = await fetchService(id);
                setService(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching service:", error);
                setLoading(false);
            }
        };

        getService();
    }, [id]);

    if (loading) return (
        <>
            <Header />
            <div className="loading-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <div className="spinner">Loading...</div>
            </div>
            <Footer />
        </>
    );

    if (!service) return (
        <>
            <Header />
            <div className="error-container" style={{ textAlign: 'center', padding: '5rem' }}>
                <h2>Service not found</h2>
                <Link to="/services" className="btn btn-primary">Back to Services</Link>
            </div>
            <Footer />
        </>
    );

    return (
        <>
            <ParticleBackground />
            <Header />
            <main className="single-service-page">
                {/* Hero Section */}
                <section className="hero">
                    <div className="container hero-content">
                        <div className="hero-text">
                            <span className="hero-subtitle-badge" style={{
                                display: 'inline-block',
                                padding: '5px 15px',
                                backgroundColor: '#f0f0f0',
                                borderRadius: '20px',
                                fontSize: '0.875rem',
                                fontWeight: '500',
                                marginBottom: '1rem',
                                color: '#333'
                            }}>
                                {service.subHeading || "Professional Services"}
                            </span>
                            <h1 className="hero-title">{service.title}</h1>
                            <p className="hero-supporting">{service.description}</p>

                            <div className="hero-badges" style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                                {/* Placeholders for badges like 'Rated 5 Stars', 'Certified', etc. */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.875rem' }}>
                                    <span style={{ color: '#FFD700' }}>★★★★★</span> 5.0/5 Rating
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.875rem' }}>
                                    <span>✓</span> Verified Experts
                                </div>
                            </div>
                        </div>
                        <div className="hero-form-wrapper">
                            <ServiceContactForm />
                        </div>
                    </div>
                </section>

                {/* Trusted By Section */}
                <ClientLogos />

                {/* About Section */}
                <section className="service-about" style={{ padding: '6rem 0' }}>
                    <div className="container">
                        <div className="service-about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                            <div className="service-about-media">
                                {service.icon && service.icon.trim().startsWith('<svg') ? (
                                    <div dangerouslySetInnerHTML={{ __html: service.icon }} style={{ width: '100%', height: 'auto', maxHeight: '400px' }} />
                                ) : (
                                    <img
                                        src={service.icon || '/images/placeholder-service.jpg'}
                                        alt={service.title}
                                        style={{ width: '100%', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
                                    />
                                )}
                            </div>
                            <div className="service-about-content">
                                <h2>About This Service</h2>
                                <div className="service-long-description" style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#4a4a4a' }}>
                                    {service.longDescription ? (
                                        <p style={{ whiteSpace: 'pre-line' }}>{service.longDescription}</p>
                                    ) : (
                                        <p>{service.description}</p>
                                    )}
                                </div>
                                {service.ctaText && (
                                    <Link to="#contact" className="btn btn-primary" style={{ marginTop: '2rem' }}>
                                        {service.ctaText}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <Stats stats={service.stats && service.stats.length > 0 ? service.stats : undefined} />

                {/* Why Choose Us */}
                <WhyChoose items={service.whyChooseUs && service.whyChooseUs.length > 0 ? service.whyChooseUs : undefined} />

                {/* Success Stories / Projects */}
                <Projects />

                {/* Expertise / What We Do */}
                <Expertise
                    title={`Our ${service.title} Expertise`}
                    items={service.expertise && service.expertise.length > 0 ? service.expertise : undefined}
                />

                {/* FAQ Section */}
                <FAQ items={service.faqs && service.faqs.length > 0 ? service.faqs : undefined} />

            </main>
            <Footer />
        </>
    );
};

export default SingleService;
