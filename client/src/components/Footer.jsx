import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <img src="/images/VI Logo.png" alt="Viral Inbound - Best Web Design Company & Best SEO Company in Mumbai" className="footer-logo" />
                            <p>Full-service digital growth agency helping B2B companies scale through strategic SEO, web design, and performance marketing.</p>
                            <div className="footer-social">
                                <a href="https://x.com/viralinbound" target="_blank" rel="noopener noreferrer" aria-label="Follow us on X (Twitter)" style={{ display: 'inline-block', textDecoration: 'none', width: '32px', height: '32px' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>
                                <a href="https://linkedin.com/company/viralinbound" target="_blank" rel="noopener noreferrer" aria-label="Follow us on LinkedIn" style={{ display: 'inline-block', textDecoration: 'none', width: '32px', height: '32px' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                                <a href="https://instagram.com/viralinbound" target="_blank" rel="noopener noreferrer" aria-label="Follow us on Instagram" style={{ display: 'inline-block', textDecoration: 'none', width: '32px', height: '32px' }}>
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className="footer-section">
                            <h4>Navigation</h4>
                            <ul className="footer-links">
                                <li><a href="#team">Our Team</a></li>
                                <li><a href="#process">Process</a></li>
                                <li><a href="#testimonials">Testimonials</a></li>
                                <li><a href="#careers">Careers</a></li>
                                <li><a href="#contact">Contact Us</a></li>
                                <li><a href="#faq">FAQ's</a></li>
                                <li><a href="#life">Life @ Viral Inbound</a></li>
                                <li><a href="#viral-log">Viral Log</a></li>
                                <li><Link to="/blogs">Blog</Link></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4>Services</h4>
                            <ul className="footer-links">
                                <li><a href="#branding">Branding</a></li>
                                <li><a href="#web-design">Web Design</a></li>
                                <li><a href="#ui-ux-design">UI/UX Design</a></li>
                                <li><a href="#web-development">Web Development</a></li>
                                <li><a href="#ecommerce-seo">E-Commerce SEO</a></li>
                                <li><a href="#local-seo">Local SEO</a></li>
                                <li><a href="#enterprise-seo">Enterprise SEO</a></li>
                                <li><a href="#white-label-seo">White Label SEO</a></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4>Contact</h4>
                            <ul className="footer-contact">
                                <li><a href="mailto:hello@viralinbound.com" style={{ color: 'inherit', textDecoration: 'none' }}>hello@viralinbound.com</a></li>
                                <li><a href="tel:+15551234567" style={{ color: 'inherit', textDecoration: 'none' }}>+1 (555) 123-4567</a></li>
                                <li style={{ marginTop: 'var(--spacing-sm)' }}>123 Business Street, Suite 100<br />City, State 12345</li>
                                <li style={{ marginTop: 'var(--spacing-sm)' }}>9:30-6:30 IST (Mon-Fri)</li>
                            </ul>
                            <div style={{ marginTop: 'var(--spacing-md)' }} className="footer-whatsapp">
                                <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ display: 'inline-block', textDecoration: 'none' }}>WhatsApp Us</a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <div className="footer-bottom-links">
                            <a href="#privacy-policy">Privacy Policy</a>
                            <a href="#terms-conditions">Terms & Conditions</a>
                            <a href="#about-us">About Us</a>
                        </div>
                        <p>&copy; 2026 Viral Inbound. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            <button
                id="scrollToTop"
                className={`scroll-to-top ${showScrollTop ? 'visible' : ''}`}
                aria-label="Scroll to top"
                onClick={scrollToTop}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>

            <nav className="mobile-bottom-nav" aria-label="Mobile quick actions">
                <a href="tel:+15551234567" className="mobile-nav-btn" aria-label="Call us">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22 16.92v3.02a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3.02a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7a2 2 0 0 1 1.72 2.03z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Call</span>
                </a>
                <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer" className="mobile-nav-btn" aria-label="WhatsApp us">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.98 2.898a9.825 9.825 0 012.853 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    <span>WhatsApp</span>
                </a>
                <a href="mailto:hello@viralinbound.com" className="mobile-nav-btn" aria-label="Email us">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Email</span>
                </a>
                <button
                    id="mobileScrollToTop"
                    className="mobile-nav-btn"
                    aria-label="Scroll to top"
                    onClick={scrollToTop}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 15l-6-6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>Up</span>
                </button>
            </nav>
        </>
    );
};

export default Footer;
