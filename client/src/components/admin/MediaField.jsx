import React, { useState, useRef, useEffect } from 'react';

const MediaField = ({ value, onChange, label }) => {
    const fileInputRef = useRef(null);
    const [preview, setPreview] = useState(null);
    const [inputType, setInputType] = useState('file'); // 'file' or 'url'

    useEffect(() => {
        setPreview(value);
    }, [value]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        if (file.type === 'image/svg+xml') {
            reader.onload = (event) => {
                const content = event.target.result;
                onChange(content); // SVG content as string
            };
            reader.readAsText(file);
        } else if (file.type.startsWith('image/')) {
            reader.onload = (event) => {
                const content = event.target.result;
                onChange(content); // Base64 data URL
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select an image or SVG file.');
        }
    };

    const handleTextChange = (e) => {
        onChange(e.target.value);
    };

    const isSvg = (content) => {
        return content && typeof content === 'string' && content.trim().startsWith('<svg');
    };

    return (
        <div className="form-group media-field">
            <label>{label}</label>

            <div className="media-preview-container" style={{
                border: '1px dashed #ccc',
                padding: '1rem',
                borderRadius: '4px',
                marginBottom: '1rem',
                minHeight: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: '#f8fafc'
            }}>
                {preview ? (
                    isSvg(preview) ? (
                        <div dangerouslySetInnerHTML={{ __html: preview }} style={{ maxWidth: '100px', maxHeight: '100px' }} />
                    ) : (
                        <img src={preview} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px', objectFit: 'contain' }} />
                    )
                ) : (
                    <span style={{ color: '#94a3b8' }}>No media selected</span>
                )}
            </div>

            <div className="media-controls" style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
                <button
                    type="button"
                    className={`btn-sm ${inputType === 'file' ? 'active' : ''}`}
                    onClick={() => setInputType('file')}
                    style={{
                        padding: '0.25rem 0.5rem',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        background: inputType === 'file' ? '#e2e8f0' : '#fff',
                        cursor: 'pointer'
                    }}
                >
                    Upload File
                </button>
                <button
                    type="button"
                    className={`btn-sm ${inputType === 'url' ? 'active' : ''}`}
                    onClick={() => setInputType('url')}
                    style={{
                        padding: '0.25rem 0.5rem',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        background: inputType === 'url' ? '#e2e8f0' : '#fff',
                        cursor: 'pointer'
                    }}
                >
                    URL / Code
                </button>
            </div>

            {inputType === 'file' ? (
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*,.svg"
                    style={{ width: '100%' }}
                />
            ) : (
                <textarea
                    value={value || ''}
                    onChange={handleTextChange}
                    placeholder="Enter Image URL or SVG Code"
                    rows="3"
                    style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
                />
            )}

            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem' }}>
                Supported: JPG, PNG, WEBP (converted to Base64) or SVG (converted to code).
            </p>
        </div>
    );
};

export default MediaField;
