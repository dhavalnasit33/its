const mongoose = require("mongoose");

const HeroSectionSchema = new mongoose.Schema(
    {
        image: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
    },
    { _id: false }
);

const CareerAtItsSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        image: { type: String, required: true },
        points: [{ type: String, required: true }],
    },
    { _id: false }
);

const WhyJoinItsSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        points: [
            {
                title: {
                    type: String,
                    required: true,
                },
                description: {
                    type: String,
                    required: true,
                },
                image: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    { _id: false }
);

const SEOSchema = new mongoose.Schema(
    {
        title: { type: String, default: "" },
        keyphrase: { type: String, default: "" },
        seoDescription: { type: String, default: "" },
        featureImage: { type: String, default: null },
    },
    { _id: false },
);

const CareerContentSchema = new mongoose.Schema(
    {
        heroSection: HeroSectionSchema,
        careerAtIts: CareerAtItsSchema,
        whyJoinIts: WhyJoinItsSchema,
        seo: SEOSchema,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("CareerContent", CareerContentSchema);