const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient();

const resetAdminPassword = async () => {
    try {
        console.log('Connecting to database via Prisma...');

        const username = 'admin';
        const passwordRaw = 'password123';

        // Hash password manually since we are removing Mongoose hooks
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(passwordRaw, salt);

        // Check if admin exists
        const admin = await prisma.user.findUnique({
            where: { username }
        });

        if (admin) {
            console.log(`Admin user found. Updating password...`);
            await prisma.user.update({
                where: { username },
                data: { password: hashedPassword }
            });
            console.log('Admin password updated successfully.');
        } else {
            console.log(`Admin user not found. Creating new admin...`);
            await prisma.user.create({
                data: {
                    username,
                    password: hashedPassword
                }
            });
            console.log('New admin user created successfully.');
        }

        console.log(`\nCredentials:\nUsername: ${username}\nPassword: ${passwordRaw}`);

    } catch (error) {
        console.error('Error resetting admin password:', error);
    } finally {
        await prisma.$disconnect();
    }
};

resetAdminPassword();
