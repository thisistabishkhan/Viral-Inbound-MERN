const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');

// Get all testimonials
router.get('/', async (req, res) => {
    try {
        const testimonials = await prisma.testimonial.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get featured testimonials
router.get('/featured', async (req, res) => {
    try {
        const testimonials = await prisma.testimonial.findMany({
            where: {
                featured: true
            },
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create testimonial
router.post('/', async (req, res) => {
    try {
        const { name, position, company, content, rating, featured } = req.body;
        const testimonial = await prisma.testimonial.create({
            data: {
                name,
                position,
                company,
                content,
                rating: parseInt(rating) || 5,
                featured: featured === true || featured === 'true'
            }
        });
        res.status(201).json(testimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update testimonial
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, position, company, content, rating, featured } = req.body;
        const testimonial = await prisma.testimonial.update({
            where: { id },
            data: {
                name,
                position,
                company,
                content,
                rating: parseInt(rating) || 5,
                featured: featured === true || featured === 'true'
            }
        });
        res.json(testimonial);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete testimonial
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.testimonial.delete({
            where: { id }
        });
        res.json({ message: 'Testimonial deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
