const mongoose = require("mongoose");

const FaqCategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FaqCategory", FaqCategorySchema);
