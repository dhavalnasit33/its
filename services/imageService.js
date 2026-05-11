const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function extractPublicId(url) {
  if (!url) return null;
  try {
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z]+$/);
    return match ? match[1] : null;
  } catch (err) {
    console.error("⚠️ Failed to extract publicId:", err.message);
    return null;
  }
}

async function deleteImage(imageUrl) {
  if (!imageUrl) return;

  const publicId = extractPublicId(imageUrl);
  if (!publicId) return;

  try {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === "ok") {
      console.log(`✅ Successfully deleted: ${publicId}`);
    } else if (result.result === "not found") {
      console.warn(`⚠️ Image not found on Cloudinary: ${publicId}`);
    } else {
      console.error(`❌ Failed to delete: ${publicId}`, result);
    }
  } catch (err) {
    console.error(`❌ Error deleting image: ${publicId}`, err.message);
  }
}

async function deleteImages(imageUrls = []) {
  for (const url of imageUrls) {
    await deleteImage(url);
  }
}

module.exports = { deleteImage, deleteImages, extractPublicId };
