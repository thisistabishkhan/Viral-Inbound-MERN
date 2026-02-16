const prisma = require('./prismaClient');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const seedAdmin = async () => {
    try {
        console.log('Checking for admin user...');

        const adminExists = await prisma.user.findUnique({
            where: { username: 'admin' }
        });

        if (adminExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash('password123', salt); // Change this in production

        const admin = await prisma.user.create({
            data: {
                username: 'admin',
                password: password
            }
        });

        console.log('Admin user created successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
