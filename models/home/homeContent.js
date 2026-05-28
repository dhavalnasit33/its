const mongoose = require('mongoose');
const slugify = require("slugify");

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
        // default: ""
        default: null,
        sparse: true,
    },
    heroSecton: HeroSectonSchema,
    reasonsToChoose: ReasonsToChooseSchema,
    aisection: aiSectionSchema,
    aboutOurCompany: AboutOurCompanySchema,
    overseasWebAgencies: OverseasWebAgenciesSchema,
    seo: SEOSchema
}, { timestamps: true });

HomePageDataSchema.pre("save", function (next) {
  if (
    this.pagename.toLowerCase().trim() === "home" ||
    this.pagename.toLowerCase().trim() === "homepage"
  ) {
    this.slug = null;
  } else {
    this.slug = slugify(this.pagename, {
      lower: true,
      strict: true,
      trim: true,
    });
  }

  next();
});

module.exports = mongoose.model('HomePageData', HomePageDataSchema);

