import React from 'react';

const Newsletter = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert("Newsletter subscription submitted! (Simulation)");
    };

    return (
        <section class="newsletter-section">
            <div class="container">
                <div class="newsletter-content">
                    <h2 class="section-title">Stay Updated with Growth Insights</h2>
                    <p class="section-subtitle">Get the latest SEO strategies, web design tips, and growth marketing insights delivered to your inbox.</p>
                    <form class="newsletter-form" id="newsletterForm" novalidate onSubmit={handleSubmit}>
                        <div class="form-row">
                            <div class="form-group">
                                <input type="text" id="newsletterFirstName" name="firstName" placeholder="First Name" required />
                            </div>
                            <div class="form-group">
                                <input type="text" id="newsletterLastName" name="lastName" placeholder="Last Name" required />
                            </div>
                        </div>
                        <div class="form-group">
                            <input type="email" id="newsletterEmail" name="email" placeholder="Your email" required />
                        </div>
                        <div class="form-group">
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'stretch' }}>
                                <select id="newsletterCountryCode" name="countryCode" style={{ width: '90px', minWidth: '90px', padding: '0.75rem', border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: 'var(--radius-sm)', background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)', fontSize: 'var(--font-size-sm)', flexShrink: 0 }}>
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
                                <input type="tel" id="newsletterPhone" name="phone" placeholder="Phone Number" required style={{ flex: 1, minWidth: 0, padding: '0.75rem', border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: 'var(--radius-sm)', background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)', fontSize: 'var(--font-size-base)' }} />
                            </div>
                        </div>
                        <button type="submit" class="btn btn-primary btn-large">Subscribe</button>
                        <div class="form-message" id="newsletterFormMessage"></div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
