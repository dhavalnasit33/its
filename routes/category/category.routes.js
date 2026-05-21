const express = require("express");
const CategoryModel = require("../../models/category/category.model");
const { protect } = require("../../middlewares/auth");

const router = express.Router();

// Helper to check category usage across all content schemas
async function checkCategoryUsage(categoryId) {
  const [servicesCount, blogsCount, portfolioCount, faqsCount, hireCount, subcategoriesCount] = await Promise.all([
    require("../../models/ourServices/ourServies").countDocuments({ category: categoryId }),
    require("../../models/blog/blog.model").countDocuments({ categories: categoryId }),
    require("../../models/portfolio/creativeWork").countDocuments({ category: categoryId }),
    require("../../models/faqs/faqs.model").countDocuments({ categories: categoryId }),
    require("../../models/hire/hirePageData").countDocuments({ category: categoryId }),
    require("../../models/subcategory/subcategory.model").countDocuments({ category: categoryId }),
  ]);

  const reasons = [];
  if (servicesCount > 0) reasons.push(`${servicesCount} Service(s)`);
  if (blogsCount > 0) reasons.push(`${blogsCount} Blog(s)`);
  if (portfolioCount > 0) reasons.push(`${portfolioCount} Portfolio Item(s)`);
  if (faqsCount > 0) reasons.push(`${faqsCount} FAQ(s)`);
  if (hireCount > 0) reasons.push(`${hireCount} Hire Page(s)`);
  if (subcategoriesCount > 0) reasons.push(`${subcategoriesCount} Subcategory/Subcategories`);

  return reasons;
}

// @desc    Create category
// @route   POST /api/category
// @access  Private (Admin only)
router.post("/", protect, async (req, res) => {
  try {
    const { category, moduleType, image } = req.body;

    if (!category || !moduleType) {
      return res.status(400).json({
        success: false,
        message: "Category name and moduleType are both required",
      });
    }

    const validModules = ["services", "blogs", "portfolio", "faqs", "hire"];
    if (!validModules.includes(moduleType)) {
      return res.status(400).json({
        success: false,
        message: `moduleType must be one of: ${validModules.join(", ")}`,
      });
    }

    const existingCategory = await CategoryModel.findOne({ category, moduleType });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: `Category already exists in module "${moduleType}"`,
      });
    }

    const newCategory = new CategoryModel({ category, moduleType, image });
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

// @desc    Get all categories (with optional moduleType filtering)
// @route   GET /api/category
// @access  Private/Public (depending on protect setup, keeping protect as per original)
router.get("/", protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { moduleType, search } = req.query;

    const skip = (page - 1) * limit;

    const query = {};
    if (moduleType) {
      query.moduleType = moduleType;
    }
    if (search) {
      query.category = { $regex: search, $options: "i" };
    }

    const [categories, total] = await Promise.all([
      CategoryModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      CategoryModel.countDocuments(query),
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

// @desc    Get single category by ID
// @route   GET /api/category/:id
// @access  Private (Admin only)
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

// @desc    Update category
// @route   PUT /api/category/:id
// @access  Private (Admin only)
router.put("/:id", protect, async (req, res) => {
  try {
    const { category, moduleType, image } = req.body;

    const categoryDoc = await CategoryModel.findById(req.params.id);
    if (!categoryDoc) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const finalCategory = category !== undefined ? category : categoryDoc.category;
    const finalModuleType = moduleType !== undefined ? moduleType : categoryDoc.moduleType;

    if (!finalCategory || !finalModuleType) {
      return res.status(400).json({
        success: false,
        message: "Category name and moduleType cannot be empty",
      });
    }

    const validModules = ["services", "blogs", "portfolio", "faqs", "hire"];
    if (!validModules.includes(finalModuleType)) {
      return res.status(400).json({
        success: false,
        message: `moduleType must be one of: ${validModules.join(", ")}`,
      });
    }

    const duplicate = await CategoryModel.findOne({
      category: finalCategory,
      moduleType: finalModuleType,
      _id: { $ne: req.params.id },
    });

    if (duplicate) {
      return res.status(400).json({
        success: false,
        message: `Category already exists in module "${finalModuleType}"`,
      });
    }

    categoryDoc.category = finalCategory;
    categoryDoc.moduleType = finalModuleType;
    if (image !== undefined) categoryDoc.image = image;

    await categoryDoc.save();

    res.status(200).json({
      success: true,
      message: "Category updated successfully",
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
// @route   DELETE /api/category/:id
// @access  Private (Admin only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const categoryDoc = await CategoryModel.findById(req.params.id);
    if (!categoryDoc) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Safety usage check
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
      message: "Category deleted successfully",
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
// @route   DELETE /api/category/bulk/delete
// @access  Private (Admin only)
router.delete("/bulk/delete", protect, async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "ids array required — e.g. { ids: ['id1', 'id2'] }",
      });
    }

    // Check usage for all requested category ids
    const activeUsageList = [];
    for (const id of ids) {
      const usage = await checkCategoryUsage(id);
      if (usage.length > 0) {
        const cat = await CategoryModel.findById(id);
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

    const result = await CategoryModel.deleteMany({ _id: { $in: ids } });

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
