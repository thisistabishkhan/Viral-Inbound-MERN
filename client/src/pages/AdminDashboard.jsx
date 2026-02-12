import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import BlogManager from '../components/admin/BlogManager';
import ServiceManager from '../components/admin/ServiceManager';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('blogs');

    return (
        <>
            <ParticleBackground />
            <Header />
            <main className="admin-page">
                <div className="container">
                    <h1 className="page-title">Admin Dashboard</h1>

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
