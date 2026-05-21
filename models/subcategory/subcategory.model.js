const mongoose = require("mongoose");

const SubcategorySchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryModel",
      required: [true, "Category is required"],
    },
    subcategory: {
      type: String,
      required: [true, "Subcategory is required"],
    },
    moduleType: {
      type: String,
      required: true,
      enum: ["services", "blogs", "hire"], //"portfolio", "faqs",
    },
  },
  {
    timestamps: true,
  },
);

SubcategorySchema.index({ category: 1, subcategory: 1, moduleType: 1 }, { unique: true });

module.exports = mongoose.model("Subcategory", SubcategorySchema);
