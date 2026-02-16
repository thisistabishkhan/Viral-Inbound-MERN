const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient();

const verifyAdmin = async () => {
    try {
        console.log('Checking admin user via Prisma...');

        const user = await prisma.user.findUnique({
            where: { username: 'admin' }
        });

        if (!user) {
            console.log('Admin user NOT found');
        } else {
            console.log('Admin user found:', user.username);
            console.log('Hashed password:', user.password);

            const isMatch = await bcrypt.compare('password123', user.password);
            console.log('Password match result:', isMatch);
        }
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
};

verifyAdmin();
