const mongoose = require("mongoose");

const PageSchema = new mongoose.Schema(
  {
    page_title:       { type: String, required: true },
    page_description: { type: String, default: "" },
    slug:             { type: String, required: true, unique: true, trim: true },
    image:            { type: String, default: "" },
    seo: {
      title:          { type: String, default: "" },
      keyphrase:      { type: String, default: "" },
      seoDescription: { type: String, default: "" },
      featureImage:   { type: String, default: "" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("pages", PageSchema);