import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
import LayersPanel, { LayerItem, LayerItemContent } from './LayersPanel';
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
    }, []); // Run only on mount (key change handles reset)

    useEffect(() => {
        const htmlContent = serializeBlocks(blocks);
        // Debounce or check if really changed to avoid loops if needed, 
        // but for now direct call is fine as long as parent doesn't recreate initialContent
        if (onChange) onChange(htmlContent);
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

    const handleDragStart = (event) => {
        setActiveId(event.active.id);
    };

    const handleDragOver = (event) => {
        const { active, over } = event;
        if (!over) return;

        // 1. If we are dragging a Toolbox item over the Canvas/Sortable list
        if (active.data.current?.isToolboxItem) {
            const overId = over.id;

            // If over the canvas container itself, we might want to append
            // But usually DndKit sortable targets specific items.

            setBlocks((items) => {
                const activeType = active.data.current.type;
                // Check if we already have a placeholder
                const placeholderIndex = items.findIndex(item => item.id === 'placeholder');

                // Calculate where it should go
                const overIdClean = overId.toString().replace('layer-', '');
                const overIndex = items.findIndex((item) => item.id === overIdClean);

                let newIndex;
                if (overIndex >= 0) {
                    newIndex = overIndex;
                    // If moving down (placeholder is before over), we generally want to go after?
                    // But active isn't in list yet essentially (except as placeholder).
                    // DndKit's sortable strategy handles "move to index". 
                    // We just need to put the placeholder AT the overIndex, and SortableContext shifts others.

                    // Enhancement: if below center, maybe +1? 
                    // But standard replacement is fine.
                } else {
                    newIndex = items.length;
                }

                // If we already have a placeholder, just move it
                if (placeholderIndex !== -1) {
                    if (placeholderIndex === newIndex) return items; // no change
                    return arrayMove(items, placeholderIndex, newIndex);
                } else {
                    // Create new placeholder
                    const newBlock = {
                        id: 'placeholder',
                        type: activeType,
                        data: {},
                        isPlaceholder: true // Flag to style it differently/ghostly
                    };
                    const newItems = [...items];
                    newItems.splice(newIndex, 0, newBlock);
                    return newItems;
                }
            });
        }
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveId(null);

        // Allow dropping toolbox item
        if (active.data.current?.isToolboxItem) {
            setBlocks((items) => {
                // Find placeholder and replace with real item
                const placeholderIndex = items.findIndex(item => item.id === 'placeholder');

                // If we dropped outside valid area (no over), remove placeholder
                if (!over) {
                    return items.filter(item => item.id !== 'placeholder');
                }

                if (placeholderIndex !== -1) {
                    const type = active.data.current.type;
                    const newBlock = {
                        id: generateId(), // Real ID
                        type,
                        data: {}
                    };
                    const newItems = [...items];
                    newItems[placeholderIndex] = newBlock;
                    return newItems;
                } else {
                    // Fallback if no placeholder existed (weird timing?)
                    return items;
                }
            });
            return;
        }

        // Handle sorting existing blocks
        if (over && active.id !== over.id) {
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

        let block;
        if (id.toString().startsWith('toolbox-')) {
            // It's a toolbox item, we don't look it up in blocks
            return null; // Handled below in DragOverlay children
        } else {
            block = blocks.find(b => b.id === cleanId);
        }

        if (!block) return null;

        if (isLayer) {
            return <LayerItemContent type={block.type} active={true} isOverlay={true} />;
        }

        // For canvas dragging
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
                border: '1px solid #3b82f6', // distinct usage
                borderRadius: '0.5rem',
                overflow: 'hidden',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                width: '100%',
                maxWidth: '600px',
                pointerEvents: 'none' // CRITICAL: prevent overlay from stealing events
            }}>
                <div className="block-header" style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem',
                    backgroundColor: '#f8fafc',
                    borderBottom: '1px solid #e2e8f0',
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
            onDragStart={handleDragStart}
            onDragOver={handleDragOver} // CRITICAL: Added this
            onDragEnd={handleDragEnd}
        >
            <div className="blog-builder" style={{
                display: 'grid',
                gridTemplateColumns: '250px 1fr 250px',
                gap: '2rem',
                height: 'calc(100vh - 100px)',
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

            {createPortal(
                <DragOverlay dropAnimation={dropAnimation} style={{ pointerEvents: 'none', cursor: 'grabbing' }}>
                    {activeId ? (
                        activeId.toString().startsWith('toolbox-') ? (
                            <div style={{
                                padding: '1rem',
                                backgroundColor: '#fff',
                                border: '1px solid #3b82f6',
                                borderRadius: '0.5rem',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                width: '200px',
                                cursor: 'grabbing',
                                pointerEvents: 'none'
                            }}>
                                {activeId.replace('toolbox-', '').toUpperCase()}
                            </div>
                        ) : renderDragPreview(activeId)
                    ) : null}
                </DragOverlay>,
                document.body
            )}
        </DndContext>
    );
};

export default BlogBuilder;
