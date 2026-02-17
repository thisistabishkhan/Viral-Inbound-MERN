const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');

// Helper function to generate unique slug
const generateUniqueSlug = async (title, excludeId = null) => {
    let slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

    let uniqueSlug = slug;
    let counter = 1;

    while (true) {
        const existing = await prisma.portfolio.findFirst({
            where: {
                slug: uniqueSlug,
                ...(excludeId && { id: { not: excludeId } })
            }
        });

        if (!existing) break;
        uniqueSlug = `${slug}-${counter}`;
        counter++;
    }

    return uniqueSlug;
};

// Get all portfolio items
router.get('/', async (req, res) => {
    try {
        const portfolio = await prisma.portfolio.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(portfolio);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one portfolio item by slug or ID
router.get('/:identifier', async (req, res) => {
    try {
        const { identifier } = req.params;

        // Try to find by slug first, then by ID
        const item = await prisma.portfolio.findFirst({
            where: {
                OR: [
                    { slug: identifier },
                    { id: identifier }
                ]
            }
        });

        if (!item) return res.status(404).json({ message: 'Portfolio item not found' });
        res.json(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a portfolio item
router.post('/', async (req, res) => {
    try {
        const data = { ...req.body };

        // Generate slug if not provided
        if (!data.slug || data.slug.trim() === '') {
            data.slug = await generateUniqueSlug(data.title);
        } else {
            data.slug = await generateUniqueSlug(data.slug);
        }

        const newItem = await prisma.portfolio.create({
            data
        });
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a portfolio item
router.patch('/:id', async (req, res) => {
    try {
        const data = { ...req.body };

        // Update slug if title changed and slug not explicitly provided
        if (data.title && (!data.slug || data.slug.trim() === '')) {
            data.slug = await generateUniqueSlug(data.title, req.params.id);
        } else if (data.slug) {
            data.slug = await generateUniqueSlug(data.slug, req.params.id);
        }

        const updatedItem = await prisma.portfolio.update({
            where: { id: req.params.id },
            data
        });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a portfolio item
router.delete('/:id', async (req, res) => {
    try {
        await prisma.portfolio.delete({
            where: { id: req.params.id }
        });
        res.json({ message: 'Portfolio item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
