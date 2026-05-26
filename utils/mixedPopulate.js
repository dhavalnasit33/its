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
 * If the value is a plain text string, returns a consistent object shape.
 *
 * fieldsConfig can be:
 * {
 *   categories: "category" | { type: "category", model: BlogCategory },
 *   subCategories: "subcategory" | { type: "subcategory", model: BlogSubcategory }
 * }
 */
async function populateMixed(docs, fieldsConfig) {
  if (!docs) return docs;
  const isArray = Array.isArray(docs);
  const docList = isArray ? docs : [docs];

  // Resolve target configurations
  const fields = {};
  Object.keys(fieldsConfig).forEach(field => {
    const config = fieldsConfig[field];
    if (typeof config === "string") {
      fields[field] = {
        type: config, // 'category' or 'subcategory'
        model: config === "category" ? CategoryModel : SubcategoryModel
      };
    } else {
      fields[field] = {
        type: config.type,
        model: config.model
      };
    }
  });

  // Unique IDs grouped by model to batch-fetch efficiently
  const queries = {};

  docList.forEach(d => {
    const doc = d.toObject ? d.toObject() : d;

    Object.keys(fields).forEach(field => {
      const { type, model } = fields[field];
      if (!model) return;
      const val = doc[field];
      if (val && isValidObjectId(val)) {
        const valStr = val.toString();
        const collectionName = model.modelName;
        if (!queries[collectionName]) {
          queries[collectionName] = { model, ids: new Set() };
        }
        queries[collectionName].ids.add(valStr);
      }
    });
  });

  // Execute all batch queries in parallel
  const collectionNames = Object.keys(queries);
  const fetchPromises = collectionNames.map(name => {
    const q = queries[name];
    return q.model.find({ _id: { $in: Array.from(q.ids) } }).lean();
  });

  const fetchResults = await Promise.all(fetchPromises);

  // Map collectionName -> { docId -> doc }
  const docMaps = {};
  collectionNames.forEach((name, idx) => {
    const docsArray = fetchResults[idx];
    const map = {};
    docsArray.forEach(item => {
      map[item._id.toString()] = item;
    });
    docMaps[name] = map;
  });

  const result = docList.map(d => {
    const doc = d.toObject ? d.toObject() : { ...d };

    Object.keys(fields).forEach(field => {
      const { type, model } = fields[field];
      if (!model) return;
      const val = doc[field];

      if (val) {
        const valStr = val.toString().trim();
        if (isValidObjectId(valStr)) {
          const map = docMaps[model.modelName] || {};
          if (type === "category") {
            doc[field] = map[valStr] || { _id: val, category: "N/A" };
          } else if (type === "subcategory") {
            doc[field] = map[valStr] || { _id: val, subcategory: "N/A" };
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
