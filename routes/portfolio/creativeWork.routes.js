const express = require('express');
const mongoose = require('mongoose');
const CreativeWork = require('../../models/portfolio/creativeWork');
const CategoryModel = require('../../models/category/category.model');
const { populateMixed } = require('../../utils/mixedPopulate');
const { protect } = require('../../middlewares/auth');
const cleanupImages = require('../../middlewares/cleanupImages');
const cleanupOldImages = require('../../middlewares/cleanupOldImages');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: CreativeWork
 *   description: API for managing portfolio creative works
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreativeWork:
 *       type: object
 *       required:
 *         - category
 *         - title
 *         - image
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         category:
 *           type: string
 *           example: Web Design
 *         title:
 *           type: string
 *           example: Corporate Website Project
 *         url:
 *           type: string
 *           example: https://example.com/project
 *         image:
 *           type: string
 *           example: https://example.com/image.jpg
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/creative-work:
 *   post:
 *     summary: Create a new creative work
 *     tags: [CreativeWork]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreativeWork'
 *     responses:
 *       201:
 *         description: Creative work created successfully
 *       400:
 *         description: All required fields are missing
 *       500:
 *         description: Server error
 */
router.post('/', protect, async (req, res) => {
    try {
        const { category, title, url, image } = req.body;
        if (!category || !title || !image) {
            return res.status(400).json({
                success: false,
                message: 'Category, title, and image are required',
            });
        }

        const creativeWork = new CreativeWork({
            category,
            title,
            url,
            image,
        });

        await creativeWork.save();

        res.status(201).json({
            success: true,
            message: 'Creative work saved successfully',
        });

    } catch (error) {
        console.error('❌ Error saving creative work:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
});

/**
 * @swagger
 * /api/creative-work:
 *   get:
 *     summary: Get all creative works (with pagination, category filter, and search)
 *     tags: [CreativeWork]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter creative works by category
 *       - in: query
 *         name: value
 *         schema:
 *           type: string
 *         description: Search creative works by title (case-insensitive)
 *     responses:
 *       200:
 *         description: List of creative works with pagination
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/CreativeWork'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     current:
 *                       type: integer
 *                       example: 1
 *                     pages:
 *                       type: integer
 *                       example: 5
 *                     total:
 *                       type: integer
 *                       example: 42
 *       500:
 *         description: Server error
 */

router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const category = req.query.category || '';
        const value = req.query.value || '';

        const skip = (page - 1) * limit;

        let query = {};
        if (category) {
            if (mongoose.Types.ObjectId.isValid(category)) {
                query.category = category;
            } else {
                const catDoc = await CategoryModel.findOne({ category: category.trim(), moduleType: "portfolio" });
                if (catDoc) {
                    query.$or = [
                        { category: category },
                        { category: catDoc._id }
                    ];
                } else {
                    query.category = category;
                }
            }
        }
        if (value) {
            query.title = { $regex: value, $options: 'i' };
        }

        const [rawCreativeWorks, total] = await Promise.all([
            CreativeWork.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            CreativeWork.countDocuments(query),
        ]);

        const creativeWorks = await populateMixed(rawCreativeWorks, { category: "category" });

        res.status(200).json({
            success: true,
            data: creativeWorks,
            pagination: {
                current: page,
                pages: Math.ceil(total / limit),
                total,
            },
        });

    } catch (error) {
        console.error('❌ Error fetching creative works:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
});

/**
 * @swagger
 * /api/creative-work/{id}:
 *   get:
 *     summary: Get a single creative work by ID
 *     tags: [CreativeWork]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Creative work fetched successfully
 *       404:
 *         description: Creative work not found
 *       500:
 *         description: Server error
 */
router.get("/:id", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ success: false, message: "Invalid ID" });
        }
        const rawData = await CreativeWork.findById(req.params.id).lean();
        if (!rawData) {
            return res.status(404).json({
                success: false,
                message: "Data not found",
            });
        }
        const data = await populateMixed(rawData, { category: "category" });
        res.status(200).json({
            success: true,
            message: "Data Fetched Successfully",
            data,
        });
    } catch (error) {
        console.error("Error fetching single creative work", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});



/**
 * @swagger
 * /api/creative-work/{id}:
 *   put:
 *     summary: Update a creative work by ID
 *     tags: [CreativeWork]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Creative work ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreativeWork'
 *     responses:
 *       200:
 *         description: Creative work updated successfully
 *       400:
 *         description: Required fields missing
 *       404:
 *         description: Creative work not found
 *       500:
 *         description: Server error
 */
router.put('/:id', protect, cleanupOldImages(CreativeWork, "CreativeWork"), async (req, res) => {
    try {
        const { category, title, url, image } = req.body;
        if (!category || !title || !image) {
            return res.status(400).json({
                success: false,
                message: 'Category, title, and image are required',
            });
        }

        const creativeWork = await CreativeWork.findById(req.params.id);
        if (!creativeWork) {
            return res.status(404).json({
                success: false,
                message: 'Creative work not found',
            });
        }

        const updatedCreativeWork = await CreativeWork.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Creative work updated successfully',
            data: updatedCreativeWork,
        });

    } catch (error) {
        console.error('❌ Error updating creative work:', error)
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
});


/**
 * @swagger
 * /api/creative-work/{id}:
 *   delete:
 *     summary: Delete a creative work by ID
 *     tags: [CreativeWork]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Creative work ID
 *     responses:
 *       200:
 *         description: Creative work deleted successfully
 *       404:
 *         description: Creative work not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', protect, cleanupImages(CreativeWork), async (req, res) => {
    try {
        const creativeWork = await CreativeWork.findById(req.params.id);
        if (!creativeWork) {
            return res.status(404).json({
                success: false,
                message: 'Creative work not found',
            });
        }

        await CreativeWork.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Creative work deleted successfully',
        });
    } catch (error) {
        console.error('❌ Error deleting creative work:', error);
        res.status(500).json({
            success: false,
            message: 'Server Error',
        });
    }
});

/**
 * @swagger
 * /api/creative-work/bulk-delete:
 *   post:
 *     summary: Bulk delete creative works
 *     tags: [CreativeWork]
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
 *         description: Creative works deleted successfully
 *       400:
 *         description: Missing IDs
 *       500:
 *         description: Server error
 */
router.post("/bulk-delete", protect, cleanupImages.cleanupBulkImages(CreativeWork), async (req, res) => {
    try {
        const { ids } = req.body;
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Please provide an array of IDs to delete",
            });
        }

        const result = await CreativeWork.deleteMany({ _id: { $in: ids } });

        res.status(200).json({
            success: true,
            message: `${result.deletedCount} items deleted successfully`,
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.error(" Error to bulk delete data", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
});

module.exports = router;
