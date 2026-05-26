const express = require("express");
const HireCategory = require("../../models/category/hireCategory.model");
const HirePageData = require("../../models/hire/hirePageData");
const { protect } = require("../../middlewares/auth");
const mongoose = require("mongoose");

const router = express.Router();

// Helper to check category usage
async function checkCategoryUsage(categoryId) {
  const count = await HirePageData.countDocuments({ category: categoryId });
  const reasons = [];
  if (count > 0) reasons.push(`${count} Hire Page(s)`);
  return reasons;
}

// @desc    Create category
// @route   POST /api/hire-category
// @access  Private (Admin only)
router.post("/", protect, async (req, res) => {
  try {
    const { category, image } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category name is required",
      });
    }

    const existingCategory = await HireCategory.findOne({ category });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const newCategory = new HireCategory({ category, image });
    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Hire category created successfully",
      data: newCategory,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @desc    Get all categories
// @route   GET /api/hire-category
// @access  Private/Public
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { search } = req.query;

    const skip = (page - 1) * limit;

    const query = {};
    if (search) {
      query.category = { $regex: search, $options: "i" };
    }

    const [categories, total] = await Promise.all([
      HireCategory.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      HireCategory.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      message: "Hire categories fetched successfully",
      data: categories,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total: total,
        limit: limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @desc    Get single category by ID
// @route   GET /api/hire-category/:id
// @access  Private (Admin only)
router.get("/:id", protect, async (req, res) => {
  try {
    const category = await HireCategory.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Hire category not found",
      });
    }

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @desc    Update category
// @route   PUT /api/hire-category/:id
// @access  Private (Admin only)
router.put("/:id", protect, async (req, res) => {
  try {
    const { category, image } = req.body;

    const categoryDoc = await HireCategory.findById(req.params.id);
    if (!categoryDoc) {
      return res.status(404).json({
        success: false,
        message: "Hire category not found",
      });
    }

    const finalCategory = category !== undefined ? category : categoryDoc.category;

    if (!finalCategory) {
      return res.status(400).json({
        success: false,
        message: "Category name cannot be empty",
      });
    }

    const duplicate = await HireCategory.findOne({
      category: finalCategory,
      _id: { $ne: req.params.id },
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    categoryDoc.category = finalCategory;
    if (image !== undefined) categoryDoc.image = image;

    await categoryDoc.save();

    res.status(200).json({
      success: true,
      message: "Hire category updated successfully",
      data: categoryDoc,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @desc    Delete category by ID (Restricted if in use)
// @route   DELETE /api/hire-category/:id
// @access  Private (Admin only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const categoryDoc = await HireCategory.findById(req.params.id);
    if (!categoryDoc) {
      return res.status(404).json({
        success: false,
        message: "Hire category not found",
      });
    }

    const usage = await checkCategoryUsage(req.params.id);
    if (usage.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete category because it is actively used in: ${usage.join(", ")}. Please reassign or delete these items first.`,
      });
    }

    await categoryDoc.deleteOne();

    res.status(200).json({
      success: true,
      message: "Hire category deleted successfully",
      data: categoryDoc,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// @desc    Bulk Delete categories (Restricted if in use)
// @route   POST /api/hire-category/bulk/delete
// @access  Private (Admin only)
router.post("/bulk/delete", protect, async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "ids array required — e.g. { ids: ['id1', 'id2'] }",
      });
    }

    const activeUsageList = [];
    for (const id of ids) {
      const usage = await checkCategoryUsage(id);
      if (usage.length > 0) {
        const cat = await HireCategory.findById(id);
        const name = cat ? cat.category : id;
        activeUsageList.push(`"${name}" (${usage.join(", ")})`);
      }
    }

    if (activeUsageList.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete categories. The following are actively in use: ${activeUsageList.join("; ")}`,
      });
    }

    const result = await HireCategory.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} categories deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
