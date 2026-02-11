const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    author: { type: String },
    date: { type: Date, default: Date.now },
    tags: [String],
    slug: { type: String, unique: true } // For URL routing
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
