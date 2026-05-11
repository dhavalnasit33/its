const express = require("express");
const CategoryModel = require("../../models/category/category.model");
const { protect } = require("../../middlewares/auth");
const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { category, image } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category field is required",
      });
    }

    const existingCategory = await CategoryModel.findOne({ category });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const newCategory = new CategoryModel({ category, image });
    await newCategory.save();

    res.status(201).json({
      success: true,
      message: "Category created successfully",
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

router.get("/", protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      CategoryModel.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      CategoryModel.countDocuments(),
    ]);

    res.status(200).json({
      success: true,
      message: "Categories fetched successfully",
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

router.get("/:id", protect, async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
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

router.put("/:id", protect, async (req, res) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        success: false,
        message: "Category field is required",
      });
    }

    const duplicate = await CategoryModel.findOne({
      category,
      _id: { $ne: req.params.id },
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "Category with this name already exists",
      });
    }

    const updatedCategory = await CategoryModel.findByIdAndUpdate(
      req.params.id,
      { category },
      { new: true, runValidators: true },
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      data: updatedCategory,
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

router.delete("/:id", protect, async (req, res) => {
  try {
    const deletedCategory = await CategoryModel.findByIdAndDelete(
      req.params.id,
    );

    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      data: deletedCategory,
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

router.delete("/bulk/delete", protect, async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "ids array required — e.g. { ids: ['id1', 'id2'] }",
      });
    }

    const result = await CategoryModel.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found with provided IDs",
      });
    }

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
