const mongoose = require("mongoose");

const yoastSEOSchema = new mongoose.Schema(
  {
    seo_keyphrase: {
      type: String,
      maxlength: 200,
      default: "",
    },
    seo_title: {
      type: String,
      maxlength: 200,
      default: "",
    },
    meta_description: {
      type: String,
      maxlength: 300,
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
  },
  { timestamps: true }
);

module.exports = mongoose.model("YoastSEO", yoastSEOSchema);
