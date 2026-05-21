const express = require("express");
const mongoose = require("mongoose");
const FaqModel = require("../../models/faqs/faqs.model");
const CategoryModel = require("../../models/category/category.model");
const { populateMixed } = require("../../utils/mixedPopulate");
const { protect } = require("../../middlewares/auth");

const router = express.Router();

//create route
router.post("/", protect, async (req, res) => {
  try {
    console.log("🚀 ~ router.post ~ req.body:", req.body);
    const { categories, title, answer } = req.body;

    if (!categories || !title || !answer) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const existingFaq = await FaqModel.findOne({ title });
    if (existingFaq) {
      return res.status(400).json({
        success: false,
        message: "Title already exists",
      });
    }

    const faq = new FaqModel({
      categories,
      title,
      answer,
    });

    await faq.save();
    res.status(201).json({
      success: true,
      message: "FAQ created successfully",
      data: faq,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

//category fetch route
router.get("/categories", async (req, res) => {
  try {
    const rawCategoryIds = await FaqModel.distinct("categories");

    if (!rawCategoryIds || rawCategoryIds.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    const catObjectIds = rawCategoryIds.filter(c => mongoose.Types.ObjectId.isValid(c));
    const catStrings = rawCategoryIds.filter(c => !mongoose.Types.ObjectId.isValid(c));

    const dbCategories = await CategoryModel.find({
      _id: { $in: catObjectIds },
    }).select("_id category image").lean();

    const stringCategories = catStrings.map(str => ({
      category: str
    }));

    res.status(200).json({
      success: true,
      data: [...dbCategories, ...stringCategories],
    });
  } catch (error) {
    console.error("❌ Error getting categories:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching categories",
      error: error.message,
    });
  }
});

//admin gaet route
router.get("/admin", async (req, res) => {
  try {
    const { page = 1, limit = 10, category = "" } = req.query;

    const query = {};
    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        query.categories = category;
      } else {
        const catDoc = await CategoryModel.findOne({ category: category.trim(), moduleType: "faqs" });
        if (catDoc) {
          query.$or = [
            { categories: category },
            { categories: catDoc._id }
          ];
        } else {
          query.categories = category;
        }
      }
    }
    const skip = (page - 1) * limit;

    const [rawFaqData, total] = await Promise.all([
      FaqModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      FaqModel.countDocuments(query),
    ]);

    const faqData = await populateMixed(rawFaqData, { categories: "category" });

    res.status(200).json({
      success: true,
      data: faqData,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    console.error("❌ Error getting faqs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const faq = await FaqModel.findById(req.params.id);
    if (!faq) {
      return res
        .status(404)
        .json({ success: false, message: "Faqs not found" });
    }
    res.json({ success: true, data: faq });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

//fronted get route
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, category = "" } = req.query;

    const query = {};
    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        query.categories = category;
      } else {
        const catDoc = await CategoryModel.findOne({ category: category.trim(), moduleType: "faqs" });
        if (catDoc) {
          query.$or = [
            { categories: category },
            { categories: catDoc._id }
          ];
        } else {
          query.categories = category;
        }
      }
    }

    const skip = (Number(page) - 1) * Number(limit);

    const [rawFaqData, total] = await Promise.all([
      FaqModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      FaqModel.countDocuments(query),
    ]);

    const faqData = await populateMixed(rawFaqData, { categories: "category" });

    res.status(200).json({
      success: true,

      data: faqData,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total,
      },
    });
  } catch (error) {
    console.error("❌ Error getting faqs:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

// edit route
router.put("/:id", protect, async (req, res) => {
  try {
    const { categories, title, answer } = req.body;

    const existingFaq = await FaqModel.findOne({
      title,
      _id: { $ne: req.params.id },
    });

    if (existingFaq) {
      return res.status(400).json({
        success: false,
        message: "આ Title સાથે FAQ પહેલેથી અસ્તિત્વમાં છે",
      });
    }

    const updateData = {
      categories,
      title,
      answer,
    };

    const updatedFaq = await FaqModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true },
    );

    if (!updatedFaq) {
      return res.status(404).json({
        success: false,
        message: "FAQS not found",
      });
    }

    res.json({
      success: true,
      message: "FAQ updeted successfully",
      data: updatedFaq,
    });
  } catch (error) {
    console.error("❌ Update Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

//delete route
router.delete("/:id", protect, async (req, res) => {
  try {
    const faq = await FaqModel.findByIdAndDelete(req.params.id);

    if (!faq) {
      return res.status(404).json({
        success: false,
        message: "FAQ મળ્યો નથી (FAQ not found)",
      });
    }

    res.json({
      success: true,
      message: "FAQ deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete Error:", error);
    res.status(500).json({
      success: false,
      message: "(Server error)",
      error: error.message,
    });
  }
});

module.exports = router;
