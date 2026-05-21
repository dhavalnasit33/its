const express = require("express");
const SubcategoryModel = require("../../models/subcategory/subcategory.model");
const CategoryModel = require("../../models/category/category.model");
const { protect } = require("../../middlewares/auth");

const router = express.Router();

// Helper to check subcategory usage across all content schemas
async function checkSubcategoryUsage(subcategoryId) {
  const [servicesCount, blogsCount, hireCount] = await Promise.all([
    require("../../models/ourServices/ourServies").countDocuments({ subCategory: subcategoryId }),
    require("../../models/blog/blog.model").countDocuments({ subCategories: subcategoryId }),
    require("../../models/hire/hirePageData").countDocuments({ subCategory: subcategoryId }),
  ]);

  const reasons = [];
  if (servicesCount > 0) reasons.push(`${servicesCount} Service(s)`);
  if (blogsCount > 0) reasons.push(`${blogsCount} Blog(s)`);
  if (hireCount > 0) reasons.push(`${hireCount} Hire Page(s)`);

  return reasons;
}

// @desc    Create subcategory
// @route   POST /api/subcategory
// @access  Private (Admin only)
router.post("/", protect, async (req, res) => {
  try {
    const { category, subcategory, moduleType } = req.body;

    if (!category || !subcategory) {
      return res.status(400).json({
        success: false,
        message: "Category parent ID and subcategory name are both required",
      });
    }

    const parentCategory = await CategoryModel.findById(category);
    if (!parentCategory) {
      return res.status(404).json({
        success: false,
        message: "Parent Category not found",
      });
    }

    const finalModuleType = moduleType || parentCategory.moduleType;

    const validModules = ["services", "blogs", "portfolio", "faqs", "hire"];
    if (!validModules.includes(finalModuleType)) {
      return res.status(400).json({
        success: false,
        message: `moduleType must be one of: ${validModules.join(", ")}`,
      });
    }

    const existing = await SubcategoryModel.findOne({
      category,
      subcategory,
      moduleType: finalModuleType,
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "This subcategory already exists under the selected category",
      });
    }

    const newSubcategory = new SubcategoryModel({
      category,
      subcategory,
      moduleType: finalModuleType,
    });
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

// @desc    Get all subcategories (with optional filtering)
// @route   GET /api/subcategory
// @access  Private/Public (depending on setup, keeping protect as per original)
router.get("/", protect, async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;

    const filter = {};
    if (req.query.search) {
      filter.subcategory = { $regex: req.query.search, $options: "i" };
    }
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.moduleType) {
      filter.moduleType = req.query.moduleType;
    }

    const [total, subcategories] = await Promise.all([
      SubcategoryModel.countDocuments(filter),
      SubcategoryModel.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
    ]);

    const categoryIds = [...new Set(subcategories.map((s) => s.category.toString()))];

    const categories = await CategoryModel.find({
      _id: { $in: categoryIds },
    }).select("_id category");

    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat._id.toString()] = cat.category;
    });

    const data = subcategories.map((item) => ({
      ...item.toObject(),
      categoryName: categoryMap[item.category.toString()] || "N/A",
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

// @desc    Get single subcategory
// @route   GET /api/subcategory/:id
// @access  Private (Admin only)
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

// @desc    Update subcategory
// @route   PUT /api/subcategory/:id
// @access  Private (Admin only)
router.put("/:id", protect, async (req, res) => {
  try {
    const { category, subcategory, moduleType } = req.body;

    const subcategoryDoc = await SubcategoryModel.findById(req.params.id);
    if (!subcategoryDoc) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    const finalCategory = category !== undefined ? category : subcategoryDoc.category;
    const finalSubcategory = subcategory !== undefined ? subcategory : subcategoryDoc.subcategory;

    let finalModuleType = moduleType;
    if (!finalModuleType) {
      const parentCategory = await CategoryModel.findById(finalCategory);
      finalModuleType = parentCategory ? parentCategory.moduleType : subcategoryDoc.moduleType;
    }

    const duplicate = await SubcategoryModel.findOne({
      category: finalCategory,
      subcategory: finalSubcategory,
      moduleType: finalModuleType,
      _id: { $ne: req.params.id },
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: "This subcategory already exists under the selected category",
      });
    }

    subcategoryDoc.category = finalCategory;
    subcategoryDoc.subcategory = finalSubcategory;
    subcategoryDoc.moduleType = finalModuleType;

    await subcategoryDoc.save();

    res.status(200).json({
      success: true,
      message: "Subcategory updated successfully",
      data: subcategoryDoc,
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

// @desc    Delete subcategory (Restricted if in use)
// @route   DELETE /api/subcategory/:id
// @access  Private (Admin only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const subcategoryDoc = await SubcategoryModel.findById(req.params.id);
    if (!subcategoryDoc) {
      return res.status(404).json({
        success: false,
        message: "Subcategory not found",
      });
    }

    // Safety usage check
    const usage = await checkSubcategoryUsage(req.params.id);
    if (usage.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete subcategory because it is actively used in: ${usage.join(", ")}. Please reassign or delete these items first.`,
      });
    }

    await subcategoryDoc.deleteOne();

    res.status(200).json({
      success: true,
      message: "Subcategory deleted successfully",
      data: subcategoryDoc,
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

// @desc    Bulk Delete subcategories (Restricted if in use)
// @route   DELETE /api/subcategory/bulk/delete
// @access  Private (Admin only)
router.delete("/bulk/delete", protect, async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "ids array is required — e.g. { ids: ['id1', 'id2'] }",
      });
    }

    // Check usage for all requested subcategory ids
    const activeUsageList = [];
    for (const id of ids) {
      const usage = await checkSubcategoryUsage(id);
      if (usage.length > 0) {
        const sub = await SubcategoryModel.findById(id);
        const name = sub ? sub.subcategory : id;
        activeUsageList.push(`"${name}" (${usage.join(", ")})`);
      }
    }

    if (activeUsageList.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete subcategories. The following are actively in use: ${activeUsageList.join("; ")}`,
      });
    }

    const result = await SubcategoryModel.deleteMany({ _id: { $in: ids } });

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

module.exports = router;
