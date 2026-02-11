const mongoose = require('mongoose');

const PortfolioSchema = new mongoose.Schema({
    title: { type: String, required: true },
    client: { type: String },
    category: { type: String },
    imageUrl: { type: String, required: true },
    description: { type: String },
    link: { type: String }, // Link to live project or case study
    featured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', PortfolioSchema);
