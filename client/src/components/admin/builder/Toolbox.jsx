import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Type, Image, Quote, Heading, List, Layout } from 'lucide-react';

const ToolboxItem = ({ tool, onAdd }) => {
    const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
        id: `toolbox-${tool.type}`,
        data: {
            type: tool.type,
            isToolboxItem: true,
        },
    });

    const style = {
        transform: isDragging ? 'scale(1.05)' : undefined,
        opacity: isDragging ? 0.5 : 1,
        cursor: 'grab',
    };

    return (
        <button
            ref={setNodeRef}
            className="toolbox-item"
            onClick={() => onAdd(tool.type)}
            type="button"
            style={style}
            {...listeners}
            {...attributes}
        >
            <span className="toolbox-icon">{tool.icon}</span>
            <span className="toolbox-label">{tool.label}</span>
        </button>
    );
};

const Toolbox = ({ onAdd }) => {
    const tools = [
        { type: 'heading', label: 'Heading', icon: <Heading size={20} /> },
        { type: 'text', label: 'Text', icon: <Type size={20} /> },
        { type: 'image', label: 'Image', icon: <Image size={20} /> },
        { type: 'quote', label: 'Quote', icon: <Quote size={20} /> },
    ];

    return (
        <div className="builder-toolbox">
            <h4 className="toolbox-title">Add Content</h4>
            <div className="toolbox-grid">
                {tools.map((tool) => (
                    <ToolboxItem key={tool.type} tool={tool} onAdd={onAdd} />
                ))}
            </div>
        </div>
    );
};

export default Toolbox;
