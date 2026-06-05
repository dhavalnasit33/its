const NodeCache = require("node-cache");

// Initialize cache. stdTTL is 0 (unlimited) as we will manually invalidate the cache on updates.
const navCache = new NodeCache({ stdTTL: 0 });

module.exports = {
  get: (key) => navCache.get(key),
  set: (key, val) => navCache.set(key, val),
  clear: () => {
    console.log("⚡ [CACHE] Invalidating navigation structure cache");
    navCache.del("navigation_structure");
  },
};
