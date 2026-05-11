const mongoose = require("mongoose");

const SubcategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    subcategory: {
      type: String,
      required: [true, "Subcategory is required"],
    },
  },
  {
    timestamps: true,
  },
);

SubcategorySchema.index({ category: 1, subcategory: 1 }, { unique: true });

module.exports = mongoose.model("Subcategory", SubcategorySchema);
