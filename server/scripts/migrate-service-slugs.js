const prisma = require('../prismaClient');

function slugify(text) {
    return String(text)
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}

async function ensureUniqueSlug(slug, excludeId = null) {
    let candidate = slug || 'service';
    let counter = 0;
    for (; ;) {
        const existing = await prisma.service.findUnique({
            where: { slug: candidate }
        });
        if (!existing || (excludeId && existing.id === excludeId)) return candidate;
        counter += 1;
        candidate = `${slug || 'service'}-${counter}`;
    }
}

async function migrateServiceSlugs() {
    console.log('🔍 Checking for services with missing slugs...\n');

    try {
        // Find all services with null or empty slugs
        const servicesWithoutSlugs = await prisma.service.findMany({
            where: {
                OR: [
                    { slug: null },
                    { slug: '' }
                ]
            }
        });

        if (servicesWithoutSlugs.length === 0) {
            console.log('✅ All services already have slugs!');
            return;
        }

        console.log(`Found ${servicesWithoutSlugs.length} service(s) without slugs:\n`);

        for (const service of servicesWithoutSlugs) {
            const baseSlug = slugify(service.title);
            const uniqueSlug = await ensureUniqueSlug(baseSlug, service.id);

            await prisma.service.update({
                where: { id: service.id },
                data: { slug: uniqueSlug }
            });

            console.log(`✓ Updated "${service.title}" → slug: "${uniqueSlug}"`);
        }

        console.log(`\n✅ Successfully migrated ${servicesWithoutSlugs.length} service(s)!`);

    } catch (error) {
        console.error('❌ Error during migration:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

// Run the migration
migrateServiceSlugs()
    .catch((error) => {
        console.error('Migration failed:', error);
        process.exit(1);
    });
