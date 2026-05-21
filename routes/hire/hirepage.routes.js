const express = require("express");
const mongoose = require("mongoose");
const HirePageData = require("../../models/hire/hirePageData");
const CategoryModel = require("../../models/category/category.model");
const SubcategoryModel = require("../../models/subcategory/subcategory.model");
const { populateMixed } = require("../../utils/mixedPopulate");
const { protect } = require("../../middlewares/auth"); 
const { syncSeoData, deleteSeoData, forceDeleteSeoData } = require("../../utils/seoSync");
const cleanupImages = require("../../middlewares/cleanupImages");
const cleanupOldImages = require("../../middlewares/cleanupOldImages");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: HirePageData
 *   description: API for hire page data
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     FAQ:
 *       type: object
 *       required:
 *         - question
 *         - answer
 *       properties:
 *         question:
 *           type: string
 *           example: What is your refund policy?
 *         answer:
 *           type: string
 *           example: We provide refunds within 30 days of purchase.
 *
 *     HirePageData:
 *       type: object
 *       required:
 *         - category
 *         - subCategory
 *         - title
 *         - slug
 *         - description
 *         - keyPoints
 *         - successSpeacks
 *         - hireDadiated
 *         - hireDevelopersAsYourNeeds
 *         - ourExpertise
 *         - techStack
 *         - whyHireUs
 *         - unloackPower
 *         - hireingProcess
 *         - faq
 *       properties:
 *         id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         category:
 *           type: string
 *           example: Development
 *         subCategory:
 *           type: string
 *           example: Hire React Developer
 *         title:
 *           type: string
 *           example: Hire Expert React Developers
 *         slug:
 *           type: string
 *           example: hire-react-developer
 *         description:
 *           type: string
 *           example: We provide the best React developers...
 *         keyPoints:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Experienced Developers", "Agile Process"]
 *         successSpeacks:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             image:
 *               type: string
 *         hireDadiated:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             image:
 *               type: string
 *         hireDevelopersAsYourNeeds:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             planDetails:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   timelLine:
 *                     type: string
 *                   price:
 *                     type: string
 *                   keyPoints:
 *                     type: array
 *                     items:
 *                       type: string
 *             benefits:
 *               type: array
 *               items:
 *                 type: string
 *         ourExpertise:
 *           type: object
 *           properties:
 *             keyPoints:
 *               type: array
 *               items:
 *                 type: string
 *         techStack:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             details:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *         whyHireUs:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             details:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *         unloackPower:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             image:
 *               type: string
 *         hireingProcess:
 *           type: object
 *           properties:
 *             steps:
 *               type: array
 *               items:
 *                 type: string
 *         faq:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FAQ'
 */

/**
 * @swagger
 * /api/hire-page:
 *   post:
 *     summary: Create Hire Page Data
 *     tags: [HirePageData]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HirePageData'
 *     responses:
 *       201:
 *         description: Hire Page Data created successfully
 *       400:
 *         description: Missing or invalid fields
 *       500:
 *         description: Server error
 */
router.post("/", protect, async (req, res) => {
    try {
        const { category, subCategory, title, slug, description, keyPoints, successSpeacks, hireDadiated, hireDevelopersAsYourNeeds, ourExpertise, techStack, whyHireUs, unloackPower, hireingProcess, faq, } = req.body;

        if (!category || !subCategory || !title || !slug || !description || !keyPoints?.length || !successSpeacks || !hireDadiated || !ourExpertise || !techStack || !whyHireUs || !unloackPower || !hireingProcess || !faq?.length || !hireDevelopersAsYourNeeds
        ) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        const slugExists = await HirePageData.findOne({ slug });
        if (slugExists)
            return res
                .status(400)
                .json({ success: false, message: "Slug already exists" });

        const categoryExists = await HirePageData.findOne({
            category,
            subCategory,
        });
        if (categoryExists)
            return res.status(400).json({
                success: false,
                message:
                    "Hire Page Data already exists for this category and subCategory",
            });

        const hirePageData = new HirePageData({
            category,
            subCategory,
            title,
            slug,
            description,
            keyPoints,
            successSpeacks,
            hireDadiated,
            hireDevelopersAsYourNeeds,
            ourExpertise,
            techStack,
            whyHireUs,
            unloackPower,
            hireingProcess,
            faq,
        });

        const saved = await hirePageData.save();

        // adding seo data 
        try {
            await syncSeoData(subCategory, slug, title, 'hire', saved._id);
        } catch (seoError) {
            console.warn('SEO sync warning:', seoError.message);
        }

        res
            .status(201)
            .json({
                success: true,
                message: "Hire Page Data created successfully",
                data: saved,
            });
    } catch (error) {
        console.error("Error creating Hire Page Data:", error);
        res
            .status(500)
            .json({ success: false, message: "Server error", error: error.message });
    }
});

