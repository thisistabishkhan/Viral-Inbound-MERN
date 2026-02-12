import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Type, Image as ImageIcon, Quote, Heading } from 'lucide-react';

export const LayerItemContent = ({ type, active, style, listeners, attributes, setNodeRef, isOverlay }) => {
    const getIcon = () => {
        switch (type) {
            case 'heading': return <Heading size={14} />;
            case 'text': return <Type size={14} />;
            case 'image': return <ImageIcon size={14} />;
            case 'quote': return <Quote size={14} />;
            default: return <Type size={14} />;
        }
    };

    const finalStyle = {
        ...style,
        // Active state styling
        border: active ? '1px solid #3b82f6' : '1px solid transparent',
        backgroundColor: active ? '#eff6ff' : 'white',
        borderRadius: '0.25rem',
        marginBottom: '0.5rem',
    };

    return (
        <div
            ref={setNodeRef}
            style={finalStyle}
            {...attributes}
            {...listeners}
            className="layer-item"
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '0.5rem',
                border: '1px solid #e2e8f0',
                borderRadius: '0.25rem',
                cursor: isOverlay ? 'grabbing' : 'grab',
                backgroundColor: '#fff',
                width: '100%',
                boxSizing: 'border-box',
                pointerEvents: isOverlay ? 'none' : 'auto'
            }}>
                <GripVertical size={14} color="#94a3b8" style={{ marginRight: '0.5rem', flexShrink: 0 }} />
                <span style={{ color: '#64748b', marginRight: '0.5rem', display: 'flex', flexShrink: 0 }}>{getIcon()}</span>
                <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: '#334155',
                    textTransform: 'uppercase',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}>
                    {type}
                </span>
            </div>
        </div>
    );
};

export const LayerItem = ({ id, type, active }) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    return (
        <LayerItemContent
            type={type}
            active={active}
            style={style}
            listeners={listeners}
            attributes={attributes}
            setNodeRef={setNodeRef}
        />
    );
};

const LayersPanel = ({ blocks, activeBlockId }) => {
    return (
        <div className="layers-panel" style={{
            backgroundColor: '#f8fafc',
            borderLeft: '1px solid #e2e8f0',
            padding: '1rem',
            height: '100%',
            overflowY: 'auto',
            boxSizing: 'border-box'
        }}>
            <h3 style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#64748b',
                textTransform: 'uppercase',
                marginBottom: '1rem',
                letterSpacing: '0.05em'
            }}>Layers</h3>
            <div className="layers-list">
                {blocks.map((block) => (
                    <LayerItem
                        key={block.id}
                        id={`layer-${block.id}`}
                        type={block.type}
                        active={activeBlockId === block.id}
                    />
                ))}
            </div>
            {blocks.length === 0 && (
                <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: '0.75rem', padding: '1rem 0' }}>
                    No layers
                </div>
            )}
        </div>
    );
};

export default LayersPanel;
