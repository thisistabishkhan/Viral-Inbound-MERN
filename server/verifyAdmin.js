const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const verifyAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const user = await User.findOne({ username: 'admin' });
        if (!user) {
            console.log('Admin user NOT found');
        } else {
            console.log('Admin user found:', user.username);
            console.log('Hashed password:', user.password);

            const isMatch = await user.comparePassword('password123');
            console.log('Password match result:', isMatch);
        }
        process.exit();
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

verifyAdmin();
