import React, { useState, useEffect } from 'react';
import { fetchBlogs, createBlog, updateBlog, deleteBlog } from '../../api';
import BlogBuilder from './builder/BlogBuilder';

const BlogManager = () => {
    const [blogs, setBlogs] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        content: '',
        imageUrl: '',
        tags: '',
        slug: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [currentId, setCurrentId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadBlogs();
    }, []);

    const loadBlogs = async () => {
        try {
            const { data } = await fetchBlogs();
            setBlogs(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch blogs');
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

        const blogData = {
            ...formData,
            slug,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '')
        };

        try {
            if (isEditing) {
                await updateBlog(currentId, blogData);
                alert('Blog updated successfully!');
            } else {
                await createBlog(blogData);
                alert('Blog created successfully!');
            }
            clearForm();
            loadBlogs();
        } catch (err) {
            console.error(err);
            setError('Failed to save blog');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            try {
                await deleteBlog(id);
                loadBlogs();
            } catch (err) {
                console.error(err);
                setError('Failed to delete blog');
            }
        }
    };

    const handleEdit = (blog) => {
        setIsEditing(true);
        setCurrentId(blog._id);
        setFormData({
            title: blog.title,
            author: blog.author || '',
            content: blog.content,
            imageUrl: blog.imageUrl || '',
            tags: blog.tags ? blog.tags.join(', ') : '',
            slug: blog.slug || ''
        });
        window.scrollTo(0, 0);
    };

    const clearForm = () => {
        setIsEditing(false);
        setCurrentId(null);
        setFormData({
            title: '',
            author: '',
            content: '',
            imageUrl: '',
            tags: '',
            slug: ''
        });
    };

    return (
        <div className="admin-section">
            <h2 className="admin-title">Manage Blogs</h2>

            {error && <div className="admin-error">{error}</div>}

            <div className="admin-form-container">
                <h3>{isEditing ? 'Edit Blog' : 'Add New Blog'}</h3>
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

                    <div className="form-row">
                        <div className="form-group">
                            <label>Author</label>
                            <input
                                type="text"
                                value={formData.author}
                                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label>Slug (URL Friendly)</label>
                            <input
                                type="text"
                                value={formData.slug}
                                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                placeholder="e.g. my-awesome-post"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>Featured Image URL</label>
                        <input
                            type="text"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                            placeholder="https://..."
                        />
                    </div>

                    <div className="form-group">
                        <label>Tags (comma separated)</label>
                        <input
                            type="text"
                            value={formData.tags}
                            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                            placeholder="SEO, Web Design, Marketing"
                        />
                    </div>

                    <div className="form-group">
                        <label>Content</label>
                        <BlogBuilder
                            key={currentId || 'new'}
                            initialContent={formData.content}
                            onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? 'Saving...' : (isEditing ? 'Update Blog' : 'Create Blog')}
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
                <h3>Existing Blogs</h3>
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Author</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.map(blog => (
                                <tr key={blog._id}>
                                    <td>{blog.title}</td>
                                    <td>{blog.author}</td>
                                    <td>{new Date(blog.date).toLocaleDateString()}</td>
                                    <td className="admin-actions">
                                        <button onClick={() => window.open(`/blogs/${blog._id}`, '_blank')} className="btn-icon preview" style={{ marginRight: '5px', color: '#007bff' }}>Preview</button>
                                        <button onClick={() => handleEdit(blog)} className="btn-icon edit">Edit</button>
                                        <button onClick={() => handleDelete(blog._id)} className="btn-icon delete">Delete</button>
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

export default BlogManager;
