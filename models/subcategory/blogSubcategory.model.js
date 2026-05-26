const mongoose = require("mongoose");

const BlogSubcategorySchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BlogCategory",
      required: [true, "Category is required"],
    },
    subcategory: {
      type: String,
      required: [true, "Subcategory is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

BlogSubcategorySchema.index({ category: 1, subcategory: 1 }, { unique: true });

module.exports = mongoose.model("BlogSubcategory", BlogSubcategorySchema);
