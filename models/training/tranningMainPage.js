const mongoose = require('mongoose');

const HeroSectionSchema = new mongoose.Schema({
    subTitle: {
        type: String,
        required: true
    },
    mainTitle: {
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
}, { _id: false });

const AboutusSectionSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    subTitle: {
        type: String,
        required: true
    },
    mainTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    detailbox: {
        title: {
            type: String,
            required: true
        },
        detailbox: [{
            heading: {
                type: String,
                required: true
            },
            description: {
                type: String,
                required: true
            }
        }]
    }

}, { _id: false });

const ITSInstituteFacilitiesSectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    points: [{
        heading: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
    }]
}, { _id: false })

const rightCoursePickSectionSchema = new mongoose.Schema({
    mainHeading: {
        type: String,
        required: true
    },
    cardBox: [{
        heading: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
    }],
    subTitle: {
        type: String,
        required: true
    },
    mainTitle: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    detailbox: [{
        image: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    }]

}, { _id: false })

const SEOSchema = new mongoose.Schema(
    {
        title: { type: String, default: "" },
        keyphrase: { type: String, default: "" },
        seoDescription: { type: String, default: "" },
        featureImage: { type: String, default: null },
    },
    { _id: false },
);

const TranningMainPageSchema = new mongoose.Schema({
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
    heroSection: HeroSectionSchema,
    aboutusSection: AboutusSectionSchema,
    itsInstituteFacilitiesSection: ITSInstituteFacilitiesSectionSchema,
    rightCoursePickSection: rightCoursePickSectionSchema,
    seo: SEOSchema,
}, { timestamps: true });

module.exports = mongoose.model('TrainingMainPageData', TranningMainPageSchema)