import React, { useEffect, useRef } from 'react';

const Stats = () => {
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

    return (
        <section class="stats" ref={sectionRef}>
            <div class="container">
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-number" data-target="250" data-suffix="+">0+</div>
                        <div class="stat-label">Clients Served</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" data-target="6" data-suffix="+">0+</div>
                        <div class="stat-label">Years Experience</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" data-target="350" data-suffix="+">0+</div>
                        <div class="stat-label">Projects Delivered</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number" data-target="650" data-suffix="%">0%</div>
                        <div class="stat-label">Avg. Traffic Growth</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Stats;
