import React, { useState, useEffect } from 'react';
import { fetchServices, createService, updateService, deleteService } from '../../api';
import MediaField from './MediaField';

const ServiceManager = () => {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        description: '',
        icon: '',
        detailImage: '',
        platforms: '',
        items: [],
        subHeading: '',
        longDescription: '',
        ctaText: '',
        stats: [],
        whyChooseUs: [],
        expertise: [],
        faqs: []
    });
    const [itemInput, setItemInput] = useState({ name: '', description: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        try {
            const { data } = await fetchServices();
            setServices(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch services');
            setLoading(false);
        }
    };

    const handleAddItem = () => {
        if (itemInput.name && itemInput.description) {
            setFormData({
                ...formData,
                items: [...formData.items, itemInput]
            });
            setItemInput({ name: '', description: '' });
        }
    };

    const handleRemoveItem = (index) => {
        const newItems = formData.items.filter((_, i) => i !== index);
        setFormData({ ...formData, items: newItems });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const serviceData = {
            ...formData,
            platforms: Array.isArray(formData.platforms)
                ? formData.platforms
                : (formData.platforms || '').split(',').map(p => p.trim()).filter(p => p !== '')
        };

        try {
            if (isEditing) {
                await updateService(currentId, serviceData);
                alert('Service updated successfully!');
            } else {
                await createService(serviceData);
                alert('Service created successfully!');
            }
            clearForm();
            loadServices();
        } catch (err) {
            console.error('Full error:', err);
            console.error('Error response:', err.response?.data);
            const errorMsg = err.response?.data?.message || err.message || 'Failed to save service';
            const errorDetails = err.response?.data?.details;
            setError(errorDetails ? `${errorMsg} (${JSON.stringify(errorDetails)})` : errorMsg);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            try {
                await deleteService(id);
                loadServices();
            } catch (err) {
                console.error(err);
                setError('Failed to delete service');
            }
        }
    };

    const handleEdit = (service) => {
        setIsEditing(true);
        setCurrentId(service.id);
        setFormData({
            title: service.title,
            slug: service.slug || '',
            description: service.description,
            icon: service.icon || '',
            detailImage: service.detailImage || '',
            platforms: service.platforms ? service.platforms.join(', ') : '',
            items: service.items || [],
            // New Fields
            subHeading: service.subHeading || '',
            longDescription: service.longDescription || '',
            ctaText: service.ctaText || '',
            stats: service.stats || [],
            whyChooseUs: service.whyChooseUs || [],
            expertise: service.expertise || [],
            faqs: service.faqs || []
        });
        window.scrollTo(0, 0);
    };

    const clearForm = () => {
        setIsEditing(false);
        setCurrentId(null);
        setFormData({
            title: '',
            slug: '',
            description: '',
            icon: '',
            detailImage: '',
            platforms: '',
            items: [],
            lists: [], // For compatibility if needed, but we used 'items' in the schema
            // New Fields
            subHeading: '',
            longDescription: '',
            ctaText: '',
            stats: [],
            whyChooseUs: [],
            expertise: [],
            faqs: []
        });
        setItemInput({ name: '', description: '' });
    };

    return (
        <div className="admin-section">
            <h2 className="admin-title">Manage Services</h2>

            {error && <div className="admin-error">{error}</div>}

            <div className="admin-form-container">
                <h3>{isEditing ? 'Edit Service' : 'Add New Service'}</h3>
                <form onSubmit={handleSubmit} className="admin-form">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>URL Slug (e.g. branding → /services/branding)</label>
                        <input
                            type="text"
                            value={formData.slug}
                            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                            placeholder="Leave empty to generate from title"
                        />
                    </div>

                    <div className="form-group">
                        <label>Subheading (Hero Section)</label>
                        <input
                            type="text"
                            value={formData.subHeading}
                            onChange={(e) => setFormData({ ...formData, subHeading: e.target.value })}
                            placeholder="e.g., Transforming Brands with Digital Excellence"
                        />
                    </div>

                    <div className="form-group">
                        <label>Short Description (Card & Hero)</label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>About This Service (Long Description)</label>
                        <textarea
                            value={formData.longDescription}
                            onChange={(e) => setFormData({ ...formData, longDescription: e.target.value })}
                            placeholder="Detailed description for the 'About This Service' section."
                            style={{ minHeight: '150px' }}
                        />
                    </div>

                    <div className="form-group">
                        <label>Custom CTA Text</label>
                        <input
                            type="text"
                            value={formData.ctaText}
                            onChange={(e) => setFormData({ ...formData, ctaText: e.target.value })}
                            placeholder="e.g., Book a Free Consultation"
                        />
                    </div>

                    <MediaField
                        label="Icon"
                        value={formData.icon}
                        onChange={(value) => setFormData({ ...formData, icon: value })}
                    />

                    <MediaField
                        label="Detail Image (About Section)"
                        value={formData.detailImage}
                        onChange={(value) => setFormData({ ...formData, detailImage: value })}
                    />

                    {/* Stats Section */}
                    <div className="repeater-container">
                        <h4 className="repeater-title">Stats (4 Items Recommended)</h4>
                        {formData.stats.map((stat, index) => (
                            <div key={index} className="repeater-item">
                                <div className="repeater-row">
                                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                                        <input
                                            type="text"
                                            placeholder="Number (e.g. 250)"
                                            value={stat.number}
                                            onChange={(e) => {
                                                const newStats = [...formData.stats];
                                                newStats[index].number = e.target.value;
                                                setFormData({ ...formData, stats: newStats });
                                            }}
                                        />
                                    </div>
                                    <div className="form-group" style={{ width: '100px', marginBottom: 0 }}>
                                        <input
                                            type="text"
                                            placeholder="Suffix"
                                            value={stat.suffix}
                                            onChange={(e) => {
                                                const newStats = [...formData.stats];
                                                newStats[index].suffix = e.target.value;
                                                setFormData({ ...formData, stats: newStats });
                                            }}
                                        />
                                    </div>
                                    <div className="form-group" style={{ flex: 2, marginBottom: 0 }}>
                                        <input
                                            type="text"
                                            placeholder="Label (e.g. Clients Served)"
                                            value={stat.label}
                                            onChange={(e) => {
                                                const newStats = [...formData.stats];
                                                newStats[index].label = e.target.value;
                                                setFormData({ ...formData, stats: newStats });
                                            }}
                                        />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const newStats = formData.stats.filter((_, i) => i !== index);
                                            setFormData({ ...formData, stats: newStats });
                                        }}
                                        className="btn-icon delete"
                                        title="Remove Stat"
                                    >×</button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={() => setFormData({
                            ...formData,
                            stats: [...formData.stats, { number: '', suffix: '', label: '' }]
                        })} className="repeater-add-btn">+ Add Stat</button>
                    </div>

                    {/* FAQs Section */}
                    <div className="repeater-container">
                        <h4 className="repeater-title">FAQs</h4>
                        {formData.faqs.map((faq, index) => (
                            <div key={index} className="repeater-item">
                                <div className="nested-form-group">
                                    <input
                                        type="text"
                                        placeholder="Question"
                                        value={faq.question}
                                        onChange={(e) => {
                                            const newFaqs = [...formData.faqs];
                                            newFaqs[index].question = e.target.value;
                                            setFormData({ ...formData, faqs: newFaqs });
                                        }}
                                        className="form-control"
                                    />
                                </div>
                                <div className="nested-form-group">
                                    <textarea
                                        placeholder="Answer"
                                        value={faq.answer}
                                        onChange={(e) => {
                                            const newFaqs = [...formData.faqs];
                                            newFaqs[index].answer = e.target.value;
                                            setFormData({ ...formData, faqs: newFaqs });
                                        }}
                                        style={{ minHeight: '80px' }}
                                    />
                                </div>
                                <div className="repeater-actions">
                                    <button type="button" onClick={() => {
                                        const newFaqs = formData.faqs.filter((_, i) => i !== index);
                                        setFormData({ ...formData, faqs: newFaqs });
                                    }} className="repeater-remove-btn">Remove FAQ</button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={() => setFormData({
                            ...formData,
                            faqs: [...formData.faqs, { question: '', answer: '' }]
                        })} className="repeater-add-btn">+ Add FAQ</button>
                    </div>

                    {/* Why Choose Us Section */}
                    <div className="repeater-container">
                        <h4 className="repeater-title">Why Choose Us</h4>
                        {formData.whyChooseUs.map((item, index) => (
                            <div key={index} className="repeater-item">
                                <div className="nested-form-group">
                                    <MediaField
                                        label="Icon"
                                        value={item.icon}
                                        onChange={(content) => {
                                            const newItems = [...formData.whyChooseUs];
                                            newItems[index].icon = content;
                                            setFormData({ ...formData, whyChooseUs: newItems });
                                        }}
                                    />
                                </div>
                                <div className="nested-form-group">
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={item.title}
                                        onChange={(e) => {
                                            const newItems = [...formData.whyChooseUs];
                                            newItems[index].title = e.target.value;
                                            setFormData({ ...formData, whyChooseUs: newItems });
                                        }}
                                    />
                                </div>
                                <div className="nested-form-group">
                                    <textarea
                                        placeholder="Description"
                                        value={item.description}
                                        onChange={(e) => {
                                            const newItems = [...formData.whyChooseUs];
                                            newItems[index].description = e.target.value;
                                            setFormData({ ...formData, whyChooseUs: newItems });
                                        }}
                                        style={{ minHeight: '80px' }}
                                    />
                                </div>
                                <div className="repeater-actions">
                                    <button type="button" onClick={() => {
                                        const newItems = formData.whyChooseUs.filter((_, i) => i !== index);
                                        setFormData({ ...formData, whyChooseUs: newItems });
                                    }} className="repeater-remove-btn">Remove Item</button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={() => setFormData({
                            ...formData,
                            whyChooseUs: [...formData.whyChooseUs, { title: '', description: '', icon: '' }]
                        })} className="repeater-add-btn">+ Add 'Why Choose Us' Item</button>
                    </div>

                    {/* Expertise Section */}
                    <div className="repeater-container">
                        <h4 className="repeater-title">Expertise</h4>
                        {formData.expertise.map((item, index) => (
                            <div key={index} className="repeater-item">
                                <div className="nested-form-group">
                                    <MediaField
                                        label="Icon"
                                        value={item.icon}
                                        onChange={(content) => {
                                            const newItems = [...formData.expertise];
                                            newItems[index].icon = content;
                                            setFormData({ ...formData, expertise: newItems });
                                        }}
                                    />
                                </div>
                                <div className="nested-form-group">
                                    <input
                                        type="text"
                                        placeholder="Title"
                                        value={item.title}
                                        onChange={(e) => {
                                            const newItems = [...formData.expertise];
                                            newItems[index].title = e.target.value;
                                            setFormData({ ...formData, expertise: newItems });
                                        }}
                                    />
                                </div>
                                <div className="nested-form-group">
                                    <textarea
                                        placeholder="Description"
                                        value={item.description}
                                        onChange={(e) => {
                                            const newItems = [...formData.expertise];
                                            newItems[index].description = e.target.value;
                                            setFormData({ ...formData, expertise: newItems });
                                        }}
                                        style={{ minHeight: '80px' }}
                                    />
                                </div>
                                <div className="repeater-actions">
                                    <button type="button" onClick={() => {
                                        const newItems = formData.expertise.filter((_, i) => i !== index);
                                        setFormData({ ...formData, expertise: newItems });
                                    }} className="repeater-remove-btn">Remove Item</button>
                                </div>
                            </div>
                        ))}
                        <button type="button" onClick={() => setFormData({
                            ...formData,
                            expertise: [...formData.expertise, { title: '', description: '', icon: '' }]
                        })} className="repeater-add-btn">+ Add Expertise Item</button>
                    </div>

                    <div className="form-group">
                        <label>Platforms (comma separated)</label>
                        <input
                            type="text"
                            value={formData.platforms}
                            onChange={(e) => setFormData({ ...formData, platforms: e.target.value })}
                            placeholder="WordPress, Shopify, React"
                        />
                    </div>

                    <div className="form-group">
                        <label>Service Items / Features</label>
                        <div className="item-input-group" style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                            <input
                                type="text"
                                placeholder="Item Name"
                                value={itemInput.name}
                                onChange={(e) => setItemInput({ ...itemInput, name: e.target.value })}
                                style={{ flex: 1 }}
                            />
                            <input
                                type="text"
                                placeholder="Description"
                                value={itemInput.description}
                                onChange={(e) => setItemInput({ ...itemInput, description: e.target.value })}
                                style={{ flex: 2 }}
                            />
                            <button type="button" onClick={handleAddItem} className="btn btn-secondary">Add</button>
                        </div>
                        <ul className="items-list" style={{ listStyle: 'none', padding: 0 }}>
                            {formData.items.map((item, index) => (
                                <li key={index} style={{ background: '#f5f5f5', padding: '10px', marginBottom: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <strong>{item.name}:</strong> {item.description}
                                    </div>
                                    <button type="button" onClick={() => handleRemoveItem(index)} className="btn-icon delete" style={{ color: 'red' }}>×</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : (isEditing ? 'Update Service' : 'Create Service')}
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
                <h3>Existing Services</h3>
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(service => (
                                <tr key={service.id}>
                                    <td>{service.title}</td>
                                    <td className="admin-actions">
                                        <button onClick={() => window.open(`/services/${service.slug || service.id}`, '_blank')} className="btn-icon preview" style={{ marginRight: '5px', color: '#007bff' }}>Preview</button>
                                        <button onClick={() => handleEdit(service)} className="btn-icon edit">Edit</button>
                                        <button onClick={() => handleDelete(service.id)} className="btn-icon delete">Delete</button>
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

export default ServiceManager;
