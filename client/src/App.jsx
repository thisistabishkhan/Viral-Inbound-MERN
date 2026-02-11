import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import SingleBlog from './pages/SingleBlog';
import AdminDashboard from './pages/AdminDashboard';
// import Services from './pages/Services';
// import Portfolio from './pages/Portfolio';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blogs/:id" element={<SingleBlog />} />
                <Route path="/admin" element={<AdminDashboard />} />
                {/* <Route path="/services" element={<Services />} /> */}
                {/* <Route path="/portfolio" element={<Portfolio />} /> */}
            </Routes>
        </>
    );
}

export default App;
