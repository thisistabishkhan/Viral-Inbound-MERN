const bcrypt = require('bcryptjs');
const prisma = require('../prismaClient');

async function createAdminUser() {
    try {
        // Admin credentials
        const username = 'admin';
        const password = 'admin123'; // Change this to your desired password

        // Check if admin user already exists
        const existingUser = await prisma.user.findUnique({
            where: { username }
        });

        if (existingUser) {
            console.log('❌ Admin user already exists!');
            console.log(`Username: ${username}`);
            console.log('If you forgot the password, delete the user from the database and run this script again.');
            process.exit(0);
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create admin user
        const admin = await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        });

        console.log('✅ Admin user created successfully!');
        console.log('');
        console.log('='.repeat(50));
        console.log('ADMIN CREDENTIALS');
        console.log('='.repeat(50));
        console.log(`Username: ${username}`);
        console.log(`Password: ${password}`);
        console.log('='.repeat(50));
        console.log('');
        console.log('⚠️  IMPORTANT: Change the password after first login!');
        console.log('');
        console.log(`Login at: http://localhost:5173/admin`);

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin user:', error);
        process.exit(1);
    }
}

createAdminUser();
