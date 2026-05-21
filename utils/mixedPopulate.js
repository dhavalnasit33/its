const mongoose = require("mongoose");
const CategoryModel = require("../models/category/category.model");
const SubcategoryModel = require("../models/subcategory/subcategory.model");

function isValidObjectId(val) {
  if (!val) return false;
  return mongoose.Types.ObjectId.isValid(val) && /^[0-9a-fA-F]{24}$/.test(val.toString());
}

/**
 * Dynamically populates Mixed category/subcategory fields.
 * If the value is a valid ObjectId, fetches the populated document from DB.
 * If the value is a plain text string, returns a consistent object shape: { category: string } or { subcategory: string }.
 */
async function populateMixed(docs, fieldsConfig) {
  if (!docs) return docs;
  const isArray = Array.isArray(docs);
  const docList = isArray ? docs : [docs];

  // Collect all unique ObjectIds to fetch in batch
  const categoryIds = new Set();
  const subcategoryIds = new Set();

  docList.forEach(d => {
    const doc = d.toObject ? d.toObject() : d;

    Object.keys(fieldsConfig).forEach(field => {
      const type = fieldsConfig[field]; // 'category' or 'subcategory'
      const val = doc[field];
      if (val && isValidObjectId(val)) {
        if (type === "category") categoryIds.add(val.toString());
        if (type === "subcategory") subcategoryIds.add(val.toString());
      }
    });
  });

  // Fetch Category and Subcategory documents in batch
  const [categories, subcategories] = await Promise.all([
    CategoryModel.find({ _id: { $in: Array.from(categoryIds) } }).lean(),
    SubcategoryModel.find({ _id: { $in: Array.from(subcategoryIds) } }).lean()
  ]);

  const categoryMap = {};
  categories.forEach(cat => {
    categoryMap[cat._id.toString()] = cat;
  });

  const subcategoryMap = {};
  subcategories.forEach(sub => {
    subcategoryMap[sub._id.toString()] = sub;
  });

  const result = docList.map(d => {
    const doc = d.toObject ? d.toObject() : { ...d };

    Object.keys(fieldsConfig).forEach(field => {
      const type = fieldsConfig[field];
      const val = doc[field];

      if (val) {
        const valStr = val.toString().trim();
        if (isValidObjectId(valStr)) {
          if (type === "category") {
            doc[field] = categoryMap[valStr] || { _id: val, category: "N/A" };
          } else if (type === "subcategory") {
            doc[field] = subcategoryMap[valStr] || { _id: val, subcategory: "N/A" };
          }
        } else {
          // If already a plain text string, return in a consistent structure
          if (type === "category") {
            doc[field] = { category: val };
          } else if (type === "subcategory") {
            doc[field] = { subcategory: val };
          }
        }
      }
    });

    return doc;
  });

  return isArray ? result : result[0];
}

module.exports = { populateMixed };
