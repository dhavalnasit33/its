const express = require("express");
const { protect } = require("../middlewares/auth");
const { deleteImage } = require("../services/imageService");
const router = express.Router();

router.delete("/", protect, async (req, res) => {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({
        success: false,
        message: "imageUrl is required",
      });
    }

    await deleteImage(imageUrl);

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting image",
    });
  }
});

module.exports = router;
