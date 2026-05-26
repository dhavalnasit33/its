const mongoose = require('mongoose');

const BlogDetailSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    answerOrDetails: {
        type: String,
        required: true
    }
}, { _id: false });

const BlogSchema = new mongoose.Schema(
    {
        categories: {
            type: mongoose.Schema.Types.Mixed,
            ref: "BlogCategory",
            required: true
        },
        subCategories: {
            type: mongoose.Schema.Types.Mixed,
            ref: "BlogSubcategory",
            required: true
        },
        image: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        details: BlogDetailSchema,

        // ✅ ADDED SEO FIELDS
        seo_title: {
            type: String,
            default: "",
        },
        meta_description: {
            type: String,
            default: "",
        },
        seo_keyphrase: {
            type: String,
            default: "",
        },
        cover_image: { // For social media sharing
            type: String,
            default: "",
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Blog', BlogSchema);