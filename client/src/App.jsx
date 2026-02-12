import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import SingleBlog from './pages/SingleBlog';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Services from './pages/Services';
import SingleService from './pages/SingleService';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
// import Services from './pages/Services';
// import Portfolio from './pages/Portfolio';

function App() {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<SingleBlog />} />
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
                <Route path="/services/:id" element={<SingleService />} />
                {/* <Route path="/portfolio" element={<Portfolio />} /> */}
            </Routes>
        </AuthProvider>
    );
}

export default App;
