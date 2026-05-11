const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    image: { type: String, default: "" },
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("CategoryModel", CategorySchema);
