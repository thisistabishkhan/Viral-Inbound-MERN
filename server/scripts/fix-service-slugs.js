const prisma = require('../prismaClient');

function slugify(text) {
    return String(text)
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

async function fixMissingSlugs() {
    console.log('Fixing services with missing slugs...\n');

    const services = await prisma.service.findMany({
        where: {
            OR: [
                { slug: null },
                { slug: '' }
            ]
        }
    });

    if (services.length === 0) {
        console.log('✅ All services already have slugs!');
        await prisma.$disconnect();
        return;
    }

    console.log(`Found ${services.length} service(s) to fix:\n`);

    for (const service of services) {
        const slug = slugify(service.title);

        await prisma.service.update({
            where: { id: service.id },
            data: { slug: slug }
        });

        console.log(`✓ Fixed "${service.title}" → slug: "${slug}"`);
    }

    console.log(`\n✅ Successfully fixed ${services.length} service(s)!`);
    await prisma.$disconnect();
}

fixMissingSlugs().catch((error) => {
    console.error('Error:', error);
    process.exit(1);
});
