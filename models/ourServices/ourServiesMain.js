const mongoose = require("mongoose");

// Schema for manually entered points
const ManualPointSchema = new mongoose.Schema(
    {
        label: { type: String, required: true },
        image: { type: String, required: true },
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true,
        },
    },
    { _id: false }
);

const HeroSectionSchema = new mongoose.Schema({
    image: { type: String, required: true },
    title: { type: String, required: true },
    points: [ManualPointSchema],
});

const TechnologyDetailSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, 
    technologyDetail: [{
        label: { type: String, required: true },
        image: { type: String, required: true }
    }],
    developmentDetail: [ManualPointSchema],
});

const SEOSchema = new mongoose.Schema(
    {
        title: { type: String, default: "" },
        keyphrase: { type: String, default: "" },
        seoDescription: { type: String, default: "" },
        featureImage: { type: String, default: null },
    },
    { _id: false },
);

const OurServicesSchema = new mongoose.Schema(
    {
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
        mainTitle: { type: String, required: true },
        description: { type: String, required: true },
        heroSections: [HeroSectionSchema],
        technologyDetails: [TechnologyDetailSchema],
        seo: SEOSchema,
    },
    { timestamps: true }
);

module.exports = mongoose.model("OurServicesMain", OurServicesSchema);
