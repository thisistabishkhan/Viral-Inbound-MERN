const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');

// Get all blogs
router.get('/', async (req, res) => {
    try {
        const blogs = await prisma.blog.findMany();
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one blog by ID or Slug
router.get('/:idOrSlug', async (req, res) => {
    try {
        const { idOrSlug } = req.params;

        // Try finding by slug first (most common for user-facing URLs)
        let blog = await prisma.blog.findUnique({
            where: { slug: idOrSlug }
        });

        // If not found by slug, try by ID
        if (!blog) {
            blog = await prisma.blog.findUnique({
                where: { id: idOrSlug }
            });
        }

        if (!blog) return res.status(404).json({ message: 'Blog not found' });
        res.json(blog);
    } catch (err) {
        // If searching by ID failed because idOrSlug wasn't a valid UUID, 
        // it might have thrown an error in strict mode, but findUnique gracefully returns null mostly.
        // However, let's catch unexpected structural errors.
        res.status(500).json({ message: err.message });
    }
});

// Create a blog
router.post('/', async (req, res) => {
    try {
        const newBlog = await prisma.blog.create({
            data: req.body
        });
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a blog
router.patch('/:id', async (req, res) => {
    try {
        const updatedBlog = await prisma.blog.update({
            where: { id: req.params.id },
            data: req.body
        });
        res.json(updatedBlog);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a blog
router.delete('/:id', async (req, res) => {
    try {
        await prisma.blog.delete({
            where: { id: req.params.id }
        });
        res.json({ message: 'Blog deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
