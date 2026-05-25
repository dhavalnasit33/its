const express = require("express");
const router = express.Router();
const SeoManager = require("../models/seo/manage-seo");
const Blog = require("../models/blog/blog.model");

// Helper function to format dates to YYYY-MM-DD
const formatDate = (date) => {
  if (!date) {
    return new Date().toISOString().split("T")[0];
  }
  return new Date(date).toISOString().split("T")[0];
};

router.get("/sitemap.xml", async (req, res) => {
  // ⚠️ IMPORTANT: Change this URL to your final, live website domain
  const baseUrl = process.env.Loc_url;
  // "https://inspiretechnosolution.com" ||
  // "http://192.168.1.29:3000" ||"http://localhost:3000"
  try {
    // --- 1. Fetch all SEO-managed pages (including hire pages) ---
    const seoDbPages = await SeoManager.find({}, "slug updatedAt").lean();
    const seoUrls = seoDbPages.map((page) => {
      let path;
      // Check if the slug is for a hire page
      if (page.slug.startsWith("hire-")) {
        path = `/hire/${page.slug}`;
      } else if (page.slug === "home") {
        path = "/"; // Special case for the homepage
      } else {
        path = `/${page.slug}`;
      }

      return {
        loc: path,
        priority: path === "/" ? 1.0 : 0.9, // Homepage gets highest priority
        changefreq: "weekly",
        lastmod: formatDate(page.updatedAt),
      };
    });

    // --- 2. Fetch all Blog Pages ---
    const blogDbPages = await Blog.find({}, "slug updatedAt").lean();
    const blogUrls = blogDbPages.map((post) => ({
      loc: `/blog/${post.slug}`,
      priority: 0.8,
      changefreq: "weekly",
      lastmod: formatDate(post.updatedAt),
    }));

    // --- 3. Combine all URL arrays ---
    const allUrls = [...seoUrls, ...blogUrls];

    // --- 4. Build the final XML string ---
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `
  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join("")}
</urlset>`;

    // --- 5. Set the correct header and send the response ---
    res.header("Content-Type", "application/xml");
    res.send(sitemapXml);
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    res.status(500).send("Internal Server Error: Could not generate sitemap.");
  }
});

module.exports = router;

// // ==========================================
// // NEW IMPLEMENTATION: DIRECT DATABASE QUERY
// // ==========================================

// const express = require("express");
// const router = express.Router();
// const Blog = require("../models/blog/blog.model");
// const Service = require("../models/ourServices/ourServies");
// const HirePageData = require("../models/hire/hirePageData");

// // Helper function to format dates to YYYY-MM-DD
// const formatDate = (date) => {
//   if (!date) {
//     return new Date().toISOString().split("T")[0];
//   }
//   return new Date(date).toISOString().split("T")[0];
// };

// router.get("/sitemap.xml", async (req, res) => {
//   const baseUrl = process.env.Loc_url || "https://inspiretechnosolution.com";

//   try {
//     // Fetch all blogs, services, and hire pages directly from their collections in parallel
//     const [blogs, services, hirePages] = await Promise.all([
//       Blog.find({}, "slug updatedAt").lean(),
//       Service.find({}, "slug updatedAt").lean(),
//       HirePageData.find({}, "slug updatedAt").lean(),
//     ]);

//     // --- 1. Static Pages (Marketing & Core Informational Pages) ---
//     const staticPaths = [
//       { loc: "/", priority: 1.0, changefreq: "daily" },
//       { loc: "/about-us", priority: 0.9, changefreq: "monthly" },
//       { loc: "/career", priority: 0.9, changefreq: "monthly" },
//       { loc: "/contact", priority: 0.9, changefreq: "monthly" },
//       { loc: "/faqs", priority: 0.8, changefreq: "monthly" },
//       { loc: "/our-portfolio", priority: 0.9, changefreq: "weekly" },
//       { loc: "/our-services", priority: 0.9, changefreq: "weekly" },
//       { loc: "/training", priority: 0.9, changefreq: "weekly" }
//     ];

//     const staticUrls = staticPaths.map(page => ({
//       loc: page.loc,
//       priority: page.priority,
//       changefreq: page.changefreq,
//       lastmod: formatDate(new Date()) // Static pages mod time defaults to today
//     }));

//     // --- 2. Dynamic Services (served under root /[slug] in Frontend) ---
//     const serviceUrls = services.map(service => ({
//       loc: `/${service.slug}`,
//       priority: 0.9,
//       changefreq: "weekly",
//       lastmod: formatDate(service.updatedAt)
//     }));

//     // --- 3. Dynamic Hire Pages (served under /hire/[slug] in Frontend) ---
//     const hireUrls = hirePages.map(hire => ({
//       loc: `/hire/${hire.slug}`,
//       priority: 0.9,
//       changefreq: "weekly",
//       lastmod: formatDate(hire.updatedAt)
//     }));

//     // --- 4. Dynamic Blogs (served under /blog/[slug] in Frontend) ---
//     const blogUrls = blogs.map(blog => ({
//       loc: `/blog/${blog.slug}`,
//       priority: 0.8,
//       changefreq: "weekly",
//       lastmod: formatDate(blog.updatedAt)
//     }));

//     // --- 5. Combine all URL arrays ---
//     const allUrls = [...staticUrls, ...serviceUrls, ...hireUrls, ...blogUrls];

//     // --- 6. Build the final XML string ---
//     const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
// ${allUrls
//   .map(
//     (url) => `  <url>
//     <loc>${baseUrl}${url.loc}</loc>
//     <lastmod>${url.lastmod}</lastmod>
//     <changefreq>${url.changefreq}</changefreq>
//     <priority>${url.priority.toFixed(1)}</priority>
//   </url>`,
//   )
//   .join("\n")}
// </urlset>`;

//     // --- 7. Set correct header and send response ---
//     res.header("Content-Type", "application/xml");
//     res.send(sitemapXml);
//   } catch (error) {
//     console.error("❌ Error generating sitemap:", error);
//     res.status(500).send("Internal Server Error: Could not generate sitemap.");
//   }
// });

// module.exports = router;

