import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import BlogManager from '../components/admin/BlogManager';
import ServiceManager from '../components/admin/ServiceManager';

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
                            disabled
                            title="Coming Soon"
                        >
                            Portfolio (Coming Soon)
                        </button>
                        <button
                            className={`admin-tab ${activeTab === 'services' ? 'active' : ''}`}
                            onClick={() => setActiveTab('services')}
                        >
                            Services
                        </button>
                    </div>

                    <div className="admin-content">
                        {activeTab === 'blogs' && <BlogManager />}
                        {activeTab === 'services' && <ServiceManager />}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AdminDashboard;
