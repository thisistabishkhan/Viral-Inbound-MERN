const express = require('express');
const router = express.Router();
const prisma = require('../prismaClient');

// Helper function to create URL-friendly slugs
function slugify(text) {
    if (!text) return '';
    return String(text)
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

// Helper function to generate a unique slug
async function generateUniqueSlug(baseSlug, excludeId = null) {
    if (!baseSlug) baseSlug = 'service';

    let slug = baseSlug;
    let counter = 0;

    while (true) {
        // Check if slug exists
        const existingService = await prisma.service.findMany({
            where: { slug: slug },
            select: { id: true }
        });

        // If no service found, or found service is the one we're updating, slug is available
        if (existingService.length === 0 || (excludeId && existingService[0].id === excludeId)) {
            return slug;
        }

        // Slug exists, try with counter
        counter++;
        slug = `${baseSlug}-${counter}`;
    }
}

// Helper function to sanitize service data before saving
function sanitizeServiceData(data) {
    const sanitized = { ...data };

    // Handle JSON fields - convert empty arrays to null
    const jsonFields = ['items', 'stats', 'whyChooseUs', 'expertise', 'faqs'];
    jsonFields.forEach(field => {
        if (sanitized[field] !== undefined) {
            if (Array.isArray(sanitized[field]) && sanitized[field].length === 0) {
                sanitized[field] = null;
            }
        }
    });

    // Remove undefined values
    Object.keys(sanitized).forEach(key => {
        if (sanitized[key] === undefined) {
            delete sanitized[key];
        }
    });

    // Handle empty strings for optional fields
    const optionalStringFields = ['icon', 'detailImage', 'subHeading', 'longDescription', 'ctaText'];
    optionalStringFields.forEach(field => {
        if (sanitized[field] === '') {
            sanitized[field] = null;
        }
    });

    return sanitized;
}

// GET all services
router.get('/', async (req, res) => {
    try {
        const services = await prisma.service.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(services);
    } catch (err) {
        console.error('Error fetching services:', err);
        res.status(500).json({ message: err.message });
    }
});

// GET one service by slug or ID
router.get('/:idOrSlug', async (req, res) => {
    try {
        const { idOrSlug } = req.params;

        const service = await prisma.service.findFirst({
            where: {
                OR: [
                    { slug: idOrSlug },
                    { id: idOrSlug }
                ]
            }
        });

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json(service);
    } catch (err) {
        console.error('Error fetching service:', err);
        res.status(500).json({ message: err.message });
    }
});

// POST - Create a new service
router.post('/', async (req, res) => {
    try {
        let serviceData = { ...req.body };

        // Generate slug from title or provided slug
        let baseSlug = serviceData.slug && String(serviceData.slug).trim() !== ''
            ? slugify(serviceData.slug)
            : slugify(serviceData.title || 'service');

        if (!baseSlug) baseSlug = 'service';

        // Ensure slug is unique
        serviceData.slug = await generateUniqueSlug(baseSlug);

        // Sanitize data
        serviceData = sanitizeServiceData(serviceData);

        // Create service
        const newService = await prisma.service.create({
            data: serviceData
        });

        res.status(201).json(newService);
    } catch (err) {
        console.error('Error creating service:', err);
        console.error('Error details:', err.message);
        res.status(400).json({
            message: 'Failed to create service',
            error: err.message
        });
    }
});

// PATCH - Update a service
router.patch('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if service exists
        const existingService = await prisma.service.findUnique({
            where: { id }
        });

        if (!existingService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        let updateData = { ...req.body };

        // Handle slug update
        if (updateData.slug !== undefined) {
            // User provided a slug
            if (updateData.slug && String(updateData.slug).trim() !== '') {
                const baseSlug = slugify(updateData.slug);
                updateData.slug = await generateUniqueSlug(baseSlug, id);
            } else if (updateData.title) {
                // No slug provided but title changed, generate from title
                const baseSlug = slugify(updateData.title);
                updateData.slug = await generateUniqueSlug(baseSlug, id);
            } else {
                // Generate from existing title
                const baseSlug = slugify(existingService.title);
                updateData.slug = await generateUniqueSlug(baseSlug, id);
            }
        } else if (updateData.title && !existingService.slug) {
            // Title updated but service has no slug, generate one
            const baseSlug = slugify(updateData.title);
            updateData.slug = await generateUniqueSlug(baseSlug, id);
        } else if (!existingService.slug) {
            // Service has no slug, generate from existing title
            const baseSlug = slugify(existingService.title);
            updateData.slug = await generateUniqueSlug(baseSlug, id);
        }

        // Sanitize data
        updateData = sanitizeServiceData(updateData);

        // Update service
        const updatedService = await prisma.service.update({
            where: { id },
            data: updateData
        });

        res.json(updatedService);
    } catch (err) {
        console.error('========== ERROR UPDATING SERVICE ==========');
        console.error('Service ID:', req.params.id);
        console.error('Request body:', JSON.stringify(req.body, null, 2));
        console.error('Error message:', err.message);
        console.error('Error stack:', err.stack);
        console.error('Prisma error code:', err.code);
        console.error('Prisma error meta:', err.meta);
        console.error('==========================================');
        res.status(400).json({
            message: 'Failed to update service',
            error: err.message,
            code: err.code,
            details: err.meta
        });
    }
});

// DELETE a service
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await prisma.service.delete({
            where: { id }
        });

        res.json({ message: 'Service deleted successfully' });
    } catch (err) {
        console.error('Error deleting service:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
