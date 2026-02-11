import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ClientLogos from '../components/ClientLogos';
import Stats from '../components/Stats';
import About from '../components/About';
import Expertise from '../components/Expertise';
import Services from '../components/Services';
import TrustGuarantee from '../components/TrustGuarantee';
import Platforms from '../components/Platforms';
import Process from '../components/Process';
import WhyChoose from '../components/WhyChoose';
import ContactCTA from '../components/ContactCTA';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import Insights from '../components/Insights';
import LeadMagnet from '../components/LeadMagnet';
import FAQ from '../components/FAQ';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';

const Home = () => {
    return (
        <>
            <ParticleBackground />
            <Header />
            <main>
                <Hero />
                <ClientLogos />
                <Stats />
                <About />
                <Expertise />
                <Services />
                <TrustGuarantee />
                <Platforms />
                <Process />
                <WhyChoose />
                <ContactCTA />
                <Projects />
                <Testimonials />
                <Insights />
                <LeadMagnet />
                <FAQ />
                <Newsletter />
            </main>
            <Footer />
        </>
    );
};

export default Home;
