const mongoose = require("mongoose");

const WebsiteSettingsSchema = new mongoose.Schema(
  {
    favicon: {
      type: String,
      default: "",
    },
    logo_img: {
      type: String,
      default: "",
    },
    address: {
      type: [String],
      default: [],
    },
    emails: [
      {
        email: {
          type: String,
          required: true,
          trim: true,
          lowercase: true,
        },
        emailType: {
          type: String,
          required: true,
          enum: ["hr", "sales", "contact"],
        },
      },
    ],
    phone: {
      type: [String],
      default: [],
    },
    social_media: [
      {
        socialMediaName: {
          type: String,
          default: "",
        },
        link: {
          type: String,
          default: "",
        },
        image: {
          type: String,
          default: "",
        }
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("WebsiteSettings", WebsiteSettingsSchema);
