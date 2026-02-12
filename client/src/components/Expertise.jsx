import React from 'react';

const Expertise = ({ items, title }) => {
    const defaultTitle = (
        <h2 className="expertise-title">
            <span className="expertise-title-part1">Our Expertise As The</span>
            <span className="expertise-title-part2">Best Web Design Company & SEO Experts In Mumbai</span>
        </h2>
    );

    const defaultItems = [
        {
            number: "01",
            title: "Customized Web Design Solutions",
            description: "We deliver tailored web design and development services using modern technologies. Every website we build is custom-crafted to match your business needs. Our team creates visually stunning, conversion-focused websites that work across all devices.",
            icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M9 3v18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3 9h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <circle cx="7" cy="7" r="1.5" fill="currentColor" />
                <circle cx="17" cy="7" r="1.5" fill="currentColor" />
                <circle cx="7" cy="17" r="1.5" fill="currentColor" />
                <circle cx="17" cy="17" r="1.5" fill="currentColor" />
            </svg>`
        },
        {
            number: "02",
            title: "Comprehensive SEO Optimization Services",
            description: "We craft SEO strategies that improve your search engine visibility and drive organic traffic. Our Mumbai SEO team handles technical SEO, on-page optimization, and content SEO. The result? Better rankings and more qualified visitors to your website.",
            icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2L3 6v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6l-3-4H6z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M3 6h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M16 10a4 4 0 1 1-8 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>`
        },
        {
            number: "03",
            title: "Digital Marketing Agency Excellence",
            description: "As Mumbai's leading digital marketing agency, we build integrated marketing strategies combining performance marketing, paid advertising, and content marketing. Our digital marketing services drive qualified traffic, generate leads, and deliver measurable ROI for businesses across Mumbai and India.",
            icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <polyline points="14 2 14 8 20 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <polyline points="10 9 9 9 8 9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>`
        },
        {
            number: "04",
            title: "SEO-Friendly Web Development",
            description: "Every website we build is optimized for search engines from day one. We combine expert web design with advanced SEO techniques to maximize your online presence. This means better rankings, more organic traffic, and sustainable growth for your business.",
            icon: `<svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <polyline points="12 6 12 12 16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>`
        }
    ];

    const displayItems = items || defaultItems;

    return (
        <section className="expertise">
            <div className="container">
                {title || defaultTitle}
                <div className="expertise-grid">
                    {displayItems.map((item, index) => (
                        <div key={index} className="expertise-card">
                            <div className="expertise-number">{item.number || `0${index + 1}`}</div>
                            <div className="expertise-icon" dangerouslySetInnerHTML={{ __html: item.icon }}></div>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Expertise;
