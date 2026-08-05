const mongoose = require("mongoose");

const expertiseIndustriesSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        bgImage: {
            type: String,
            default: "",
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model(
    "ExpertiseIndustries",
    expertiseIndustriesSchema,
);
