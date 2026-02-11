import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ParticleBackground from '../components/ParticleBackground';
import BlogManager from '../components/admin/BlogManager';

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
                            disabled
                            title="Coming Soon"
                        >
                            Services (Coming Soon)
                        </button>
                    </div>

                    <div className="admin-content">
                        {activeTab === 'blogs' && <BlogManager />}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default AdminDashboard;
