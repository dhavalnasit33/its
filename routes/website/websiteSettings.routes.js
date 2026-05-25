const express = require("express");
const WebsiteSettings = require("../../models/website/WebsiteSettings");
const { validateWebsiteSettings, handleValidationErrors } = require('../../middlewares/validation');
const { protect } = require('../../middlewares/auth');

const router = express.Router();

// Helper function to get or create the single settings document
async function getOrCreateSettings() {
  let settings = await WebsiteSettings.findOne();
  if (!settings) {
    settings = await WebsiteSettings.create({
      favicon: "",
      logo_img: "",
      address: [],
      emails: [],
      phone: [],
      social_media: []
    });
  }
  return settings;
}

// @desc    Get complete website settings
// @route   GET /api/website-settings
// @access  Public
router.get("/", async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.json({ success: true, data: settings });
  } catch (error) {
    console.error("Get website settings error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @desc    Update complete website settings
// @route   PUT /api/website-settings
// @access  Private (Admin only)
router.put("/", protect, validateWebsiteSettings, handleValidationErrors, async (req, res) => {
   console.log("REQ BODY =>", req.body);
  try {
    const { favicon, logo_img, address, emails, phone, social_media } = req.body;
    let settings = await WebsiteSettings.findOne();

    if (!settings) {
      settings = new WebsiteSettings({ favicon, logo_img, address, emails, phone, social_media });
    } else {
      if (favicon !== undefined) settings.favicon = favicon;
      if (logo_img !== undefined) settings.logo_img = logo_img;
      if (address !== undefined) settings.address = address;
      if (emails !== undefined) settings.emails = emails;
      if (phone !== undefined) settings.phone = phone;
      if (social_media !== undefined) settings.social_media = social_media;
    }

    const saved = await settings.save();
    res.json({ success: true, data: saved });
  } catch (error) {
    console.error("Update website settings error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @desc    Get only favicon
// @route   GET /api/website-settings/favicon
// @access  Public
router.get("/favicon", async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.json({ success: true, favicon: settings.favicon });
  } catch (error) {
    console.error("Get favicon error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/logo_img", async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.json({ success: true, logo_img: settings.logo_img });
  } catch (error) {
    console.error("Get logo img error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});


// @desc    Get only addresses
// @route   GET /api/website-settings/address
// @access  Public
router.get("/address", async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.json({ success: true, address: settings.address });
  } catch (error) {
    console.error("Get address error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @desc    Get only emails (supports filtering by ?type=hr/sales/contact)
// @route   GET /api/website-settings/emails
// @access  Public
router.get("/emails", async (req, res) => {
  try {
    const { type } = req.query;
    const settings = await getOrCreateSettings();
    let emails = settings.emails;

    if (type) {
      emails = emails.filter(e => e.emailType === type.toLowerCase());
    }

    res.json({ success: true, emails });
  } catch (error) {
    console.error("Get emails error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @desc    Get only phone numbers
// @route   GET /api/website-settings/phone
// @access  Public
router.get("/phone", async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.json({ success: true, phone: settings.phone });
  } catch (error) {
    console.error("Get phone error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @desc    Get only social media links
// @route   GET /api/website-settings/social-media
// @access  Public
router.get("/social-media", async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.json({ success: true, social_media: settings.social_media });
  } catch (error) {
    console.error("Get social media error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @desc    Delete website settings by ID
// @route   DELETE /api/website-settings/:id
// @access  Private (Admin only)
router.delete("/:id", protect, async (req, res) => {
  try {
    const deleted = await WebsiteSettings.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Settings not found" });
    }
    res.json({ success: true, message: "Website settings deleted successfully" });
  } catch (error) {
    console.error("Delete settings error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// @desc    Bulk delete website settings
// @route   POST /api/website-settings/bulk-delete
// @access  Private (Admin only)
router.post("/bulk-delete", protect, async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || !ids.length) {
      return res.status(400).json({ success: false, message: "IDs array is required" });
    }

    const result = await WebsiteSettings.deleteMany({ _id: { $in: ids } });
    res.json({ success: true, deletedCount: result.deletedCount });
  } catch (error) {
    console.error("Bulk delete settings error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
