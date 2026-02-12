import React from 'react';
import useFormSubmit from '../hooks/useFormSubmit';

const LeadMagnet = () => {
    const { loading, error, success, responseMessage, submitForm } = useFormSubmit();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Combine phone number
        if (data.phone) {
            data.fullPhone = `${data.countryCode} ${data.phone}`;
        }

        await submitForm(data, 'leadMagnetForm');
    };

    return (
        <section className="lead-magnet">
            <div className="container">
                <div className="lead-magnet-content">
                    <h2>Get the AI-Led Digital Growth Guide</h2>
                    <p>Learn how modern businesses are using SEO, design, and performance marketing together to drive predictable growth.</p>
                    <form className="lead-magnet-form" id="leadMagnetForm" noValidate onSubmit={handleSubmit}>
                        <div className="form-row">
                            <div className="form-group">
                                <input type="text" id="leadFirstName" name="firstName" placeholder="First Name" required />
                            </div>
                            <div className="form-group">
                                <input type="text" id="leadLastName" name="lastName" placeholder="Last Name" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="email" id="leadEmail" name="email" placeholder="Enter your email" required />
                        </div>
                        <div className="form-group">
                            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'stretch' }}>
                                <select id="leadCountryCode" name="countryCode" style={{ width: '90px', minWidth: '90px', padding: '0.75rem', border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: 'var(--radius-sm)', background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)', fontSize: 'var(--font-size-sm)', flexShrink: 0 }}>
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
                                <input type="tel" id="leadPhone" name="phone" placeholder="Phone Number" required style={{ flex: 1, minWidth: 0, padding: '0.75rem', border: '1px solid rgba(0, 0, 0, 0.2)', borderRadius: 'var(--radius-sm)', background: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(10px)', fontSize: 'var(--font-size-base)' }} />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
                            {loading ? 'Processing...' : 'Download the Free Guide'}
                        </button>
                        {error && <div className="form-message error" style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
                        {success && <div className="form-message success" style={{ color: 'green', marginTop: '1rem' }}>{responseMessage}</div>}
                    </form>
                </div>
            </div>
        </section>
    );
};

export default LeadMagnet;
