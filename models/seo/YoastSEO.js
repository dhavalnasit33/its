const mongoose = require("mongoose");

const yoastSEOSchema = new mongoose.Schema(
  {
    seo_keyphrase: {
      type: String,
      default: "",
    },
    seo_title: {
      type: String,
      default: "",
    },
    meta_description: {
      type: String,
      default: "",
    },
    cover_image: {
      type: String,
      default: "",
    },
    page_description: {
      type: String,
      default: "",
    },
    googletags: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("YoastSEO", yoastSEOSchema);
