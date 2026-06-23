const mongoose = require('mongoose');
// const HeroPointSchema = new mongoose.Schema({
//     label: {
//         type: String,
//         required: true
//     },
//     image: {
//         type: String,
//         required: true
//     }
// }, { _id: false });

const HeroSectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle:{
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
    ratings: [{
        rating: {
        type: Number,   // ⭐ NEW FIELD
        required: true,
        min: 0,
        max: 5
      },
        image: {
            type: String,
            required: true
        },
    }],

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
    //     type: [HeroPointSchema],
    //     required: true,
    //     validate: [arr => arr.length === 4, 'Exactly 4 points required']
    // }
}, { _id: false });

const WhyCompanySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    companyDetails: [
        {
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
        }
    ]
});
const ReasonsChooseSchema = new mongoose.Schema({
    detailBox: [{
        total: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    }]

}, { _id: false });

// const WhoWeAreSchema = new mongoose.Schema({
//     description:{
//             type: String,
//             required: true
//         },
//     image: {
//         type: String,
//         required: true,
//         // default: null
//     },
// }, { _id: false });

const GoalsSchema = new mongoose.Schema({
    goalsDetails: {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        }
    },
    missionTitle: {
        type: String,
        required: true
    },
    missionDescription: {
        type: String,
        required: true
    },
    missionImage: {
        type: String,
        required: true,
        default: null
    },
    visionTitle: {
        type: String,
        required: true
    },
    visionDescription: {
        type: String,
        required: true
    },
    visionImage: {
        type: String,
        required: true,
        default: null
    },
    valuesTitle: {
        type: String,
        required: true
    },
    valuesDescription: {
        type: String,
        required: true
    },
    valuesImage: {
        type: String,
        required: true,
        default: null
    }
}, { _id: false });

const Flagschema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    flagsDetails: [
        {
            image: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
        }
    ]
}, { _id: false });

const SEOSchema = new mongoose.Schema(
    {
        title: { type: String, default: "" },
        keyphrase: { type: String, default: "" },
        seoDescription: { type: String, default: "" },
        featureImage: { type: String, default: null },
    },
    { _id: false },
);

const AboutUsSchema = new mongoose.Schema({
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
    whyCompany: WhyCompanySchema,
    ReasonsChoose: ReasonsChooseSchema,
    // whoWeAre: WhoWeAreSchema,
    goals: GoalsSchema,
    flags: Flagschema,
    seo: SEOSchema,
}, { timestamps: true });

module.exports = mongoose.model('AboutUs', AboutUsSchema);


