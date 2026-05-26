const express = require("express");
const mongoose = require("mongoose");
const Blog = require("../../models/blog/blog.model");
const BlogCategory = require("../../models/category/blogCategory.model");
const BlogSubcategory = require("../../models/subcategory/blogSubcategory.model");
const { populateMixed } = require("../../utils/mixedPopulate");
const { protect } = require("../../middlewares/auth");
const cleanupImages = require("../../middlewares/cleanupImages");
const cleanupOldImages = require("../../middlewares/cleanupOldImages");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: API for managing blogs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     BlogDetail:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - author
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the blog
 *         description:
 *           type: string
 *           description: Content of the blog
 *         author:
 *           type: string
 *           description: Author of the blog
 *
 *     Blog:
 *       type: object
 *       required:
 *         - categories
 *         - subCategories
 *         - slug
 *         - details
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         categories:
 *           type: string
 *           description: Main category of the blog
 *         subCategories:
 *           type: string
 *           description: Subcategory of the blog
 *         slug:
 *           type: string
 *           description: Unique slug for the blog
 *         image:
 *           type: string
 *           description: Image URL for the blog
 *         details:
 *           type: array
 *           description: Array of blog details
 *           items:
 *             $ref: '#/components/schemas/BlogDetail'
 *         seo_title:
 *           type: string
 *           description: SEO title for the blog (meta title)
 *         meta_description:
 *           type: string
 *           description: Meta description for search engines
 *         seo_keyphrase:
 *           type: string
 *           description: Comma-separated SEO keywords
 *         cover_image:
 *           type: string
 *           description: Open Graph / social share image URL
 */

/**
 * @swagger
 * /api/blogs:
 *   post:
 *     summary: Create a new blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       201:
 *         description: Blog created successfully
 *       400:
 *         description: Missing required fields
 */
