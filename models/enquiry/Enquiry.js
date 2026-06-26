const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema(
    {
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:null
        },
        type: {
            type: String,
            required: true,
            enum: ["Career", "Training", "Contact", "Hire", "FooterForm", "PopupForm"],
        },
        // Common Fields
        name: {
            type: String,
            required: true,
            trim: true,
        },
        firstname: {
            type: String,
            trim: true,
        },
        lastname: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            trim: true,
        },

        // Career Specific
        graduation: {
            type: String,
        },
        experience: {
            type: String,
        },
        positionApplied: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "OpenningPosition",
        },
        currentCTC: {
            type: String,
        },
        noticePeriod: {
            type: String,
        },

        // Training Specific
        location: {
            type: String,
        },
        selectedCourse: {
            type: String,
            enum: [
                "Web Development",
                "Full Stack Development",
                "Mobile App Development",
                "UI/UX Design",
                "Web Design",
                "Other Services",
            ],
        },

        // Contact/Hire Specific
        budget: {
            type: String,
            default: "",
        },
        recruitment: {
            type: String,
        },
        source: {
            type: String,
            enum: ["footer_form", "contact_page", "hire_page", "career_page", "training_page", "popup_form"],
            default: "footer_form",
        },

        // File
        fileUrl: {
            type: String,
            default: null,
        },
        ip: {
            type: String,
            default: null,
        },

        // Admin Metadata
        status: {
            type: String,
            enum: ["Pending", "Reviewed", "Contacted", "Closed"],
            default: "Pending",
        },
        adminNotes: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Enquiry", EnquirySchema);
