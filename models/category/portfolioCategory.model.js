const mongoose = require("mongoose");

const PortfolioCategorySchema = new mongoose.Schema(
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

module.exports = mongoose.model("PortfolioCategory", PortfolioCategorySchema);
