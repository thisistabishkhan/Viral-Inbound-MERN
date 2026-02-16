const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');

// Get all portfolio items
router.get('/', async (req, res) => {
    try {
        const portfolio = await prisma.portfolio.findMany();
        res.json(portfolio);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one portfolio item
router.get('/:id', async (req, res) => {
    try {
        const item = await prisma.portfolio.findUnique({
            where: { id: req.params.id }
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
        const newItem = await prisma.portfolio.create({
            data: req.body
        });
        res.status(201).json(newItem);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a portfolio item
router.patch('/:id', async (req, res) => {
    try {
        const updatedItem = await prisma.portfolio.update({
            where: { id: req.params.id },
            data: req.body
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
