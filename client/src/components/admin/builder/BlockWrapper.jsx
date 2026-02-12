import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2 } from 'lucide-react';
import { HeadingBlock, TextBlock, ImageBlock, QuoteBlock } from './Blocks';

const BlockWrapper = ({ block, onChange, onDelete }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: block.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging || block.isPlaceholder ? 0.5 : 1, // Handle placeholder opacity
        marginBottom: '1rem',
        backgroundColor: block.isPlaceholder ? '#f0f9ff' : '#fff', // Light blue background for placeholder
        border: block.isPlaceholder ? '2px dashed #3b82f6' : '1px solid #e2e8f0', // Dashed blue border for placeholder
        borderRadius: '0.5rem',
        overflow: 'hidden',
    };

    const renderBlock = () => {
        switch (block.type) {
            case 'heading':
                return <HeadingBlock data={block.data} onChange={(newData) => onChange(block.id, newData)} />;
            case 'text':
                return <TextBlock data={block.data} onChange={(newData) => onChange(block.id, newData)} />;
            case 'image':
                return <ImageBlock data={block.data} onChange={(newData) => onChange(block.id, newData)} />;
            case 'quote':
                return <QuoteBlock data={block.data} onChange={(newData) => onChange(block.id, newData)} />;
            default:
                return <div>Unknown block type</div>;
        }
    };

    return (
        <div ref={setNodeRef} style={style} className="builder-block-wrapper">
            <div
                className="block-header"
                {...attributes}
                {...listeners}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem',
                    backgroundColor: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0',
                    cursor: 'grab' // Make cursor grab for the whole header
                }}
            >
                <div style={{ marginRight: '0.5rem', display: 'flex', alignItems: 'center' }}>
                    <GripVertical size={16} color="#94a3b8" />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: '#64748b', marginRight: 'auto' }}>
                    {block.type}
                </span>
                <button
                    onClick={(e) => {
                        // Prevent drag when clicking delete
                        e.stopPropagation();
                        onDelete(block.id);
                    }}
                    type="button"
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.25rem',
                        color: '#ef4444',
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <Trash2 size={16} />
                </button>
            </div>
            <div className="block-content" style={{ padding: '1rem' }}>
                {renderBlock()}
            </div>
        </div>
    );
};

export default BlockWrapper;