router.post("/", protect, async (req, res) => {
  try {
    // ✅ Updated destructuring to include SEO fields
    const {
      categories,
      subCategories,
      slug,
      image,
      details,
      seo_title,
      meta_description,
      seo_keyphrase,
      cover_image,
    } = req.body;

    if (!categories || !subCategories || !slug || !details) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const existingBlog = await Blog.findOne({ slug });
    if (existingBlog) {
      return res.status(400).json({
        success: false,
        message: "Slug already exists",
      });
    }

    // ✅ Updated Blog creation to include SEO fields
    const blog = new Blog({
      categories,
      subCategories,
      slug,
      image: image || "",
      details,
      seo_title,
      meta_description,
      seo_keyphrase,
      cover_image,
    });

    await blog.save();

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/blogs/admin:
 *   get:
 *     summary: Get blogs for admin panel with pagination, filters, and search
 *     tags: [Blogs]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           description: Filter by blog category
 *       - in: query
 *         name: subCategories
 *         schema:
 *           type: string
 *           description: Filter by blog subcategory
 *       - in: query
 *         name: value
 *         schema:
 *           type: string
 *           example: "AI"
 *           description: Search term to match against blog titles and SEO titles
 *     responses:
 *       200:
 *         description: List of blogs with pagination
 *       500:
 *         description: Server error
 */

router.get("/admin", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category = "",
      subCategories = "",
      value = "",
    } = req.query;

    const conditions = [];
    let resolvedCategoryId = null;

    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        resolvedCategoryId = category;
        const catObjId = new mongoose.Types.ObjectId(category);
        conditions.push({
          $or: [
            { categories: category },
            { categories: catObjId }
          ]
        });
      } else {
        const catDoc = await BlogCategory.findOne({ category: category.trim() });
        if (catDoc) {
          resolvedCategoryId = catDoc._id;
          conditions.push({
            $or: [
              { categories: category },
              { categories: catDoc._id },
              { categories: catDoc._id.toString() }
            ]
          });
        } else {
          conditions.push({ categories: category });
        }
      }
    }

    if (subCategories) {
      if (mongoose.Types.ObjectId.isValid(subCategories)) {
        const subObjId = new mongoose.Types.ObjectId(subCategories);
        conditions.push({
          $or: [
            { subCategories: subCategories },
            { subCategories: subObjId }
          ]
        });
      } else {
        const subQuery = { subcategory: subCategories.trim() };
        if (resolvedCategoryId) {
          subQuery.category = resolvedCategoryId;
        }
        let subDoc = await BlogSubcategory.findOne(subQuery);
        if (!subDoc && resolvedCategoryId) {
          subDoc = await BlogSubcategory.findOne({ subcategory: subCategories.trim() });
        }
        if (subDoc) {
          conditions.push({
            $or: [
              { subCategories: subCategories },
              { subCategories: subDoc._id },
              { subCategories: subDoc._id.toString() }
            ]
          });
        } else {
          conditions.push({ subCategories: subCategories });
        }
      }
    }

    if (value) {
      conditions.push({
        $or: [
          { "details.title": { $regex: value, $options: "i" } },
          { seo_title: { $regex: value, $options: "i" } },
        ]
      });
    }

    const query = conditions.length > 0 ? { $and: conditions } : {};

    const skip = (page - 1) * limit;

    const [rawBlogs, total] = await Promise.all([
      Blog.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Blog.countDocuments(query),
    ]);

    const blogs = await populateMixed(rawBlogs, {
      categories: { type: "category", model: BlogCategory },
      subCategories: { type: "subcategory", model: BlogSubcategory }
    });

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    console.error("❌ Error getting blogs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// Get API to fetch unique categories + subcategories
router.get("/categories", async (req, res) => {
  try {
    const rawCategories = await Blog.distinct("categories");
    const rawSubCategories = await Blog.distinct("subCategories");

    const catObjectIds = rawCategories.filter(c => mongoose.Types.ObjectId.isValid(c));
    const catStrings = rawCategories.filter(c => !mongoose.Types.ObjectId.isValid(c));

    const subObjectIds = rawSubCategories.filter(s => mongoose.Types.ObjectId.isValid(s));
    const subStrings = rawSubCategories.filter(s => !mongoose.Types.ObjectId.isValid(s));

    const catDocs = await BlogCategory.find({ _id: { $in: catObjectIds } }).select("category");
    const subDocs = await BlogSubcategory.find({ _id: { $in: subObjectIds } }).select("subcategory");

    const catNames = [...catDocs.map(c => c.category), ...catStrings];
    const subNames = [...subDocs.map(s => s.subcategory), ...subStrings];

    const combined = [...catNames, ...subNames]
      .filter(Boolean)
      .map((item) => item.trim())
      .filter((item) => item.length);

    let uniqueCombined = [...new Set(combined)];
    uniqueCombined.sort((a, b) => a.localeCompare(b));

    res.status(200).json({
      success: true,
      data: uniqueCombined,
    });
  } catch (error) {
    console.error("❌ Error getting categories:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/slugs", async (req, res) => {
  try {
    const blogs = await Blog.find().select("slug -_id").lean();
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/categorieswithsubcategories", async (req, res) => {
  try {
    const rawBlogs = await Blog.find({
      categories: { $exists: true, $ne: null },
      subCategories: { $exists: true, $ne: null },
    }).lean();

    const blogs = await populateMixed(rawBlogs, {
      categories: { type: "category", model: BlogCategory },
      subCategories: { type: "subcategory", model: BlogSubcategory }
    });

    const map = {};
    blogs.forEach(blog => {
      if (blog.categories && blog.subCategories) {
        const catName = blog.categories.category;
        const subName = blog.subCategories.subcategory;
        if (catName && subName) {
          if (!map[catName]) {
            map[catName] = new Set();
          }
          map[catName].add(subName);
        }
      }
    });

    const filteredResult = Object.keys(map).map(cat => ({
      category: cat,
      subCategories: Array.from(map[cat]).sort((a, b) => a.localeCompare(b))
    })).sort((a, b) => a.category.localeCompare(b.category));

    res.status(200).json({
      success: true,
      data: filteredResult,
    });
  } catch (error) {
    console.error("❌ Error getting categories with subcategories:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 30, category = "" } = req.query;
    const skip = (page - 1) * limit;

    let query = {};
    if (category) {
      if (mongoose.Types.ObjectId.isValid(category)) {
        const catObjId = new mongoose.Types.ObjectId(category);
        query.$or = [
          { categories: category },
          { categories: catObjId }
        ];
      } else {
        const catDoc = await BlogCategory.findOne({ category: category.trim() });
        if (catDoc) {
          query.$or = [
            { categories: category },
            { categories: catDoc._id },
            { categories: catDoc._id.toString() }
          ];
        } else {
          query.categories = category;
        }
      }
    }

    const [rawBlogs, count] = await Promise.all([
      Blog.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit))
        .lean(),
      Blog.countDocuments(query),
    ]);

    const blogs = await populateMixed(rawBlogs, {
      categories: { type: "category", model: BlogCategory },
      subCategories: { type: "subcategory", model: BlogSubcategory }
    });

    res.status(200).json({
      success: true,
      data: blogs,
      pagination: {
        current: Number(page),
        pages: Math.ceil(count / limit),
        total: count,
      },
    });
  } catch (error) {
    console.error("❌ Error getting blogs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid ID" });
    }
    const rawBlog = await Blog.findById(req.params.id).lean();
    if (!rawBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    const blog = await populateMixed(rawBlog, {
      categories: { type: "category", model: BlogCategory },
      subCategories: { type: "subcategory", model: BlogSubcategory }
    });
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

router.get("/slug/:slug", async (req, res) => {
  try {
    const rawBlog = await Blog.findOne({ slug: req.params.slug }).lean();
    if (!rawBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    const blog = await populateMixed(rawBlog, {
      categories: { type: "category", model: BlogCategory },
      subCategories: { type: "subcategory", model: BlogSubcategory }
    });
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

/**
 * @swagger
 * /api/blogs/{id}:
 *   put:
 *     summary: Update blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Blog'
 *     responses:
 *       200:
 *         description: Blog updated successfully
 *       404:
 *         description: Blog not found
 */

router.put(
  "/:id",
  protect,
  cleanupOldImages(Blog, "Blog"),
  async (req, res) => {
    try {
      // ✅ Updated destructuring to include SEO fields
      const {
        categories,
        subCategories,
        slug,
        image,
        details,
        seo_title,
        meta_description,
        seo_keyphrase,
        cover_image,
      } = req.body;

      const existingBlog = await Blog.findOne({
        slug,
        _id: { $ne: req.params.id },
      });
      if (existingBlog) {
        return res.status(400).json({
          success: false,
          message: "Slug already exists",
        });
      }

      // ✅ Created an update object with all fields
      const updateData = {
        categories,
        subCategories,
        slug,
        image: image || "",
        details,
        seo_title,
        meta_description,
        seo_keyphrase,
        cover_image,
      };

      const updatedBlog = await Blog.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true },
      );

      if (!updatedBlog) {
        return res
          .status(404)
          .json({ success: false, message: "Blog not found" });
      }

      res.json({ success: true, data: updatedBlog });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: error.message,
      });
    }
  },
);

/**
 * @swagger
 * /api/blogs/bulk-delete:
 *   post:
 *     summary: Bulk delete blogs (POST)
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Blogs deleted successfully
 *       400:
 *         description: Missing or invalid IDs
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Bulk delete blogs (DELETE)
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Blogs deleted successfully
 *       400:
 *         description: Missing or invalid IDs
 *       500:
 *         description: Server error
 */
const bulkDeleteBlogs = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of IDs to delete",
      });
    }

    const invalidIds = ids.filter(
      (id) => !mongoose.Types.ObjectId.isValid(id)
    );
    if (invalidIds.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Invalid IDs: ${invalidIds.join(", ")}`,
      });
    }

    const result = await Blog.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} blog(s) deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

router.post("/bulk-delete", protect, cleanupImages.cleanupBulkImages(Blog), bulkDeleteBlogs);

/**
 * @swagger
 * /api/blogs/{id}:
 *   delete:
 *     summary: Delete blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 *       404:
 *         description: Blog not found
 */
router.delete("/:id", protect, cleanupImages(Blog), async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    res.json({ success: true, message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
});

module.exports = router;
