require("dotenv").config();
const mongoose = require("mongoose");

// Legacy Models
const CategoryModel = require("../models/category/category.model");
const SubcategoryModel = require("../models/subcategory/subcategory.model");

// New Split Models
const ServiceCategory = require("../models/category/serviceCategory.model");
const BlogCategory = require("../models/category/blogCategory.model");
const PortfolioCategory = require("../models/category/portfolioCategory.model");
const FaqCategory = require("../models/category/faqCategory.model");
const HireCategory = require("../models/category/hireCategory.model");
const BlogSubcategory = require("../models/subcategory/blogSubcategory.model");

const url = process.env.MONGO_URI || "mongodb+srv://ITS:Dishant%4012345@cluster0.vyareyd.mongodb.net/ITS?retryWrites=true&w=majority";

async function runMigration() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to MongoDB successfully!");

  console.log("\n==========================================");
  console.log("STARTING DB MIGRATION: LEGACY TO SPLIT CATEGORIES");
  console.log("==========================================\n");

  // 1. Fetch legacy categories
  console.log("Fetching legacy categories...");
  const legacyCategories = await CategoryModel.find({}).lean();
  console.log(`Found ${legacyCategories.length} legacy categories in CategoryModel.\n`);

  let serviceCount = 0;
  let blogCount = 0;
  let portfolioCount = 0;
  let faqCount = 0;
  let hireCount = 0;

  for (const cat of legacyCategories) {
    const filter = { _id: cat._id };
    const update = { category: cat.category, image: cat.image || "" };
    const options = { upsert: true, new: true };

    switch (cat.moduleType) {
      case "services":
        await ServiceCategory.updateOne(filter, { $set: update }, options);
        serviceCount++;
        break;
      case "blogs":
        await BlogCategory.updateOne(filter, { $set: update }, options);
        blogCount++;
        break;
      case "portfolio":
        await PortfolioCategory.updateOne(filter, { $set: update }, options);
        portfolioCount++;
        break;
      case "faqs":
        await FaqCategory.updateOne(filter, { $set: update }, options);
        faqCount++;
        break;
      case "hire":
        await HireCategory.updateOne(filter, { $set: update }, options);
        hireCount++;
        break;
      default:
        console.warn(`[Warning] Unknown moduleType "${cat.moduleType}" for category "${cat.category}" (ID: ${cat._id})`);
    }
  }

  console.log("--- Categories Migration Stats ---");
  console.log(`- Services Categories: ${serviceCount}`);
  console.log(`- Blogs Categories:    ${blogCount}`);
  console.log(`- Portfolio Categories: ${portfolioCount}`);
  console.log(`- FAQs Categories:      ${faqCount}`);
  console.log(`- Hire Categories:      ${hireCount}`);
  console.log("----------------------------------\n");

  // 2. Fetch and migrate blog subcategories
  console.log("Fetching legacy subcategories for 'blogs'...");
  const legacySubcategories = await SubcategoryModel.find({ moduleType: "blogs" }).lean();
  console.log(`Found ${legacySubcategories.length} legacy subcategories for blogs.\n`);

  let subcategoryCount = 0;
  for (const sub of legacySubcategories) {
    const filter = { _id: sub._id };
    const update = { category: sub.category, subcategory: sub.subcategory };
    const options = { upsert: true };

    await BlogSubcategory.updateOne(filter, { $set: update }, options);
    subcategoryCount++;
  }

  console.log("--- Subcategories Migration Stats ---");
  console.log(`- Blog Subcategories:  ${subcategoryCount}`);
  console.log("-------------------------------------\n");

  console.log("==========================================");
  console.log("MIGRATION COMPLETE!");
  console.log("==========================================");

  await mongoose.disconnect();
  process.exit(0);
}

runMigration().catch(err => {
  console.error("Migration failed:", err);
  process.exit(1);
});
