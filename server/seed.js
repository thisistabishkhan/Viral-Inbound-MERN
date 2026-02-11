const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Blog = require('./models/Blog');

dotenv.config();

const sampleBlogs = [
    {
        title: "The Future of SEO in 2024: AI and Beyond",
        content: "<p>Search Engine Optimization is evolving rapidly. With the rise of AI overviews and zero-click searches, businesses need to adapt their strategies...</p><p>Key takeaways include focusing on helpful content, E-E-A-T, and technical SEO foundations.</p>",
        imageUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        author: "Viral Inbound Team",
        tags: ["SEO", "AI", "Digital Marketing"],
        slug: "future-of-seo-2024"
    },
    {
        title: "Why Minimalist Web Design Converts Better",
        content: "<p>In a cluttered digital world, simplicity stands out. Minimalist web design isn't just an aesthetic choice; it's a strategic one that improves load times and focuses user attention.</p><p>We explore how negative space and clear typography drive higher conversion rates.</p>",
        imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        author: "Design Lead",
        tags: ["Web Design", "UX/UI", "Conversion"],
        slug: "why-minimalist-web-design-converts"
    },
    {
        title: "Maximizing ROI with LinkedIn Ads",
        content: "<p>LinkedIn is the powerhouse for B2B marketing. Learn how to target decision-makers effectively and craft ad creatives that stop the scroll.</p><p>This guide covers audience insights, ad formats, and budget optimization strategies.</p>",
        imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        author: "Marketing Strategist",
        tags: ["LinkedIn", "Paid Ads", "B2B"],
        slug: "maximizing-roi-linkedin-ads"
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/viral-inbound');
        console.log('Connected to MongoDB');

        // Clear existing blogs
        await Blog.deleteMany({});
        console.log('Cleared existing blogs');

        // Insert new blogs
        await Blog.insertMany(sampleBlogs);
        console.log('Sample blogs inserted successfully');

        mongoose.connection.close();
        console.log('Database connection closed');
    } catch (err) {
        console.error('Error seeding database:', err);
        process.exit(1);
    }
};

seedDB();
