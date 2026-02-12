import React, { useEffect, useRef } from 'react';

const Stats = ({ stats }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stats = entry.target.querySelectorAll('.stat-number');
                    stats.forEach(stat => {
                        if (!stat.classList.contains('counted')) {
                            animateCounter(stat);
                            stat.classList.add('counted');
                        }
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) observer.unobserve(sectionRef.current);
        };
    }, []);

    const animateCounter = (el) => {
        const target = parseInt(el.getAttribute('data-target'));
        const suffix = el.getAttribute('data-suffix');
        const duration = 2000; // 2 seconds
        const stepTime = 20;
        const steps = duration / stepTime;
        const increment = target / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target + suffix;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current) + suffix;
            }
        }, stepTime);
    };

    const defaultStats = [
        { number: "250", suffix: "+", label: "Clients Served" },
        { number: "6", suffix: "+", label: "Years Experience" },
        { number: "350", suffix: "+", label: "Projects Delivered" },
        { number: "650", suffix: "%", label: "Avg. Traffic Growth" }
    ];

    const displayStats = stats || defaultStats;

    return (
        <section className="stats" ref={sectionRef}>
            <div className="container">
                <div className="stats-grid">
                    {displayStats.map((stat, index) => (
                        <div key={index} className="stat-item">
                            <div className="stat-number" data-target={stat.number} data-suffix={stat.suffix}>0{stat.suffix}</div>
                            <div className="stat-label">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Stats;
