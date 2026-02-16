const prisma = require('../prismaClient');

async function quickFix() {
    try {
        // Update all services with null slugs
        const result = await prisma.$executeRaw`
            UPDATE "Service"
            SET slug = LOWER(REPLACE(REPLACE(title, ' ', '-'), '&', 'and'))
            WHERE slug IS NULL OR slug = ''
        `;

        console.log(`✅ Updated ${result} service(s)`);

        // Verify
        const services = await prisma.service.findMany();
        console.log('\nAll services:');
        services.forEach(s => {
            console.log(`- ${s.title}: ${s.slug}`);
        });

    } catch (error) {
        console.error('Error:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

quickFix();
