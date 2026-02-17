import React from 'react';
import MediaField from './MediaField';

const GalleryRepeater = ({ images = [], onChange }) => {
    const handleAddImage = () => {
        onChange([...images, '']);
    };

    const handleRemoveImage = (index) => {
        const newImages = images.filter((_, i) => i !== index);
        onChange(newImages);
    };

    const handleImageChange = (index, value) => {
        const newImages = [...images];
        newImages[index] = value;
        onChange(newImages);
    };

    const handleMoveUp = (index) => {
        if (index === 0) return;
        const newImages = [...images];
        [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
        onChange(newImages);
    };

    const handleMoveDown = (index) => {
        if (index === images.length - 1) return;
        const newImages = [...images];
        [newImages[index], newImages[index + 1]] = [newImages[index + 1], newImages[index]];
        onChange(newImages);
    };

    return (
        <div className="gallery-repeater">
            {images.map((imageUrl, index) => (
                <div key={index} className="gallery-repeater-item">
                    <div className="gallery-repeater-controls">
                        <span className="gallery-repeater-number">#{index + 1}</span>
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="btn-icon-small delete"
                            title="Remove image"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="gallery-repeater-field">
                        <MediaField
                            value={imageUrl}
                            onChange={(value) => handleImageChange(index, value)}
                            placeholder={`Image ${index + 1} URL`}
                        />
                    </div>
                </div>
            ))}

            <button
                type="button"
                onClick={handleAddImage}
                className="btn btn-secondary"
                style={{ marginTop: '10px' }}
            >
                + Add Image
            </button>

            {images.length === 0 && (
                <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>
                    No images added yet. Click "Add Image" to start building your gallery.
                </p>
            )}
        </div>
    );
};

export default GalleryRepeater;
