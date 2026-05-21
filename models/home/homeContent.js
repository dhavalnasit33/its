const mongoose = require('mongoose');

const HeroSectonSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    // image: {
    //     type: String,
    //     required: true
    // },
    description: {
        type: String,
        required: true
    },
    technologySection: [{
        title: {
            type: String,
            required: true
        },
    }]
}, {
    _id: false
});

const ReasonsToChooseSchema = new mongoose.Schema({
    deatailBox: [{
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

const aiSectionSchema = new mongoose.Schema({
    subtitle: {
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
    deatailBox: [{
        title:  {
            type: String,
            required: true
        },
        heading:  {
            type: String,
            required: true
        },
        description:  {
            type: String,
            required: true
        },
        // gradient: {
        //     type: String, 
        //     required: true,
        //     default: "from-blue-500 to-cyan-400"
        // }
    }]
});


const AboutOurCompanySchema = new mongoose.Schema({
    subtitle: {
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
    deatailBox: [{
        label: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }
    }],
    image: {
        type: String,
        required: true
    },
    buttonContent: {
        total: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        }

    }
}, { _id: false })

const OverseasWebAgenciesSchema = new mongoose.Schema({
    mainTitle: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },
    desctiption: {
        type: String,
        required: true
    },
    detail: {
        title: {
            type: String,
            required: true
        },
        subtitle: {
            type: String,
            required: true
        }
    },
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

const HomePageDataSchema = new mongoose.Schema({
    heroSecton: HeroSectonSchema,
    reasonsToChoose: ReasonsToChooseSchema,
    aisection: aiSectionSchema,
    aboutOurCompany: AboutOurCompanySchema,
    overseasWebAgencies: OverseasWebAgenciesSchema,
    seo: SEOSchema
}, { timestamps: true })


module.exports = mongoose.model('HomePageData', HomePageDataSchema)