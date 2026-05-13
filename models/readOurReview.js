const mongoose = require("mongoose");

const readOurReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ReadOurReview", readOurReviewSchema);
