import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Code } from 'lucide-react';

export const HeadingBlock = ({ data, onChange }) => {
    const level = data.level || 'h2';

    return (
        <div className="builder-heading-block" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%' }}>
            <select
                value={level}
                onChange={(e) => onChange({ ...data, level: e.target.value })}
                onClick={(e) => e.stopPropagation()} /* Prevent drag start when clicking select */
                onPointerDown={(e) => e.stopPropagation()}
                style={{
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    backgroundColor: '#f8fafc',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 500
                }}
            >
                <option value="h1">H1</option>
                <option value="h2">H2</option>
                <option value="h3">H3</option>
                <option value="h4">H4</option>
                <option value="h5">H5</option>
                <option value="h6">H6</option>
            </select>
            <input
                type="text"
                className="builder-heading-input"
                value={data.content || ''}
                onChange={(e) => onChange({ ...data, content: e.target.value })}
                placeholder={`Heading ${level.replace('h', '')}`}
                style={{
                    fontSize: level === 'h1' ? '2rem' : level === 'h2' ? '1.5rem' : level === 'h3' ? '1.25rem' : '1rem',
                    fontWeight: 'bold',
                    width: '100%',
                    border: 'none',
                    outline: 'none',
                    padding: '0.5rem 0',
                    background: 'transparent'
                }}
            />
        </div>
    );
};



export const TextBlock = ({ data, onChange }) => {
    const [viewSource, setViewSource] = React.useState(false);

    return (
        <div className="builder-text-block" style={{ position: 'relative' }}>
            <button
                type="button"
                onClick={(e) => {
                    e.preventDefault();
                    setViewSource(!viewSource);
                }}
                style={{
                    position: 'absolute',
                    top: '5px',
                    right: '5px',
                    zIndex: 10,
                    padding: '4px',
                    background: viewSource ? '#e2e8f0' : '#fff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                title={viewSource ? "Switch to Visual Editor" : "Switch to HTML Source"}
            >
                <Code size={16} />
            </button>

            {viewSource ? (
                <textarea
                    value={data.content || ''}
                    onChange={(e) => onChange({ ...data, content: e.target.value })}
                    style={{
                        width: '100%',
                        minHeight: '200px',
                        padding: '1rem',
                        fontFamily: 'monospace',
                        fontSize: '14px',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        resize: 'vertical',
                        backgroundColor: '#1e293b',
                        color: '#f8fafc'
                    }}
                />
            ) : (
                <ReactQuill
                    theme="snow"
                    value={data.content || ''}
                    onChange={(content) => onChange({ ...data, content })}
                    modules={{
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['link'],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            ['clean']
                        ]
                    }}
                />
            )}
        </div>
    );
};

export const ImageBlock = ({ data, onChange }) => {
    return (
        <div className="builder-image-block">
            <div className="form-group">
                <label>Image URL</label>
                <input
                    type="text"
                    value={data.url || ''}
                    onChange={(e) => onChange({ ...data, url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                />
            </div>
            <div className="form-group">
                <label>Caption (Optional)</label>
                <input
                    type="text"
                    value={data.caption || ''}
                    onChange={(e) => onChange({ ...data, caption: e.target.value })}
                    placeholder="Image caption"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                />
            </div>
            {data.url && (
                <div className="image-preview" style={{ marginTop: '1rem' }}>
                    <img src={data.url} alt={data.caption || 'Preview'} style={{ maxWidth: '100%', borderRadius: '4px' }} />
                </div>
            )}
        </div>
    );
};

export const QuoteBlock = ({ data, onChange }) => {
    return (
        <div className="builder-quote-block" style={{ borderLeft: '4px solid #ddd', paddingLeft: '1rem' }}>
            <textarea
                value={data.text || ''}
                onChange={(e) => onChange({ ...data, text: e.target.value })}
                placeholder="Enter quote..."
                rows={3}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px', marginBottom: '0.5rem' }}
            />
            <input
                type="text"
                value={data.author || ''}
                onChange={(e) => onChange({ ...data, author: e.target.value })}
                placeholder="Author (Optional)"
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
            />
        </div>
    );
};
