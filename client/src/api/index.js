import axios from 'axios';

const API = axios.create({
    baseURL: '/api', // Proxy is set up in vite.config.js
    headers: {
        'Content-Type': 'application/json',
    },
});

// Services
export const fetchServices = () => API.get('/services');
export const fetchService = (id) => API.get(`/services/${id}`);
export const createService = (newService) => API.post('/services', newService);
export const updateService = (id, updatedService) => API.patch(`/services/${id}`, updatedService);
export const deleteService = (id) => API.delete(`/services/${id}`);

// Portfolio
export const fetchPortfolio = () => API.get('/portfolio');
export const createPortfolioItem = (newItem) => API.post('/portfolio', newItem);
export const updatePortfolioItem = (id, updatedItem) => API.patch(`/portfolio/${id}`, updatedItem);
export const deletePortfolioItem = (id) => API.delete(`/portfolio/${id}`);

// Blogs
export const fetchBlogs = () => API.get('/blogs');
export const createBlog = (newBlog) => API.post('/blogs', newBlog);
export const updateBlog = (id, updatedBlog) => API.patch(`/blogs/${id}`, updatedBlog);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`);

export default API;
