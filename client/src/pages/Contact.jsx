import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import useFormSubmit from '../hooks/useFormSubmit';
import './Contact.css';

const Contact = () => {
    const { loading, error, success, responseMessage, submitForm } = useFormSubmit();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Combine phone number
        if (data.phone) {
            data.fullPhone = `${data.countryCode} ${data.phone}`;
        }

        await submitForm(data, 'contactPageForm');
    };

    return (
        <div className="contact-page-wrapper">
            <Header />
            <main className="contact-page">
                <section className="contact-left">
                    <ParticleBackground />
                    <div className="contact-left-content">
                        <h1>Let's start a project together</h1>
                        <p className="contact-subtitle">
                            We help ambitious brands scale with viral content and strategic inbound marketing.
                        </p>

                        <div className="contact-info">
                            <div className="contact-info-group">
                                <span className="contact-info-label">Email</span>
                                <a href="mailto:kevin@viralinbound.com" className="contact-info-value">kevin@viralinbound.com</a>
                            </div>

                            <div className="contact-info-group">
                                <span className="contact-info-label">Phone</span>
                                <a href="tel:+918920879485" className="contact-info-value">+91-8920879485</a>
                            </div>

                            <div className="contact-info-group">
                                <span className="contact-info-label">Office</span>
                                <div className="contact-info-value address">
                                    <div className="contact-address-item">
                                        <strong>Mumbai:</strong> Wework Enam Sambhav, BKC Mumbai, Maharashtra 400051
                                    </div>
                                    <div className="contact-address-item">
                                        <strong>Bengaluru:</strong> BHIVE, CMH Road, Indiranagar, Bengaluru, Karnataka 560038
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="contact-right">
                    <div className="contact-right-content">
                        <h2 className="contact-right-title">Send us a message</h2>
                        <form className="hero-form" id="contactPageForm" noValidate onSubmit={handleSubmit} style={{
                            background: '#fff',
                            boxShadow: '0 10px 50px rgba(0,0,0,0.1)',
                            border: '1px solid #f0f0f0',
                            padding: '3rem'
                        }}>
                            <div className="form-row">
                                <div className="form-group">
                                    <input type="text" id="contactFirstName" name="firstName" placeholder="First Name" required />
                                </div>
                                <div className="form-group">
                                    <input type="text" id="contactLastName" name="lastName" placeholder="Last Name" required />
                                </div>
                            </div>
                            <div className="form-group">
                                <input type="email" id="contactEmail" name="email" placeholder="Your Email" required />
                            </div>
                            <div className="form-group">
                                <input type="text" id="contactCompany" name="company" placeholder="Company Name" required />
                            </div>
                            <div className="form-group">
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'stretch' }}>
                                    <select id="contactCountryCode" name="countryCode" style={{ width: '90px', minWidth: '90px', padding: '0.75rem', border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: 'var(--radius-sm)', background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)', fontSize: 'var(--font-size-sm)', flexShrink: 0 }}>
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
                                    <input type="tel" id="contactPhone" name="phone" placeholder="Phone Number" required style={{ flex: 1, minWidth: 0, padding: '0.75rem', border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: 'var(--radius-sm)', background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)', fontSize: 'var(--font-size-base)' }} />
                                </div>
                            </div>
                            <div className="form-group">
                                <textarea id="contactMessage" name="message" rows="5" placeholder="Tell us about your project" required></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%' }} disabled={loading}>
                                {loading ? 'Requesting...' : 'Request a Callback'}
                            </button>
                            {error && <div className="form-message error" style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
                            {success && <div className="form-message success" style={{ color: 'green', marginTop: '1rem' }}>{responseMessage}</div>}
                        </form>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Contact;
