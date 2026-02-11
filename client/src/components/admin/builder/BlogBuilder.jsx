import React, { useState, useEffect } from 'react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects,
} from '@dnd-kit/core';
import {
    arrayMove,
    sortableKeyboardCoordinates,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { GripVertical } from 'lucide-react';
import Toolbox from './Toolbox';
import Canvas from './Canvas';
import LayersPanel, { LayerItem } from './LayersPanel';
import { HeadingBlock, TextBlock, ImageBlock, QuoteBlock } from './Blocks';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

const BlogBuilder = ({ initialContent, onChange }) => {
    const [blocks, setBlocks] = useState([]);
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, // Prevent accidental drags
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    useEffect(() => {
        if (!initialContent) {
            setBlocks([]);
            return;
        }

        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = initialContent;
        const scriptTag = tempDiv.querySelector('script[id="blog-builder-data"]');

        if (scriptTag) {
            try {
                const parsedBlocks = JSON.parse(scriptTag.textContent);
                setBlocks(parsedBlocks);
            } catch (e) {
                console.error("Failed to parse block data", e);
                setBlocks([{ id: generateId(), type: 'text', data: { content: initialContent } }]);
            }
        } else {
            if (initialContent.trim()) {
                setBlocks([{ id: generateId(), type: 'text', data: { content: initialContent } }]);
            }
        }
    }, []);

    useEffect(() => {
        const htmlContent = serializeBlocks(blocks);
        onChange(htmlContent);
    }, [blocks, onChange]);

    const serializeBlocks = (currentBlocks) => {
        let html = currentBlocks.map(block => {
            switch (block.type) {
                case 'heading':
                    const level = block.data.level || 'h2';
                    return `<${level}>${block.data.content || ''}</${level}>`;
                case 'text':
                    return block.data.content || '';
                case 'image':
                    return `<figure><img src="${block.data.url}" alt="${block.data.caption || ''}" /><figcaption>${block.data.caption || ''}</figcaption></figure>`;
                case 'quote':
                    return `<blockquote>${block.data.text || ''}<cite>${block.data.author || ''}</cite></blockquote>`;
                default:
                    return '';
            }
        }).join('');

        const json = JSON.stringify(currentBlocks);
        html += `<script id="blog-builder-data" type="application/json">${json}</script>`;

        return html;
    };

    const handleAddBlock = (type) => {
        const newBlock = {
            id: generateId(),
            type,
            data: {}
        };
        setBlocks((items) => [...items, newBlock]);
    };

    const handleUpdateBlock = (id, data) => {
        setBlocks((items) => items.map(item => item.id === id ? { ...item, data } : item));
    };

    const handleDeleteBlock = (id) => {
        setBlocks((items) => items.filter(item => item.id !== id));
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);

        if (!over) return;

        // Handle dropping a Toolbox item
        if (active.data.current?.isToolboxItem) {
            const type = active.data.current.type;
            const newBlock = {
                id: generateId(),
                type,
                data: {}
            };

            setBlocks((items) => {
                // If dropped over a layer item, we need to handle that too
                const overIdClean = over.id.toString().replace('layer-', '');
                const overIndex = items.findIndex((item) => item.id === overIdClean);

                let newIndex;
                if (overIndex >= 0) {
                    newIndex = overIndex;
                } else {
                    newIndex = items.length;
                }

                const newItems = [...items];
                newItems.splice(newIndex, 0, newBlock);
                return newItems;
            });
            return;
        }

        // Handle sorting existing blocks (Canvas or LayerPanel)
        if (active.id !== over.id) {
            setBlocks((items) => {
                const activeIdClean = active.id.toString().replace('layer-', '');
                const overIdClean = over.id.toString().replace('layer-', '');

                const oldIndex = items.findIndex((item) => item.id === activeIdClean);
                const newIndex = items.findIndex((item) => item.id === overIdClean);

                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    };

    // Render preview for DragOverlay
    const renderDragPreview = (id) => {
        if (!id) return null;
        const isLayer = id.toString().startsWith('layer-');
        const cleanId = id.toString().replace('layer-', '');
        const block = blocks.find(b => b.id === cleanId);

        if (!block) return null;

        if (isLayer) {
            return <LayerItem id={id} type={block.type} active={true} />;
        }

        // For canvas dragging, we show a simplified version of the block wrapper
        const renderPreviewContent = () => {
            const noop = () => { };
            switch (block.type) {
                case 'heading': return <HeadingBlock data={block.data} onChange={noop} />;
                case 'text': return <div style={{ padding: '0.5rem', border: '1px dashed #ccc' }}>Text Block Content</div>;
                case 'image': return <ImageBlock data={block.data} onChange={noop} />;
                case 'quote': return <QuoteBlock data={block.data} onChange={noop} />;
                default: return <div>Unknown block type</div>;
            }
        };

        return (
            <div className="builder-block-wrapper" style={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '0.5rem',
                overflow: 'hidden',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                width: '100%',
                maxWidth: '600px' // Limit width
            }}>
                <div className="block-header" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem',
                    backgroundColor: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0',
                    cursor: 'grabbing'
                }}>
                    <div style={{ marginRight: '0.5rem', display: 'flex', alignItems: 'center' }}>
                        <GripVertical size={16} color="#94a3b8" />
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', color: '#64748b', marginRight: 'auto' }}>
                        {block.type}
                    </span>
                </div>
                <div className="block-content" style={{ padding: '1rem', opacity: 0.8 }}>
                    {renderPreviewContent()}
                </div>
            </div>
        );
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={(event) => setActiveId(event.active.id)}
            onDragEnd={handleDragEnd}
        >
            <div className="blog-builder" style={{
                display: 'grid',
                gridTemplateColumns: '250px 1fr 250px', // Added 3rd column for Layers
                gap: '2rem',
                height: 'calc(100vh - 100px)', // Constrain height for scrolling
                overflow: 'hidden'
            }}>
                <div className="builder-sidebar">
                    <Toolbox onAdd={handleAddBlock} />
                </div>
                <div className="builder-main" style={{ overflowY: 'auto' }}>
                    <Canvas
                        blocks={blocks}
                        onChange={handleUpdateBlock}
                        onDelete={handleDeleteBlock}
                    />
                </div>
                <div className="builder-layers">
                    <SortableContext
                        items={blocks.map(b => `layer-${b.id}`)}
                        strategy={verticalListSortingStrategy}
                    >
                        <LayersPanel blocks={blocks} activeBlockId={activeId?.toString().replace('layer-', '')} />
                    </SortableContext>
                </div>
            </div>

            <DragOverlay dropAnimation={dropAnimation}>
                {activeId ? (
                    activeId.toString().startsWith('toolbox-') ? (
                        <div style={{
                            padding: '1rem',
                            backgroundColor: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '0.5rem',
                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                            width: '200px'
                        }}>
                            {activeId.replace('toolbox-', '').toUpperCase()}
                        </div>
                    ) : renderDragPreview(activeId)
                ) : null}
            </DragOverlay>
        </DndContext>
    );
};

export default BlogBuilder;
