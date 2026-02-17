import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import BlogManager from '../components/admin/BlogManager';
import ServiceManager from '../components/admin/ServiceManager';
import PortfolioManager from '../components/admin/PortfolioManager';
import TestimonialManager from '../components/admin/TestimonialManager';


const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('blogs');
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <>
            <ParticleBackground />
            <Header />
            <main className="admin-page">
                <div className="container">
                    <div className="admin-header-container">
                        <h1 className="page-title">Admin Dashboard</h1>
                        <button className="btn btn-primary logout-btn" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>

                    <div className="admin-tabs">
                        <button
                            className={`admin-tab ${activeTab === 'blogs' ? 'active' : ''}`}
                            onClick={() => setActiveTab('blogs')}
                        >
                            Blogs
                        </button>
                        <button
                            className={`admin-tab ${activeTab === 'portfolio' ? 'active' : ''}`}
                            onClick={() => setActiveTab('portfolio')}
                        >
                            Portfolio
                        </button>
                        <button
                            className={`admin-tab ${activeTab === 'services' ? 'active' : ''}`}
                            onClick={() => setActiveTab('services')}
                        >
                            Services
                        </button>
                        <button
                            className={`admin-tab ${activeTab === 'testimonials' ? 'active' : ''}`}
                            onClick={() => setActiveTab('testimonials')}
                        >
                            Testimonials
                        </button>

                    </div>

                    <div className="admin-content">
                        {activeTab === 'blogs' && <BlogManager />}
                        {activeTab === 'portfolio' && <PortfolioManager />}
                        {activeTab === 'services' && <ServiceManager />}
                        {activeTab === 'testimonials' && <TestimonialManager />}

                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AdminDashboard;
