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
    ]
}, { timestamps: true });

module.exports = mongoose.model('Service', ServiceSchema);
