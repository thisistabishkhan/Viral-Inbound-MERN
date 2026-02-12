import React, { useState } from 'react';

const FAQ = ({ items }) => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFAQ = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const defaultFaqData = [
        {
            question: "Do you work with startups and established businesses?",
            answer: "Yes. We work with startups, SMEs, and growing brands looking to scale sustainably."
        },
        {
            question: "Do you offer only SEO or full digital services?",
            answer: "We offer full-stack digital growth services including SEO, web, UI/UX, branding, and paid marketing."
        },
        {
            question: "Which platforms do you specialize in?",
            answer: "Shopify, WordPress, Webflow, Wix, Framer, and custom solutions based on business needs."
        },
        {
            question: "How do we get started?",
            answer: "Getting started is simple. You can book a free strategy call where we'll discuss your business goals, current challenges, and how we can help. Alternatively, request a free website and SEO audit to get a comprehensive analysis of your current digital presence. Both options help us understand your needs and provide tailored recommendations for your growth journey."
        },
        {
            question: "How long does it take to see results from SEO?",
            answer: "SEO results typically begin to show within 3-6 months, with more significant improvements visible after 6-12 months of consistent optimization. However, this timeline varies based on your industry competitiveness, current website authority, and the scope of work. Technical SEO improvements and content optimization often show faster results, while building domain authority and ranking for competitive keywords takes longer. We provide monthly progress reports so you can track improvements in rankings, traffic, and conversions throughout the process."
        },
        {
            question: "What is AI-driven SEO and how is it different from traditional SEO?",
            answer: "AI-driven SEO leverages artificial intelligence and machine learning to analyze search patterns, user intent, and content performance at scale. Unlike traditional SEO that relies heavily on manual keyword research and optimization, AI-driven SEO uses advanced tools to identify emerging search trends, optimize content for AI-powered search engines, and adapt strategies in real-time. This approach helps us create content that aligns with how modern search engines understand and rank content, including optimization for AI search features like featured snippets, voice search, and answer engine optimization (AEO)."
        },
        {
            question: "Do you provide ongoing support and maintenance?",
            answer: "Yes, we offer comprehensive ongoing support and maintenance packages. Our services include regular website updates, security monitoring, performance optimization, content updates, SEO monitoring and adjustments, analytics reporting, and technical support. We believe in building long-term partnerships, so we provide continuous optimization to ensure your digital presence stays current, secure, and performs at its best. Maintenance packages are customized based on your needs and can include monthly strategy reviews, performance reports, and proactive optimizations."
        },
        {
            question: "What's included in a free website and SEO audit?",
            answer: "Our free audit provides a comprehensive analysis of your current digital presence. This includes technical SEO assessment (site speed, mobile-friendliness, crawlability, indexing issues), on-page SEO review (keyword optimization, content quality, meta tags, internal linking), website performance analysis (loading speed, Core Web Vitals, user experience metrics), conversion rate optimization opportunities, competitive analysis, and actionable recommendations with prioritized next steps. The audit report is delivered within 5-7 business days and includes specific, actionable insights to improve your digital performance."
        },
        {
            question: "Can you help with both B2B and B2C businesses?",
            answer: "Absolutely. We work with both B2B and B2C businesses across various industries. Our strategies are tailored to each business model. For B2B clients, we focus on lead generation, LinkedIn marketing, thought leadership content, and account-based marketing strategies. For B2C businesses, we emphasize e-commerce optimization, social media integration, conversion optimization, and brand awareness campaigns. We understand the unique challenges and opportunities in each model and adapt our approach accordingly."
        },
        {
            question: "How do you measure and report on results?",
            answer: "We use a data-driven approach with comprehensive reporting. All clients receive monthly performance reports that include key metrics such as organic traffic growth, keyword ranking improvements, conversion rates, lead generation numbers, website performance scores, and ROI analysis. We track metrics using Google Analytics, Google Search Console, and other industry-standard tools. Reports are presented in clear, visual formats with insights and recommendations. We also provide quarterly strategy reviews to discuss progress, adjust tactics, and plan for upcoming opportunities."
        },
        {
            question: "What makes your approach different from other agencies?",
            answer: "Our approach is unique in several ways. We integrate all digital services rather than working in silos. SEO, design, and marketing work together as a unified growth system. We use AI-driven strategies that adapt to modern search behavior and leverage cutting-edge tools. We focus on measurable outcomes and ROI, not vanity metrics. Our team combines technical expertise with strategic thinking, ensuring both execution and long-term planning. We build scalable systems that grow with your business, and we maintain transparent communication with regular reporting and strategy reviews. Most importantly, we're growth partners, not just service providers."
        },
        {
            question: "Do you work with e-commerce businesses?",
            answer: "Yes, we specialize in e-commerce optimization. We work with Shopify, WooCommerce, and other e-commerce platforms to optimize product pages, improve site speed, enhance user experience, and drive conversions. Our e-commerce services include product SEO optimization, category page optimization, shopping feed management, conversion rate optimization, mobile commerce optimization, and performance marketing campaigns. We understand the unique challenges of e-commerce, including cart abandonment, product discovery, and seasonal fluctuations, and we develop strategies to address these specific needs."
        },
        {
            question: "What is your pricing structure?",
            answer: "Our pricing is customized based on your specific needs, goals, and scope of work. We offer flexible engagement models including project-based pricing for one-time initiatives, monthly retainer packages for ongoing services, and hybrid models that combine both. Pricing factors include the complexity of your website, the competitiveness of your industry, the scope of SEO work needed, the number of services required, and your growth goals. We provide transparent proposals with clear deliverables and timelines. Book a strategy call to discuss your needs and receive a customized proposal tailored to your business."
        },
        {
            question: "How do you handle content creation and optimization?",
            answer: "We take a strategic, data-driven approach to content. Our process includes comprehensive keyword research and content gap analysis, content strategy development aligned with your business goals and user intent, creation of SEO-optimized content that provides value to your audience, optimization of existing content for better performance, content distribution and promotion strategies, and regular content audits and updates. We create content that serves both search engines and your audience, focusing on topics that drive qualified traffic and conversions. Content is optimized for featured snippets, voice search, and AI-powered search features."
        },
        {
            question: "Can you help with local SEO?",
            answer: "Yes, as Mumbai's best SEO company, we offer comprehensive local SEO services. Our local SEO approach includes Google Business Profile optimization and management, local keyword research and optimization for Mumbai markets, local citation building and consistency management, local link building strategies, review management and reputation optimization, local content creation, and local schema markup implementation. We help Mumbai businesses improve their visibility in local search results, appear in Google Maps, and attract customers in Mumbai and surrounding areas. This is particularly effective for businesses with physical locations in Mumbai or those serving the Mumbai metropolitan region."
        }
    ];

    const faqData = items || defaultFaqData;

    return (
        <section class="faq">
            <div class="container">
                <h2 class="section-title">Frequently Asked Questions</h2>
                <div class="faq-list">
                    {faqData.map((faq, index) => (
                        <div key={index} className={`faq-item ${activeIndex === index ? 'active' : ''}`}>
                            <button
                                class="faq-question"
                                aria-expanded={activeIndex === index}
                                onClick={() => toggleFAQ(index)}
                            >
                                <span>{faq.question}</span>
                                <span class="faq-icon">+</span>
                            </button>
                            <div class="faq-answer">
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQ;
