import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import SingleBlog from './pages/SingleBlog';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Services from './pages/Services';
import SingleService from './pages/SingleService';
import Portfolio from './pages/Portfolio';
import SinglePortfolio from './pages/SinglePortfolio';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:slug" element={<SingleBlog />} />
                <Route path="/login" element={<Login />} />
                <Route
                    path="/admin"
                    element={
                        <ProtectedRoute>
                            <AdminDashboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<SingleService />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:slug" element={<SinglePortfolio />} />
            </Routes>
        </AuthProvider>
    );
}

export default App;
