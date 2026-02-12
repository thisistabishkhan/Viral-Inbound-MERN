import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import BlockWrapper from './BlockWrapper';

const Canvas = ({ blocks, onChange, onDelete }) => {
    const { setNodeRef } = useDroppable({
        id: 'canvas-droppable',
    });

    return (
        <div
            ref={setNodeRef}
            className="builder-canvas"
            style={{
                padding: '1rem',
                minHeight: '500px',
                backgroundColor: '#f1f5f9',
                borderRadius: '0.5rem',
                border: '1px solid #cbd5e1'
            }}
        >
            <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                {blocks.map((block) => (
                    <BlockWrapper
                        key={block.id}
                        block={block}
                        onChange={onChange}
                        onDelete={onDelete}
                    />
                ))}
            </SortableContext>
            {blocks.length === 0 && (
                <div style={{ textAlign: 'center', color: '#64748b', padding: '2rem' }}>
                    Drag blocks here or click buttons in the toolbox to add content.
                </div>
            )}
        </div>
    );
};

export default Canvas;
