require("dotenv").config();
const mongoose = require("mongoose");
const CategoryModel = require("../models/category/category.model");
const SubcategoryModel = require("../models/subcategory/subcategory.model");

// Import Content Models
const Service = require("../models/ourServices/ourServies");
const Blog = require("../models/blog/blog.model");
const CreativeWork = require("../models/portfolio/creativeWork");
const FaqModel = require("../models/faqs/faqs.model");
const HirePageData = require("../models/hire/hirePageData");

const url = process.env.MONGO_URI || 'mongodb+srv://ITS:Dishant%4012345@cluster0.vyareyd.mongodb.net/ITS?retryWrites=true&w=majority';

function isValidObjectId(val) {
  if (!val) return false;
  return mongoose.Types.ObjectId.isValid(val) && /^[0-9a-fA-F]{24}$/.test(val.toString());
}

async function getOrCreateCategory(categoryName, moduleType) {
  if (!categoryName) return null;
  const nameTrimmed = categoryName.trim();
  if (isValidObjectId(nameTrimmed)) {
    return nameTrimmed; // Already an ObjectId string/object
  }

  // Find or create Category
  let categoryDoc = await CategoryModel.findOne({
    category: nameTrimmed,
    moduleType
  });

  if (!categoryDoc) {
    categoryDoc = new CategoryModel({
      category: nameTrimmed,
      moduleType,
      image: "" // Optional field
    });
    await categoryDoc.save();
    console.log(`[Category Created] "${nameTrimmed}" for module "${moduleType}"`);
  }

  return categoryDoc._id;
}

async function getOrCreateSubcategory(categoryId, subcategoryName, moduleType) {
  if (!categoryId || !subcategoryName) return null;
  const nameTrimmed = subcategoryName.trim();
  if (isValidObjectId(nameTrimmed)) {
    return nameTrimmed; // Already an ObjectId string/object
  }

  // Find or create Subcategory
  let subcategoryDoc = await SubcategoryModel.findOne({
    category: categoryId,
    subcategory: nameTrimmed,
    moduleType
  });

  if (!subcategoryDoc) {
    subcategoryDoc = new SubcategoryModel({
      category: categoryId,
      subcategory: nameTrimmed,
      moduleType
    });
    await subcategoryDoc.save();
    console.log(`[Subcategory Created] "${nameTrimmed}" under parent Category ID ${categoryId} for module "${moduleType}"`);
  }

  return subcategoryDoc._id;
}

async function runMigration() {
  console.log("Connecting to MongoDB...");
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log("Connected to MongoDB successfully!");

  console.log("\n==========================================");
  console.log("STARTING MASTER CATEGORY & SUBCATEGORY MIGRATION");
  console.log("==========================================\n");

  // 1. Migrate Services
  console.log("--- Migrating Services ---");
  const services = await Service.find({});
  let serviceCount = 0;
  for (const doc of services) {
    let updated = false;

    // Check category
    if (doc.category && !isValidObjectId(doc.category)) {
      const catId = await getOrCreateCategory(doc.category, "services");
      if (catId) {
        doc.category = catId;
        updated = true;
      }
    }

    // Check subcategory
    if (doc.subCategory && !isValidObjectId(doc.subCategory)) {
      const subId = await getOrCreateSubcategory(doc.category, doc.subCategory, "services");
      if (subId) {
        doc.subCategory = subId;
        updated = true;
      }
    }

    if (updated) {
      await Service.updateOne(
        { _id: doc._id },
        { $set: { category: doc.category, subCategory: doc.subCategory } }
      );
      serviceCount++;
    }
  }
  console.log(`Successfully migrated ${serviceCount} Service documents.\n`);

  // 2. Migrate Blogs
  console.log("--- Migrating Blogs ---");
  const blogs = await Blog.find({});
  let blogCount = 0;
  for (const doc of blogs) {
    let updated = false;

    if (doc.categories && !isValidObjectId(doc.categories)) {
      const catId = await getOrCreateCategory(doc.categories, "blogs");
      if (catId) {
        doc.categories = catId;
        updated = true;
      }
    }

    if (doc.subCategories && !isValidObjectId(doc.subCategories)) {
      const subId = await getOrCreateSubcategory(doc.categories, doc.subCategories, "blogs");
      if (subId) {
        doc.subCategories = subId;
        updated = true;
      }
    }

    if (updated) {
      await Blog.updateOne(
        { _id: doc._id },
        { $set: { categories: doc.categories, subCategories: doc.subCategories } }
      );
      blogCount++;
    }
  }
  console.log(`Successfully migrated ${blogCount} Blog documents.\n`);

  // 3. Migrate Portfolios (CreativeWorks)
  console.log("--- Migrating Creative Works (Portfolios) ---");
  const creativeWorks = await CreativeWork.find({});
  let portfolioCount = 0;
  for (const doc of creativeWorks) {
    let updated = false;

    if (doc.category && !isValidObjectId(doc.category)) {
      const catId = await getOrCreateCategory(doc.category, "portfolio");
      if (catId) {
        doc.category = catId;
        updated = true;
      }
    }

    if (updated) {
      await CreativeWork.updateOne(
        { _id: doc._id },
        { $set: { category: doc.category } }
      );
      portfolioCount++;
    }
  }
  console.log(`Successfully migrated ${portfolioCount} Portfolio documents.\n`);

  // 4. Migrate FAQs
  console.log("--- Migrating FAQs ---");
  const faqs = await FaqModel.find({});
  let faqCount = 0;
  for (const doc of faqs) {
    let updated = false;

    if (doc.categories && !isValidObjectId(doc.categories)) {
      const catId = await getOrCreateCategory(doc.categories, "faqs");
      if (catId) {
        doc.categories = catId;
        updated = true;
      }
    }

    if (updated) {
      await FaqModel.updateOne(
        { _id: doc._id },
        { $set: { categories: doc.categories } }
      );
      faqCount++;
    }
  }
  console.log(`Successfully migrated ${faqCount} FAQ documents.\n`);

  // 5. Migrate Hire Pages
  console.log("--- Migrating Hire Pages ---");
  const hirePages = await HirePageData.find({});
  let hireCount = 0;
  for (const doc of hirePages) {
    let updated = false;

    if (doc.category && !isValidObjectId(doc.category)) {
      const catId = await getOrCreateCategory(doc.category, "hire");
      if (catId) {
        doc.category = catId;
        updated = true;
      }
    }

    if (doc.subCategory && !isValidObjectId(doc.subCategory)) {
      const subId = await getOrCreateSubcategory(doc.category, doc.subCategory, "hire");
      if (subId) {
        doc.subCategory = subId;
        updated = true;
      }
    }

    if (updated) {
      await HirePageData.updateOne(
        { _id: doc._id },
        { $set: { category: doc.category, subCategory: doc.subCategory } }
      );
      hireCount++;
    }
  }
  console.log(`Successfully migrated ${hireCount} Hire Page documents.\n`);

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
