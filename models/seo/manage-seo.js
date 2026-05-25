const mongoose = require("mongoose");

const manageSeoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    seo_keyphrase: { type: String, default: "" },
    seo_title: { type: String, default: "" },
    meta_description: { type: String, default: "" },
    cover_image: { type: String, default: "" },
    // Relations
    linkedService: { type: mongoose.Schema.Types.ObjectId, ref: 'Service', default: null },
    linkedHirePage: { type: mongoose.Schema.Types.ObjectId, ref: 'HirePageData', default: null },
    linkedPage: { type: mongoose.Schema.Types.ObjectId, ref: 'pages', default: null },
    linkedType: { type: String, enum: ['service', 'hire', 'independent'], default: 'independent' },
    isAutoManaged: { type: Boolean, default: false }
}, { timestamps: true });

manageSeoSchema.index({ slug: 1 });
manageSeoSchema.index({ title: 1 });
manageSeoSchema.index({ linkedType: 1 });
manageSeoSchema.index({ linkedPage: 1 });
manageSeoSchema.index({ isAutoManaged: 1 });

module.exports = mongoose.model("ManageSeo", manageSeoSchema, "manage-seo");
