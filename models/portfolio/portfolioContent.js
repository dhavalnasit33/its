const mongoose = require('mongoose');

const SEOSchema = new mongoose.Schema(
  {
    title: { type: String, default: "" },
    keyphrase: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    featureImage: { type: String, default: null },
  },
  { _id: false },
);
// const PortfolioHeroPointSchema = new mongoose.Schema({
//     label: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String,
//         required: true
//     }
// }, { _id: false });

const portfolioContentSchema = new mongoose.Schema({
    pagename: {
        type: String,
        required: true,
        default: ""
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        default: ""
    },
    heroSection: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        // points: {
        //     label: {
        //         type: String,
        //         required: true
        //     },
        //     image: {
        //         type: String,
        //         required: true
        //     }
        // }
        // points: {
        //     type: [PortfolioHeroPointSchema],
        //     required: true,
        //     validate: [arr => arr.length === 4, 'Exactly 4 points required']
        // }
    },
    seo: SEOSchema,
}, { timestamps: true })

module.exports = mongoose.model('PortfolioContent', portfolioContentSchema);