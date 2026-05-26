const mongoose = require("mongoose");

const ServiceCategorySchema = new mongoose.Schema(
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

module.exports = mongoose.model("ServiceCategory", ServiceCategorySchema);
