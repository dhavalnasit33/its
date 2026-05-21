const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    moduleType: {
      type: String,
      required: true,
      enum: ["services", "blogs", "portfolio", "faqs", "hire"],
    },
    image: { type: String, default: "" },
  },
  {
    timestamps: true,
  },
);

CategorySchema.index({ category: 1, moduleType: 1 }, { unique: true });
module.exports = mongoose.model("CategoryModel", CategorySchema);
