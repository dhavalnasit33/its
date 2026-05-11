const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
      enum: [
        "Hire Developer(s)",
        "Web Development",
        "Mobile App Development",
        "UI/UX Design",
        "QA Service",
        "Digital Marketing",
        "Other Services",
      ],
    },
    budget: { type: String, default: "" },
    message: {
      type: String,
      required: true,
    },
    fileUrl: {
      type: String,
    },
    source: {
      type: String,
      enum: ["footer_form", "contact_page"],
      default: "footer_form",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Contact", contactSchema);
