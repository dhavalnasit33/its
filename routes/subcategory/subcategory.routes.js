const express = require("express");
const SubcategoryModel = require("../../models/subcategory/subcategory.model");
const CategoryModel = require("../../models/category/category.model");

const { protect } = require("../../middlewares/auth");
const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { category, subcategory } = req.body;

    if (!category || !subcategory) {
      return res.status(400).json({
        success: false,
        message: "Category and subcategory are both required",
      });
    }

    const existing = await SubcategoryModel.findOne({ category, subcategory });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "This subcategory already exists under the selected category",
      });
    }

    const newSubcategory = new SubcategoryModel({ category, subcategory });
    await newSubcategory.save();

    res.status(201).json({
      success: true,
      message: "Subcategory created successfully",
      data: newSubcategory,
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
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.search) {
      filter.$or = [
        { subcategory: { $regex: req.query.search, $options: "i" } },
      ];
    }

    const [total, subcategories] = await Promise.all([
      SubcategoryModel.countDocuments(filter),
      SubcategoryModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
    ]);

    const categoryIds = [...new Set(subcategories.map((s) => s.category))];

    const categories = await CategoryModel.find({
      _id: { $in: categoryIds },
    }).select("_id category"); 
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat._id.toString()] = cat.category;
    });

    const data = subcategories.map((item) => ({
      ...item.toObject(),
      categoryName: categoryMap[item.category] || "N/A",
    }));

    const pages = Math.ceil(total / limit) || 1;

    res.status(200).json({
      success: true,
      data,
      pagination: { current: page, pages, total, limit },
    });
  } catch (error) {
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
        message: "ids array is required — e.g. { ids: ['id1', 'id2'] }",
      });
    }

    const result = await SubcategoryModel.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "No subcategories found with the provided IDs",
      });
    }

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} subcategory(s) deleted successfully`,
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

router.get("/:id", protect, async (req, res) => {
  try {
    const subcategory = await SubcategoryModel.findById(req.params.id);

    if (!subcategory) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    res.status(200).json({
      success: true,
      data: subcategory,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid subcategory ID",
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
    const { category, subcategory } = req.body;

    if (!category || !subcategory) {
      return res.status(400).json({
        success: false,
        message: "Category and subcategory are both required",
      });
    }

    const duplicate = await SubcategoryModel.findOne({
      category,
      subcategory,
      _id: { $ne: req.params.id },
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "This subcategory already exists under the selected category",
      });
    }

    const updated = await SubcategoryModel.findByIdAndUpdate(
      req.params.id,
      { category, subcategory },
      { new: true, runValidators: true },
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subcategory updated successfully",
      data: updated,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid subcategory ID",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

// DELETE /subcategory/:id — Delete single
router.delete("/:id", protect, async (req, res) => {
  try {
    const deleted = await SubcategoryModel.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subcategory deleted successfully",
      data: deleted,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({
        success: false,
        message: "Invalid subcategory ID",
      });
    }
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
