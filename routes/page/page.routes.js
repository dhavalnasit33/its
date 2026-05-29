const express = require("express");
const mongoose = require("mongoose");
const Page = require("../../models/page/page.model");
const { protect } = require("../../middlewares/auth");
const { syncSeoData, forceDeleteSeoData } = require("../../utils/seoSync");

const router = express.Router();

const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

router.get("/", protect, async (req, res) => {
  try {
    // const page = parseInt(req.query.page) || 1;
    // const limit = parseInt(req.query.limit) || 10;
    // const search = req.query.search || "";
    // const skip = (page - 1) * limit;
    const { page = 1, limit = 10, value = "" } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    const filter = value
      ? {
          $or: [
            { page_title: { $regex: value, $options: "i" } },
            { slug: { $regex: value, $options: "i" } },
            { "seo.title": { $regex: value, $options: "i" } },
          ],
        }
      : {};

    const [pages, total] = await Promise.all([
      Page.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Page.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: pages,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    console.error("GET /page error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.delete("/bulk/delete", protect, async (req, res) => {
  try {
    const { ids } = req.body;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please provide an array of IDs to delete",
      });
    }

    const invalidIds = ids.filter((id) => !mongoose.Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Invalid IDs: ${invalidIds.join(", ")}`,
      });
    }

    const result = await Page.deleteMany({ _id: { $in: ids } });

    return res.status(200).json({
      success: true,
      message: `${result.deletedCount} page(s) deleted successfully`,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("DELETE /page/bulk/delete error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid page ID" });
    }

    const page = await Page.findById(id);
    if (!page) {
      return res
        .status(404)
        .json({ success: false, message: "Page not found" });
    }

    return res.status(200).json({
      success: true,
      data: {
        _id: page._id,
        title: page.page_title,
        description: page.page_description,
        slug: page.slug,
        image: page.image,
        seo: page.seo,
        createdAt: page.createdAt,
        updatedAt: page.updatedAt,
      },
    });
  } catch (error) {
    console.error("GET /page/:id error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/", protect, async (req, res) => {
  try {
    const { title, description, slug, image, seo } = req.body;

    if (!title || !title.trim()) {
      return res
        .status(400)
        .json({ success: false, message: "Page title is required" });
    }

    const rawSlug = slug ? slug.trim() : slugify(title);
    if (!rawSlug) {
      return res
        .status(400)
        .json({ success: false, message: "Slug is required" });
    }

    // const staticSlugs = ["homepage", "home", "about-us", "career", "our-services", "our-portfolio", "training", "hire"];
    // if (staticSlugs.includes(rawSlug.toLowerCase())) {
    //   return res.status(400).json({
    //     success: false,
    //     message: `Slug "${rawSlug}" is reserved for static pages and cannot be used here.`
    //   });
    // }

    const existing = await Page.findOne({ slug: rawSlug });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: `Slug "${rawSlug}" already exists. Please use a different slug.`,
      });
    }

    const newPage = await Page.create({
      page_title: title.trim(),
      page_description: description?.trim() || "",
      slug: rawSlug,
      image: image || "",
      seo: {
        title: seo?.title || "",
        keyphrase: seo?.keyphrase || "",
        seoDescription: seo?.seoDescription || "",
        featureImage: seo?.featureImage || "",
      },
    });

    try {
      await syncSeoData(newPage.page_title, newPage.slug, newPage.page_title, "independent", newPage._id, newPage.seo);
    } catch (seoError) {
      console.warn("SEO sync warning during page create:", seoError.message);
    }

    return res.status(201).json({
      success: true,
      message: "Page created successfully",
      data: newPage,
    });
  } catch (error) {
    console.error("POST /page error:", error);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A page with this slug already exists",
      });
    }
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

router.put("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, slug, image, seo } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid page ID" });
    }

    const page = await Page.findById(id);
    if (!page) {
      return res
        .status(404)
        .json({ success: false, message: "Page not found" });
    }

    if (slug && slug.trim() !== page.slug) {
      const cleanSlug = slug.trim();
      // const staticSlugs = ["homepage", "home", "about-us", "career", "our-services", "our-portfolio", "training", "hire"];
      // if (staticSlugs.includes(cleanSlug.toLowerCase())) {
      //   return res.status(400).json({
      //     success: false,
      //     message: `Slug "${cleanSlug}" is reserved for static pages and cannot be used here.`
      //   });
      // }

      const existing = await Page.findOne({
        slug: cleanSlug,
        _id: { $ne: id },
      });
      if (existing) {
        return res.status(409).json({
          success: false,
          message: `Slug "${cleanSlug}" already exists`,
        });
      }
    }

    const updatedPage = await Page.findByIdAndUpdate(
      id,
      {
        $set: {
          page_title: title?.trim() || page.page_title,
          page_description: description?.trim() ?? page.page_description,
          slug: slug?.trim() || page.slug,
          image: image ?? page.image,
          "seo.title": seo?.title ?? page.seo?.title,
          "seo.keyphrase": seo?.keyphrase ?? page.seo?.keyphrase,
          "seo.seoDescription": seo?.seoDescription ?? page.seo?.seoDescription,
          "seo.featureImage": seo?.featureImage ?? page.seo?.featureImage,
        },
      },
      { new: true, runValidators: true },
    );

    try {
      await syncSeoData(updatedPage.page_title, updatedPage.slug, updatedPage.page_title, "independent", updatedPage._id, updatedPage.seo);
    } catch (seoError) {
      console.warn("SEO sync warning during page update:", seoError.message);
    }

    return res.status(200).json({
      success: true,
      message: "Page updated successfully",
      data: updatedPage,
    });
  } catch (error) {
    console.error("PUT /page/:id error:", error);
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "A page with this slug already exists",
      });
    }
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// DELETE /api/page/:id  →  Delete single page
// ─────────────────────────────────────────────────────────────────────────────
router.delete("/:id", protect, async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid page ID" });
    }

    const page = await Page.findByIdAndDelete(id);
    if (!page) {
      return res
        .status(404)
        .json({ success: false, message: "Page not found" });
    }

    try {
      await forceDeleteSeoData(page.slug);
    } catch (seoError) {
      console.warn("SEO delete warning during page delete:", seoError.message);
    }

    return res.status(200).json({
      success: true,
      message: "Page deleted successfully",
      data: page,
    });
  } catch (error) {
    console.error("DELETE /page/:id error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
