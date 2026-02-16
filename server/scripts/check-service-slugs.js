const prisma = require('../prismaClient');

async function checkAndFixSlugs() {
    console.log('Checking services...\n');

    const services = await prisma.service.findMany();

    console.log(`Total services: ${services.length}\n`);

    for (const service of services) {
        console.log(`- ${service.title}`);
        console.log(`  ID: ${service.id}`);
        console.log(`  Slug: ${service.slug || 'MISSING'}`);
        console.log('');
    }

    const missingSlug = services.filter(s => !s.slug);
    if (missingSlug.length > 0) {
        console.log(`\n⚠️  ${missingSlug.length} service(s) are missing slugs!`);
        console.log('You can fix this by editing each service in the admin panel.');
    } else {
        console.log('\n✅ All services have slugs!');
    }

    await prisma.$disconnect();
}

checkAndFixSlugs().catch(console.error);