/**
 * @swagger
 * /api/hire-page:
 *   get:
 *     summary: Get all Hire Page Data with pagination & filters
 *     tags: [HirePageData]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: subCategory
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Paginated Hire Page Data retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/", async (req, res) => {
    try {
        const { page = 1, limit = 10, category, subCategory } = req.query;
        const query = {};
        if (category) {
            if (mongoose.Types.ObjectId.isValid(category)) {
                query.category = category;
            } else {
                const catDoc = await CategoryModel.findOne({ category: category.trim(), moduleType: "hire" });
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
        if (subCategory) {
            if (mongoose.Types.ObjectId.isValid(subCategory)) {
                query.subCategory = subCategory;
            } else {
                const subDoc = await SubcategoryModel.findOne({ subcategory: subCategory.trim(), moduleType: "hire" });
                if (subDoc) {
                    query.$or = [
                        { subCategory: subCategory },
                        { subCategory: subDoc._id }
                    ];
                } else {
                    query.subCategory = subCategory;
                }
            }
        }

        const skip = (page - 1) * limit;
        const [rawData, total] = await Promise.all([
            HirePageData.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit))
                .lean(),
            HirePageData.countDocuments(query),
        ]);

        const data = await populateMixed(rawData, { category: "category", subCategory: "subcategory" });

        res.status(200).json({
            success: true,
            data,
            pagination: {
                current: Number(page),
                pages: Math.ceil(total / limit),
                total,
            },
        });
    } catch (error) {
        console.error("Error getting Hire Page Data:", error);
        res
            .status(500)
            .json({ success: false, message: "Server error", error: error.message });
    }
});

/**
 * @swagger
 * /api/hire-page/subcategory/{subCategory}:
 *   get:
 *     summary: Get Hire Page Data by SubCategory
 *     tags: [HirePageData]
 *     parameters:
 *       - in: path
 *         name: subCategory
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Hire Page Data retrieved successfully
 *       404:
 *         description: No Hire Page Data found for this subCategory
 *       500:
 *         description: Server error
 */
router.get("/subcategory/:subCategory", async (req, res) => {
    try {
        const { subCategory } = req.params;
        let subCategoryFilter = {};
        if (mongoose.Types.ObjectId.isValid(subCategory)) {
            subCategoryFilter.subCategory = subCategory;
        } else {
            const subDoc = await SubcategoryModel.findOne({ subcategory: subCategory.trim(), moduleType: "hire" });
            if (subDoc) {
                subCategoryFilter.$or = [
                    { subCategory: subCategory },
                    { subCategory: subDoc._id }
                ];
            } else {
                subCategoryFilter.subCategory = subCategory;
            }
        }

        const rawData = await HirePageData.find(subCategoryFilter).lean();
        if (!rawData?.length)
            return res
                .status(404)
                .json({
                    success: false,
                    message: "No Hire Page Data found for this subCategory",
                });

        const data = await populateMixed(rawData, { category: "category", subCategory: "subcategory" });
        res.status(200).json({ success: true, data });
    } catch (error) {
        console.error("Error getting Hire Page Data by subCategory:", error);
        res
            .status(500)
            .json({ success: false, message: "Server error", error: error.message });
    }
});

/**
 * @swagger
 * /api/hire-page/slug/{slug}:
 *   get:
 *     summary: Get Hire Page Data by Slug
 *     tags: [HirePageData]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: Unique slug of the Hire Page Data
 *     responses:
 *       200:
 *         description: Hire Page Data retrieved successfully
 *       404:
 *         description: No Hire Page Data found for this slug
 *       500:
 *         description: Server error
 */
