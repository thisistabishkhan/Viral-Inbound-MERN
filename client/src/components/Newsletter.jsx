import React from 'react';
import useFormSubmit from '../hooks/useFormSubmit';

const Newsletter = () => {
    const { loading, error, success, responseMessage, submitForm } = useFormSubmit();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        await submitForm(data, 'newsletterForm');
    };

    return (
        <section className="newsletter-section" style={{ padding: 'var(--spacing-lg) 0' }}>
            <div className="container">
                <div className="newsletter-content" style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Join Our Growth Newsletter</h2>
                    <p className="section-subtitle" style={{ fontSize: '1.125rem', color: '#4a4a4a', marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
                        Get the latest SEO strategies, design trends, and digital marketing insights delivered straight to your inbox. No spam, just value.
                    </p>

                    <div className="newsletter-card" style={{
                        background: '#ffffff',
                        borderRadius: '24px',
                        marginTop: '2rem'
                    }}>
                        <form className="newsletter-form" id="newsletterForm" noValidate onSubmit={handleSubmit} style={{
                            display: 'flex',
                            gap: '1rem',
                            margin: '0 auto',
                            alignItems: 'center'
                        }}>
                            <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                                <input
                                    type="email"
                                    id="newsletterEmail"
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '1rem 1.5rem',
                                        borderRadius: '12px',
                                        border: '1px solid #e5e5e5',
                                        background: '#fff',
                                        fontSize: '1rem',
                                        color: '#1a1a1a',
                                        outline: 'none'
                                    }}
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                disabled={loading}
                                style={{
                                    padding: '1rem 2rem',
                                    borderRadius: '12px',
                                    background: '#000000',
                                    color: '#ffffff',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                    fontWeight: '500',
                                    whiteSpace: 'nowrap',
                                    height: '54px' // Match input height roughly
                                }}
                            >
                                {loading ? 'Subscribing...' : 'Subscribe'}
                            </button>
                        </form>

                        {error && <div className="form-message error" style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
                        {success && <div className="form-message success" style={{ color: 'green', marginTop: '1rem' }}>{responseMessage}</div>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
