import React from 'react';

const ContactCTA = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert("Contact form submitted! (Simulation)");
    };

    return (
        <section id="contact" class="final-cta">
            <div class="container">
                <h2 class="section-title">Get Your Free SEO Audit</h2>
                <p class="section-subtitle">Get a free, comprehensive SEO audit that reveals exactly what's preventing your website from ranking higher and converting more visitors. We'll analyze your technical SEO, on-page optimization, performance metrics, and conversion opportunities. Then we'll deliver actionable recommendations within 5 to 7 business days. We help businesses across Mumbai improve their online visibility and drive real growth.</p>
                <form class="contact-form" id="contactForm" novalidate onSubmit={handleSubmit}>
                    <div class="form-row">
                        <div class="form-group">
                            <input type="text" id="contactFirstName" name="firstName" placeholder="First Name" required />
                        </div>
                        <div class="form-group">
                            <input type="text" id="contactLastName" name="lastName" placeholder="Last Name" required />
                        </div>
                    </div>
                    <div class="form-group">
                        <input type="email" id="contactEmail" name="email" placeholder="Your Email" required />
                    </div>
                    <div class="form-group">
                        <input type="url" id="contactWebsite" name="website" placeholder="https://yourwebsite.com" required />
                    </div>
                    <div class="form-group">
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
                    <div class="form-group">
                        <input type="text" id="contactCompany" name="company" placeholder="Company Name" required />
                    </div>
                    <button type="submit" class="btn btn-primary btn-large" style={{ width: '100%' }}>Get My Free SEO Audit</button>
                    <div class="form-message" id="contactFormMessage"></div>
                </form>
            </div>
        </section>
    );
};

export default ContactCTA;
