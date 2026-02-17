import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestimonialManager = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState({
        name: '',
        position: '',
        company: '',
        content: '',
        rating: 5,
        featured: false
    });

    const API_URL = 'http://localhost:5000/api/testimonials';

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const response = await axios.get(API_URL);
            setTestimonials(response.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setCurrentTestimonial({
            ...currentTestimonial,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isEditing) {
                await axios.put(`${API_URL}/${currentTestimonial.id}`, currentTestimonial);
                alert('Testimonial updated successfully!');
            } else {
                await axios.post(API_URL, currentTestimonial);
                alert('Testimonial created successfully!');
            }
            fetchTestimonials();
            resetForm();

        } catch (error) {
            console.error('Error saving testimonial:', error);
        }
    };

    const handleEdit = (testimonial) => {
        setCurrentTestimonial(testimonial);
        setIsEditing(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchTestimonials();
            } catch (error) {
                console.error('Error deleting testimonial:', error);
            }
        }
    };

    const resetForm = () => {
        setCurrentTestimonial({
            name: '',
            position: '',
            company: '',
            content: '',
            rating: 5,
            featured: false
        });
        setIsEditing(false);
    };

    return (
        <div className="admin-section">
            <h2 className="admin-title">Testimonials Manager</h2>

            <div className="admin-form-container">
                <h3>{isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={currentTestimonial.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Position</label>
                            <input
                                type="text"
                                name="position"
                                value={currentTestimonial.position}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Company</label>
                            <input
                                type="text"
                                name="company"
                                value={currentTestimonial.company}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Rating (1-5)</label>
                            <select name="rating" value={currentTestimonial.rating} onChange={handleInputChange}>
                                <option value="1">1 Star</option>
                                <option value="2">2 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="5">5 Stars</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Content</label>
                        <textarea
                            name="content"
                            rows="4"
                            value={currentTestimonial.content}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </div>

                    <div className="form-group featured-check">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                name="featured"
                                checked={currentTestimonial.featured}
                                onChange={handleInputChange}
                            />
                            Featured on Home Page
                        </label>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary">
                            {isEditing ? 'Update' : 'Create'} Testimonial
                        </button>
                        {isEditing && (
                            <button type="button" className="btn btn-secondary" onClick={resetForm}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Company</th>
                            <th>Featured</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr><td colSpan="4">Loading testimonials...</td></tr>
                        ) : testimonials.length === 0 ? (
                            <tr><td colSpan="4">No testimonials found.</td></tr>
                        ) : (
                            testimonials.map(testimonial => (
                                <tr key={testimonial.id}>
                                    <td>{testimonial.name}</td>
                                    <td>{testimonial.company}</td>
                                    <td>{testimonial.featured ? 'Yes' : 'No'}</td>
                                    <td className="admin-actions">
                                        <button className="btn-icon edit" onClick={() => handleEdit(testimonial)}>Edit</button>
                                        <button className="btn-icon delete" onClick={() => handleDelete(testimonial.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TestimonialManager;
