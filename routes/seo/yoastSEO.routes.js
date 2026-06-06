const express = require("express");
const YoastSEO = require("../../models/seo/YoastSEO");
const { validateYoastSEO, handleValidationErrors } = require('../../middlewares/validation');
const { protect } = require('../../middlewares/auth');

const router = express.Router();

// @desc    Get all Yoast SEO entries
// @route   GET /api/yoast-seo
// @access  Private (Admin only)
router.get("/", protect, async (req, res) => {
  try {
    const { search } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { seo_keyphrase: { $regex: search, $options: "i" } },
        { seo_title: { $regex: search, $options: "i" } },
        { meta_description: { $regex: search, $options: "i" } },
        { googletags: { $regex: search, $options: "i" } },
      ];
    }

    const seoList = await YoastSEO.find(query).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: seoList,
    });
  } catch (error) {
    console.error("Get Yoast SEO error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @desc    Create new YoastSEO
// @route   POST /api/yoast-seo
// @access  Private (Admin only)
router.post("/", protect, validateYoastSEO, handleValidationErrors, async (req, res) => {
  try {
    const seo = await YoastSEO.create(req.body);
    res.status(201).json({ success: true, data: seo });
  } catch (err) {
    console.error("Create SEO error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @desc    Update YoastSEO
// @route   PUT /api/yoast-seo/:id
// @access  Private (Admin only)
router.put("/:id", protect, validateYoastSEO, handleValidationErrors, async (req, res) => {
  try {
    const updated = await YoastSEO.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ success: false, message: "SEO entry not found" });
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error("Update SEO error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @desc    Delete YoastSEO
// @route   DELETE /api/yoast-seo/:id
// @access  Private (Admin only)
router.delete("/:id", protect, handleValidationErrors, async (req, res) => {
  try {
    const deleted = await YoastSEO.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "SEO entry not found" });
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete SEO error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @desc    Bulk Delete YoastSEO
// @route   POST /api/yoast-seo/bulk-delete
// @access  Private (Admin only)
router.post(
  "/bulk-delete",
  protect,
  handleValidationErrors,
  async (req, res) => {
    try {
      const { ids } = req.body;

      if (!Array.isArray(ids) || !ids.length) {
        return res
          .status(400)
          .json({ success: false, message: "IDs array is required" });
      }

      const result = await YoastSEO.deleteMany({ _id: { $in: ids } });
      res.json({ success: true, deletedCount: result.deletedCount });
    } catch (err) {
      console.error("Bulk delete SEO error:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }
);

module.exports = router;
