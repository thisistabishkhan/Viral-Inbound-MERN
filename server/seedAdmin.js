const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDB connected');

        const adminExists = await User.findOne({ username: 'admin' });

        if (adminExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        const admin = new User({
            username: 'admin',
            password: 'password123', // Change this in production
        });

        await admin.save();

        console.log('Admin user created successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
