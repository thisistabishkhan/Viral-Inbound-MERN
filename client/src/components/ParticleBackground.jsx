import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let mouse = { x: 0, y: 0, active: false };

        const CONFIG = {
            particleColor: 'rgba(0, 0, 0, 0.6)',
            lineColor: 'rgba(0, 0, 0, 0.2)',
            particleSize: 2,
            lineWidth: 0.8,
            speed: 0.2,
            maxSpeed: 0.5,
            randomAcceleration: 0.01,
            connectionDistance: 120,
            particlesPer1000px: 15,
            minParticles: 30,
            maxParticles: 80,
            mouseInfluence: true,
            mouseRadius: 150,
            mouseStrength: 0.3,
        };

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        class Particle {
            constructor() {
                this.reset();
                this.vx = (Math.random() - 0.5) * CONFIG.speed;
                this.vy = (Math.random() - 0.5) * CONFIG.speed;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * CONFIG.speed;
                this.vy = (Math.random() - 0.5) * CONFIG.speed;
            }

            update() {
                if (CONFIG.mouseInfluence && mouse.active) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < CONFIG.mouseRadius && distance > 0) {
                        const force = (1 - distance / CONFIG.mouseRadius) * CONFIG.mouseStrength;
                        this.vx += (dx / distance) * force * 0.1;
                        this.vy += (dy / distance) * force * 0.1;
                    }
                }

                this.vx += (Math.random() - 0.5) * CONFIG.randomAcceleration;
                this.vy += (Math.random() - 0.5) * CONFIG.randomAcceleration;

                const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
                if (speed > CONFIG.maxSpeed) {
                    this.vx = (this.vx / speed) * CONFIG.maxSpeed;
                    this.vy = (this.vy / speed) * CONFIG.maxSpeed;
                }

                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0) this.x = canvas.width;
                else if (this.x > canvas.width) this.x = 0;

                if (this.y < 0) this.y = canvas.height;
                else if (this.y > canvas.height) this.y = 0;

                this.vx *= 0.99;
                this.vy *= 0.99;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, CONFIG.particleSize, 0, Math.PI * 2);
                ctx.fillStyle = CONFIG.particleColor;
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            const area = window.innerWidth * window.innerHeight;
            const baseCount = Math.floor((area / 1000000) * CONFIG.particlesPer1000px);
            const count = Math.max(CONFIG.minParticles, Math.min(CONFIG.maxParticles, baseCount));

            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const drawConnections = () => {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < CONFIG.connectionDistance) {
                        const opacity = (1 - distance / CONFIG.connectionDistance) * 0.4;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
                        ctx.lineWidth = CONFIG.lineWidth;
                        ctx.stroke();
                    }
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            drawConnections();
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        };

        const handleMouseLeave = () => {
            mouse.active = false;
        };

        window.addEventListener('resize', handleResize);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseleave', handleMouseLeave);

        handleResize();
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} id="particleBackground" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, opacity: 0.5, pointerEvents: 'none' }} />;
};

export default ParticleBackground;