router.get("/slug/:slug", async (req, res) => {
    try {
        const { slug } = req.params;
        const rawHirePageData = await HirePageData.findOne({ slug }).lean();
        if (!rawHirePageData) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "No Hire Page Data found for this slug",
                });
        }
        const hirePageData = await populateMixed(rawHirePageData, { category: "category", subCategory: "subcategory" });
        res.status(200).json({ success: true, data: hirePageData });
    } catch (error) {
        console.error("Error to get Hire Page Data by slug: ", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

router.get('/admin-id', protect, async (req, res) => {
    try {
        const rawHirePage = await HirePageData.find()
            .select('_id category subCategory title')
            .lean();
        const hirePage = await populateMixed(rawHirePage, { category: "category", subCategory: "subcategory" });
        res.status(200).json({
            success: true,
            message: "Hirepage Get Sucessfully",
            data: hirePage
        })
    } catch (error) {
        console.error("Error fetching HirePage :", error);
        res.status(500).json({
            success: false,
            message: "Error fetching HirePage",
        });
    }
})

/**
 * @swagger
 * /api/hire-page/categories-with-subcategories:
 *   get:
 *     summary: Get all unique categories with their respective subcategories
 *     tags: [HirePageData]
 *     responses:
 *       200:
 *         description: A structured list of categories and subcategories.
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
 *                     type: object
 *                     properties:
 *                       category:
 *                         type: string
 *                       subCategories:
 *                         type: array
 *                         items:
 *                           type: string
 *       500:
 *         description: Server error
 */
router.get("/categorieswithsubcategories", async (req, res) => {
    try {
        const rawHirePages = await HirePageData.find({
            category: { $exists: true, $ne: null },
            subCategory: { $exists: true, $ne: null },
        }).lean();

        const hirePages = await populateMixed(rawHirePages, { category: "category", subCategory: "subcategory" });

        const map = {};
        hirePages.forEach(page => {
            if (page.category && page.subCategory) {
                const catName = page.category.category;
                const subName = page.subCategory.subcategory;
                if (catName && subName) {
                    if (!map[catName]) {
                        map[catName] = new Set();
                    }
                    map[catName].add(subName);
                }
            }
        });

        const structuredCategories = Object.keys(map).map(cat => ({
            category: cat,
            subCategories: Array.from(map[cat]).sort((a, b) => a.localeCompare(b))
        })).sort((a, b) => a.category.localeCompare(b.category));

        res.status(200).json({ success: true, data: structuredCategories });
    } catch (error) {
        console.error("Error fetching structured categories:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});

/**
 * @swagger
 * /api/hire-page/{id}:
 *   put:
 *     summary: Update Hire Page Data by ID
 *     tags: [HirePageData]
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
 *             $ref: '#/components/schemas/HirePageData'
 *     responses:
 *       200:
 *         description: Hire Page Data updated successfully
 *       400:
 *         description: Missing or invalid fields
 *       404:
 *         description: Hire Page Data not found
 *       500:
 *         description: Server error
 */
router.put("/:id", protect, cleanupOldImages(HirePageData, "HirePageData"), async (req, res) => {
    try {
        const { id } = req.params;
        const {
            category,
            subCategory,
            title,
            slug,
            description,
            keyPoints,
            successSpeacks,
            hireDadiated,
            hireDevelopersAsYourNeeds,
            ourExpertise,
            techStack,
            whyHireUs,
            unloackPower,
            hireingProcess,
            faq,
        } = req.body;

        if (
            !category ||
            !subCategory ||
            !title ||
            !slug ||
            !description ||
            !keyPoints?.length ||
            !successSpeacks ||
            !hireDadiated ||
            !ourExpertise ||
            !techStack ||
            !whyHireUs ||
            !unloackPower ||
            !hireingProcess ||
            !faq?.length ||
            !hireDevelopersAsYourNeeds
        ) {
            return res
                .status(400)
                .json({ success: false, message: "All fields are required" });
        }

        const slugExists = await HirePageData.findOne({ slug, _id: { $ne: id } });
        if (slugExists)
            return res
                .status(400)
                .json({ success: false, message: "Slug already exists" });

        const data = await HirePageData.findById(id);
        if (!data)
            return res
                .status(404)
                .json({ success: false, message: "Hire Page Data not found" });

        const updated = await HirePageData.findByIdAndUpdate(
            id,
            {
                category,
                subCategory,
                title,
                slug,
                description,
                keyPoints,
                successSpeacks,
                hireDadiated,
                hireDevelopersAsYourNeeds,
                ourExpertise,
                techStack,
                whyHireUs,
                unloackPower,
                hireingProcess,
                faq,
            },
            { new: true, runValidators: true }
        );

        if (data.slug !== updated.slug || data.subCategory !== updated.subCategory) {
            try {
                await syncSeoData(updated.subCategory, updated.slug, updated.title, 'hire', updated._id);
            } catch (seoError) {
                console.warn('SEO sync warning during update:', seoError.message);
            }
        }


        res.status(200)
            .json({
                success: true,
                message: "Hire Page Data updated successfully",
                data: updated,
            });
    } catch (error) {
        console.error("Error updating Hire Page Data:", error);
        res
            .status(500)
            .json({ success: false, message: "Server error", error: error.message });
    }
});

/**
 * @swagger
 * /api/hire-page/{id}:
 *   delete:
 *     summary: Delete Hire Page Data by ID
 *     tags: [HirePageData]
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
 *         description: Hire Page Data deleted successfully
 *       404:
 *         description: Hire Page Data not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", protect, cleanupImages(HirePageData), async (req, res) => {
    try {
        const { id } = req.params;
        const data = await HirePageData.findById(id);
        if (!data)
            return res
                .status(404)
                .json({ success: false, message: "Hire Page Data not found" });

        try {
            await forceDeleteSeoData(data.slug);
        } catch (seoError) {
            console.warn('SEO delete warning:', seoError.message);
        }
        await HirePageData.findByIdAndDelete(id);
        res
            .status(200)
            .json({ success: true, message: "Hire Page Data deleted successfully" });
    } catch (error) {
        console.error("Error deleting Hire Page Data:", error);
        res
            .status(500)
            .json({ success: false, message: "Server error", error: error.message });
    }
});

module.exports = router;
