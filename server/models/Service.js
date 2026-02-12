const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String }, // Store SVG as string or URL
    platforms: [String], // Optional: for "Platforms we work with"
    items: [ // For nested lists like in the "Web Design & Development" service card
        {
            name: { type: String },
            description: { type: String }
        }
    ],
    // New Fields for Rich Layout
    subHeading: { type: String },
    longDescription: { type: String }, // For "About This Service"
    stats: [
        {
            number: { type: String },
            suffix: { type: String },
            label: { type: String }
        }
    ],
    whyChooseUs: [
        {
            title: { type: String },
            description: { type: String },
            icon: { type: String } // Optional: specific icon for this point
        }
    ],
    expertise: [
        {
            title: { type: String },
            description: { type: String },
            icon: { type: String } // Optional
        }
    ],
    faqs: [
        {
            question: { type: String },
            answer: { type: String }
        }
    ],
    ctaText: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
