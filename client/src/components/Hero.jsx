import React, { useEffect, useRef, useState } from 'react';
import ParticleBackground from './ParticleBackground';
import useFormSubmit from '../hooks/useFormSubmit';

const Hero = () => {
    const titleRef = useRef(null);
    const [titleText, setTitleText] = useState('');
    const originalText = "Best Web Design Company & SEO Experts in Mumbai";
    const { loading, error, success, responseMessage, submitForm } = useFormSubmit();

    useEffect(() => {
        // Typing effect
        const typingSpeed = 50;
        let currentIndex = 0;

        // Start after a small delay
        const timeout = setTimeout(() => {
            const interval = setInterval(() => {
                if (currentIndex < originalText.length) {
                    setTitleText(originalText.substring(0, currentIndex + 1) + '|');
                    currentIndex++;
                } else {
                    setTitleText(originalText); // Remove cursor at end
                    clearInterval(interval);
                }
            }, typingSpeed);

            return () => clearInterval(interval);
        }, 300);

        return () => clearTimeout(timeout);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Combine phone number
        if (data.phone) {
            data.fullPhone = `${data.countryCode} ${data.phone}`;
        }

        await submitForm(data, 'heroForm');
    };

    return (
        <section id="home" className="hero">
            <ParticleBackground />
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1 className="hero-title" ref={titleRef} style={{ minHeight: '1.2em' }}>{titleText}</h1>
                        <p className="hero-subtitle">Viral Inbound is Mumbai's trusted partner for web design and SEO services. We combine expert web design with comprehensive SEO optimization to help businesses across Mumbai and India achieve measurable growth online.</p>
                        <p className="hero-supporting">Our team builds responsive websites, implements AI-powered SEO strategies, and creates digital marketing campaigns that actually work. We focus on results that matter: more visibility, better rankings, and real business growth.</p>
                        <div className="hero-ctas">
                            <a href="https://cal.com/viralinbound" className="btn btn-primary btn-large" target="_blank" rel="noopener noreferrer">Book a Strategy Call</a>
                            <a href="#contact" className="btn btn-secondary btn-large">Get a Free Website & SEO Audit</a>
                        </div>
                    </div>
                    <form className="hero-form" id="heroForm" noValidate onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <input type="text" id="heroFirstName" name="firstName" placeholder="First Name" required />
                            </div>
                            <div className="form-group">
                                <input type="text" id="heroLastName" name="lastName" placeholder="Last Name" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="email" id="heroEmail" name="email" placeholder="Your Email" required />
                        </div>
                        <div className="form-group">
                            <input type="text" id="heroCompany" name="company" placeholder="Company Name" required />
                        </div>
                        <div className="form-group">
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'stretch' }}>
                                <select id="heroCountryCode" name="countryCode" style={{ width: '90px', minWidth: '90px', padding: '0.75rem', border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: 'var(--radius-sm)', background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)', fontSize: 'var(--font-size-sm)', flexShrink: 0 }}>
                                    <option value="+91">+91</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    <option value="+61">+61</option>
                                    <option value="+971">+971</option>
                                    <option value="+65">+65</option>
                                    <option value="+86">+86</option>
                                    <option value="+81">+81</option>
                                    <option value="+49">+49</option>
                                    <option value="+33">+33</option>
                                    <option value="+34">+34</option>
                                    <option value="+39">+39</option>
                                    <option value="+31">+31</option>
                                    <option value="+46">+46</option>
                                    <option value="+47">+47</option>
                                    <option value="+41">+41</option>
                                    <option value="+32">+32</option>
                                    <option value="+351">+351</option>
                                    <option value="+353">+353</option>
                                    <option value="+358">+358</option>
                                    <option value="+45">+45</option>
                                    <option value="+48">+48</option>
                                    <option value="+420">+420</option>
                                    <option value="+43">+43</option>
                                    <option value="+30">+30</option>
                                    <option value="+27">+27</option>
                                    <option value="+55">+55</option>
                                    <option value="+52">+52</option>
                                    <option value="+54">+54</option>
                                    <option value="+82">+82</option>
                                    <option value="+60">+60</option>
                                    <option value="+66">+66</option>
                                    <option value="+62">+62</option>
                                    <option value="+63">+63</option>
                                    <option value="+84">+84</option>
                                    <option value="+64">+64</option>
                                </select>
                                <input type="tel" id="heroPhone" name="phone" placeholder="Phone Number" required style={{ flex: 1, minWidth: 0, padding: '0.75rem', border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: 'var(--radius-sm)', background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)', fontSize: 'var(--font-size-base)' }} />
                            </div>
                        </div>
                        <div className="form-group">
                            <textarea id="heroMessage" name="message" rows="5" placeholder="Tell us about your project" required></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%' }} disabled={loading}>
                            {loading ? 'Requesting...' : 'Request a Callback'}
                        </button>
                        {error && <div className="form-message error" style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
                        {success && <div className="form-message success" style={{ color: 'green', marginTop: '1rem' }}>{responseMessage}</div>}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Hero;
