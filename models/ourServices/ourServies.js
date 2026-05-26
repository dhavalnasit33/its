const mongoose = require("mongoose");

const FAQSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const KeyPointBoxSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: [
      {
        name: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          default: null,
        },
      },
    ],
  },
  { _id: false },
);

const ToolDetailSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    section: {
      type: Number,
      required: true,
    },
    keyPoints: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { _id: false },
);

const ToolSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: { type: String },
    details: [ToolDetailSchema],
  },
  { _id: false },
);

const ContentBlockSchema = new mongoose.Schema(
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
      default: null,
    },
  },
  { _id: false },
);

const WhyWorkWithSchema = new mongoose.Schema(
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
      default: null,
    },
    content: [
      {
        title: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { _id: false },
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

const ServiceSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.Mixed,
      ref: "ServiceCategory",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.Mixed,
      ref: "Subcategory",
      required: false,
    },
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    mainTitle: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    subMainTitle: {
      type: String,
      required: true,
    },
    subMainTitleDescription: {
      type: String,
      required: true,
    },
    contentBlocks: [ContentBlockSchema],

    WhyWorkWithThis: WhyWorkWithSchema,

    workProgress: {
      type: String,
      default: null,
    },

    toolsAndTechnology: ToolSchema,

    whyCompanyPerfersThis: KeyPointBoxSchema,

    faqs: [FAQSchema],
    seo: { type: SEOSchema, default: () => ({}) },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Service", ServiceSchema);
