import React from 'react';

const Insights = () => {
    return (
        <section id="insights" class="insights">
            <div class="container">
                <h2 class="section-title">Insights, Strategies & Growth Playbooks</h2>
                <p class="section-subtitle">We share practical insights on SEO, web design, UX, branding, and performance marketing to help businesses stay ahead in a rapidly evolving digital landscape.</p>
                <div class="insights-grid">
                    <div class="insights-track">
                        {/* Original Items */}
                        <article class="insight-card">
                            <span class="insight-category">SEO</span>
                            <h3>The Future of AI-Powered SEO</h3>
                            <p>How artificial intelligence is transforming search engine optimization and what it means for your content strategy.</p>
                            <a href="#" class="insight-link">Read More →</a>
                        </article>
                        <article class="insight-card">
                            <span class="insight-category">Web Design</span>
                            <h3>Conversion-Focused Design Principles</h3>
                            <p>Key design principles that drive conversions and improve user experience on modern websites.</p>
                            <a href="#" class="insight-link">Read More →</a>
                        </article>
                        <article class="insight-card">
                            <span class="insight-category">Marketing</span>
                            <h3>LinkedIn Marketing for B2B Growth</h3>
                            <p>Strategic approaches to LinkedIn marketing that generate qualified leads and build brand authority.</p>
                            <a href="#" class="insight-link">Read More →</a>
                        </article>
                        <article class="insight-card">
                            <span class="insight-category">SEO</span>
                            <h3>Technical SEO Checklist for 2026</h3>
                            <p>Essential technical SEO improvements that can dramatically boost your rankings and improve user experience.</p>
                            <a href="#" class="insight-link">Read More →</a>
                        </article>
                        <article class="insight-card">
                            <span class="insight-category">Web Design</span>
                            <h3>Mobile-First Design Best Practices</h3>
                            <p>How to create mobile-optimized experiences that convert visitors and rank well in search engines.</p>
                            <a href="#" class="insight-link">Read More →</a>
                        </article>
                        <article class="insight-card">
                            <span class="insight-category">Marketing</span>
                            <h3>Google Ads Optimization Strategies</h3>
                            <p>Proven tactics to reduce CAC and improve ROI in Google Ads campaigns for better performance marketing results.</p>
                            <a href="#" class="insight-link">Read More →</a>
                        </article>
                        <article class="insight-card">
                            <span class="insight-category">SEO</span>
                            <h3>Content Marketing That Converts</h3>
                            <p>How to create SEO-optimized content that not only ranks but also drives qualified leads and conversions.</p>
                            <a href="#" class="insight-link">Read More →</a>
                        </article>
                        <article class="insight-card">
                            <span class="insight-category">Web Design</span>
                            <h3>E-commerce UX Design Principles</h3>
                            <p>Key UX design principles for e-commerce sites that improve conversions and reduce cart abandonment rates.</p>
                            <a href="#" class="insight-link">Read More →</a>
                        </article>

                        {/* Duplicated Items for Infinite Loop */}
                        <article class="insight-card">
                            <span class="insight-category">SEO</span>
                            <h3>The Future of AI-Powered SEO</h3>
                            <p>How artificial intelligence is transforming search engine optimization and what it means for your content strategy.</p>
                            <a href="#" class="insight-link">Read More →</a>
                        </article>
                        <article class="insight-card">
                            <span class="insight-category">Web Design</span>
                            <h3>Conversion-Focused Design Principles</h3>
                            <p>Key design principles that drive conversions and improve user experience on modern websites.</p>
                            <a href="#" class="insight-link">Read More →</a>
                        </article>
                        <article class="insight-card">
                            <span class="insight-category">Marketing</span>
                            <h3>LinkedIn Marketing for B2B Growth</h3>
                            <p>Strategic approaches to LinkedIn marketing that generate qualified leads and build brand authority.</p>
                            <a href="#" class="insight-link">Read More →</a>
                        </article>
                        <article class="insight-card">
                            <span class="insight-category">SEO</span>
                            <h3>Technical SEO Checklist for 2026</h3>
                            <p>Essential technical SEO improvements that can dramatically boost your rankings and improve user experience.</p>
                            <a href="#" class="insight-link">Read More →</a>
                        </article>
                        <article class="insight-card">
                            <span class="insight-category">Web Design</span>
                            <h3>Mobile-First Design Best Practices</h3>
                            <p>How to create mobile-optimized experiences that convert visitors and rank well in search engines.</p>
                            <a href="#" class="insight-link">Read More →</a>
                        </article>
                        <article class="insight-card">
                            <span class="insight-category">Marketing</span>
                            <h3>Google Ads Optimization Strategies</h3>
                            <p>Proven tactics to reduce CAC and improve ROI in Google Ads campaigns for better performance marketing results.</p>
                            <a href="#" class="insight-link">Read More →</a>
                        </article>
                        <article class="insight-card">
                            <span class="insight-category">SEO</span>
                            <h3>Content Marketing That Converts</h3>
                            <p>How to create SEO-optimized content that not only ranks but also drives qualified leads and conversions.</p>
                            <a href="#" class="insight-link">Read More →</a>
                        </article>
                        <article class="insight-card">
                            <span class="insight-category">Web Design</span>
                            <h3>E-commerce UX Design Principles</h3>
                            <p>Key UX design principles for e-commerce sites that improve conversions and reduce cart abandonment rates.</p>
                            <a href="#" class="insight-link">Read More →</a>
                        </article>
                    </div>
                </div>
                <div class="section-cta section-cta-dual">
                    <a href="#insights" class="btn btn-primary">Read Our Blog</a>
                    <a href="#contact" class="btn btn-secondary">Subscribe for Growth Insights</a>
                </div>
            </div>
        </section>
    );
};

export default Insights;
