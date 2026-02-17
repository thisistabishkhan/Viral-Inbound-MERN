import React, { useState, useEffect } from 'react';
import { fetchPortfolio, createPortfolioItem, updatePortfolioItem, deletePortfolioItem } from '../../api';
import MediaField from './MediaField';
import GalleryRepeater from './GalleryRepeater';

const PortfolioManager = () => {
    const [portfolio, setPortfolio] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        client: '',
        category: '',
        subtitle: '',
        imageUrl: '',
        description: '',
        link: '',
        featured: false,
        gallery: [],
        projectInfo: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadPortfolio();
    }, []);

    const loadPortfolio = async () => {
        try {
            const { data } = await fetchPortfolio();
            setPortfolio(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch portfolio');
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Generate slug if empty
        let slug = formData.slug.trim();
        if (!slug) {
            slug = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
        }

        // Parse JSON fields
        let gallery = formData.gallery.filter(url => url.trim() !== '');
        if (gallery.length === 0) gallery = null;

        let projectInfo = null;

        try {
            if (formData.projectInfo && formData.projectInfo.trim()) {
                projectInfo = JSON.parse(formData.projectInfo);
            }
        } catch (err) {
            alert('Invalid JSON format for Project Info. Please use format: {"client": "...", "date": "..."}');
            setLoading(false);
            return;
        }

        const portfolioData = {
            title: formData.title,
            slug,
            client: formData.client || null,
            category: formData.category || null,
            subtitle: formData.subtitle || null,
            imageUrl: formData.imageUrl,
            description: formData.description || null,
            link: formData.link || null,
            featured: formData.featured,
            gallery,
            projectInfo
        };

        try {
            if (isEditing) {
                await updatePortfolioItem(currentId, portfolioData);
                alert('Portfolio item updated successfully!');
            } else {
                await createPortfolioItem(portfolioData);
                alert('Portfolio item created successfully!');
            }
            clearForm();
            loadPortfolio();
        } catch (err) {
            console.error(err);
            setError('Failed to save portfolio item');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this portfolio item?')) {
            try {
                await deletePortfolioItem(id);
                loadPortfolio();
            } catch (err) {
                console.error(err);
                setError('Failed to delete portfolio item');
            }
        }
    };

    const handleEdit = (item) => {
        setIsEditing(true);
        setCurrentId(item.id);
        setFormData({
            title: item.title,
            slug: item.slug || '',
            client: item.client || '',
            category: item.category || '',
            subtitle: item.subtitle || '',
            imageUrl: item.imageUrl || '',
            description: item.description || '',
            link: item.link || '',
            featured: item.featured || false,
            gallery: item.gallery || [],
            projectInfo: item.projectInfo ? JSON.stringify(item.projectInfo, null, 2) : ''
        });
        window.scrollTo(0, 0);
    };

    const clearForm = () => {
        setIsEditing(false);
        setCurrentId(null);
        setFormData({
            title: '',
            slug: '',
            client: '',
            category: '',
            subtitle: '',
            imageUrl: '',
            description: '',
            link: '',
            featured: false,
            gallery: [],
            projectInfo: ''
        });
    };

    return (
        <div className="admin-section">
            <h2 className="admin-title">Manage Portfolio</h2>

            {error && <div className="admin-error">{error}</div>}

            <div className="admin-form-container">
                <h3>{isEditing ? 'Edit Portfolio Item' : 'Add New Portfolio Item'}</h3>
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-group">
                        <label>Title *</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Slug (URL Friendly)</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="e.g. villa-in-goa"
                            />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <input
                                type="text"
                                value={formData.category}
                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                placeholder="e.g. Website Design"
                            />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>Client Name</label>
                            <input
                                type="text"
                                value={formData.client}
                                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    style={{ width: 'auto', marginRight: '8px' }}
                                />
                                Featured Project
                            </label>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Subtitle (Short Description)</label>
                        <input
                            type="text"
                            value={formData.subtitle}
                            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                            placeholder="Brief description for card"
                        />
                    </div>

                    <div className="form-group">
                        <label>Thumbnail Image URL *</label>
                        <MediaField
                            value={formData.imageUrl}
                            onChange={(value) => setFormData({ ...formData, imageUrl: value })}
                            placeholder="https://..."
                        />
                    </div>

                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            rows="3"
                            placeholder="Full project description"
                        />
                    </div>

                    <div className="form-group">
                        <label>Project Link (Optional)</label>
                        <input
                            type="url"
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            placeholder="https://example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label>Gallery Images</label>
                        <GalleryRepeater
                            images={formData.gallery}
                            onChange={(images) => setFormData({ ...formData, gallery: images })}
                        />
                        <small style={{ color: '#666', fontSize: '12px', display: 'block', marginTop: '8px' }}>
                            Add multiple images to display in the portfolio detail page gallery
                        </small>
                    </div>

                    <div className="form-group">
                        <label>Project Info (JSON Object)</label>
                        <textarea
                            value={formData.projectInfo}
                            onChange={(e) => setFormData({ ...formData, projectInfo: e.target.value })}
                            rows="4"
                            placeholder='{"client": "Company Name", "date": "2024", "services": "Web Design, Development"}'
                        />
                        <small style={{ color: '#666', fontSize: '12px' }}>
                            Format: JSON object with project details
                        </small>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : (isEditing ? 'Update Portfolio Item' : 'Create Portfolio Item')}
                        </button>
                        {isEditing && (
                            <button type="button" onClick={clearForm} className="btn btn-secondary">
                                Cancel
                            </button>
                        )}
                    </div>
                </form>
            </div>

            <div className="admin-list-container">
                <h3>Existing Portfolio Items</h3>
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Client</th>
                                <th>Category</th>
                                <th>Featured</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolio.map(item => (
                                <tr key={item.id}>
                                    <td>{item.title}</td>
                                    <td>{item.client || '-'}</td>
                                    <td>{item.category || '-'}</td>
                                    <td>{item.featured ? '⭐' : '-'}</td>
                                    <td className="admin-actions">
                                        <button
                                            onClick={() => window.open(`/portfolio/${item.slug || item.id}`, '_blank')}
                                            className="btn-icon preview"
                                            style={{ marginRight: '5px', color: '#007bff' }}
                                        >
                                            Preview
                                        </button>
                                        <button onClick={() => handleEdit(item)} className="btn-icon edit">Edit</button>
                                        <button onClick={() => handleDelete(item.id)} className="btn-icon delete">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PortfolioManager;
