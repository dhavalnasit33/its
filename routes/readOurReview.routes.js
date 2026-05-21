const express = require("express");
const ReadOurReview = require("../models/readOurReview");
const { protect } = require("../middlewares/auth");
const cleanupImages = require("../middlewares/cleanupImages");
const cleanupOldImages = require("../middlewares/cleanupOldImages");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: ReadOurReview
 *   description: API for managing Read Our Review section
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ReadOurReview:
 *       type: object
 *       required:
 *         - name
 *         - image
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         name:
 *           type: string
 *           example: "Google Reviews"
 *         image:
 *           type: string
 *           example: https://example.com/image.jpg
 */

/**
 * @swagger
 * /api/read-our-review:
 *   post:
 *     summary: Create a new review link
 *     tags: [ReadOurReview]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ReadOurReview'
 *     responses:
 *       201:
 *         description: Created successfully
 */
router.post("/", protect, async (req, res) => {
  try {
    const { name, image } = req.body;

    if (!name || !image) {
      return res.status(400).json({
        success: false,
        message: "Name and image are required",
      });
    }

    const review = new ReadOurReview({ name, image });
    const result = await review.save();

    res.status(201).json({
      success: true,
      message: "Review link saved successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error storing review link", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

/**
 * @swagger
 * /api/read-our-review/admin:
 *   get:
 *     summary: Get paginated review links for admin
 *     tags: [ReadOurReview]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paginated list
 */
router.get("/admin", protect, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    let query = {};
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const total = await ReadOurReview.countDocuments(query);
    const data = await ReadOurReview.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      message: "Data Fetched Successfully",
      data,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    console.error("Error fetching admin review links", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

/**
 * @swagger
 * /api/read-our-review:
 *   get:
 *     summary: Get all review links
 *     tags: [ReadOurReview]
 */
router.get("/", async (req, res) => {
  try {
    const reviews = await ReadOurReview.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      data: reviews,
    });
  } catch (error) {
    console.error("Error fetching reviews", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

/**
 * @swagger
 * /api/read-our-review/{id}:
 *   get:
 *     summary: Get a single review link by ID
 *     tags: [ReadOurReview]
 */
router.get("/:id", async (req, res) => {
  try {
    const data = await ReadOurReview.findById(req.params.id);
    if (!data) {
      return res.status(404).json({ success: false, message: "Data not found" });
    }
    res.status(200).json({
      success: true,
      message: "Data Fetched Successfully",
      data,
    });
  } catch (error) {
    console.error("Error fetching single review", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

/**
 * @swagger
 * /api/read-our-review/{id}:
 *   put:
 *     summary: Update a review link by ID
 *     tags: [ReadOurReview]
 *     security:
 *       - bearerAuth: []
 */
router.put("/:id", protect, cleanupOldImages(ReadOurReview, "ReadOurReview"), async (req, res) => {
  try {
    const { name, image } = req.body;
    const review = await ReadOurReview.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ success: false, message: "Data not found" });
    }

    review.name = name;
    review.image = image;
    await review.save();

    res.status(200).json({
      success: true,
      message: "Data updated successfully",
      data: review,
    });
  } catch (error) {
    console.error("Error updating review link", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

/**
 * @swagger
 * /api/read-our-review/{id}:
 *   delete:
 *     summary: Delete a review link by ID
 *     tags: [ReadOurReview]
 *     security:
 *       - bearerAuth: []
 */
router.delete("/:id", protect, cleanupImages(ReadOurReview), async (req, res) => {
  try {
    const review = await ReadOurReview.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: "Data not found" });
    }

    await ReadOurReview.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Data deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting review link", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

/**
 * @swagger
 * /api/read-our-review/bulk-delete:
 *   post:
 *     summary: Bulk delete review links
 *     tags: [ReadOurReview]
 *     security:
 *       - bearerAuth: []
 */
router.post("/bulk-delete", protect, cleanupImages.cleanupBulkImages(ReadOurReview), async (req, res) => {
  try {
    const { ids } = req.body;
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of IDs to delete",
      });
    }

    const result = await ReadOurReview.deleteMany({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: `${result.deletedCount} items deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Error bulk deleting review links", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
