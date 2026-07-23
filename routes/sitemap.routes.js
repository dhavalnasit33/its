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

// --- HEAD Routes ---
router.head("/sitemap.xml", (req, res) => {
  res.status(200).end();
});

router.head("/sitemap-main.xml", (req, res) => {
  res.status(200).end();
});

router.head("/sitemap-hire.xml", (req, res) => {
  res.status(200).end();
});

router.head("/sitemap-blog.xml", (req, res) => {
  res.status(200).end();
});

router.head("/sitemap-services.xml", (req, res) => {
  res.status(200).end();
});

// --- GET Routes ---

// 1. Sitemap Index
router.get("/sitemap.xml", async (req, res) => {
  const baseUrl = process.env.Loc_url || "https://inspiretechnosolution.com";
  try {
    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-main.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-hire.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-blog.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-services.xml</loc>
  </sitemap>
</sitemapindex>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemapIndexXml);
  } catch (error) {
    console.error("❌ Error generating sitemap index:", error);
    res
      .status(500)
      .send("Internal Server Error: Could not generate sitemap index.");
  }
});

// 2. Main Sitemap (Single / Independent Pages)
router.get("/sitemap-main.xml", async (req, res) => {
  const baseUrl = process.env.Loc_url || "https://inspiretechnosolution.com";

  try {
    const seoDbPages = await SeoManager.find(
      {
        $or: [
          { linkedType: "independent" },
          { linkedType: { $exists: false } },
          { linkedType: null },
        ],
      },
      "slug updatedAt",
    ).lean();

    // Static pages to always include
    const staticPages = [
      { slug: "ai-chatbot-development" },
      { slug: "ai-product-development" },
      { slug: "ai-strategy-consulting" },
      { slug: "ai-services" },
    ];

    const today = new Date();

    const urls = [
      ...seoDbPages.map((page) => ({
        slug: page.slug,
        updatedAt: page.updatedAt,
      })),
      ...staticPages.map((page) => ({
        slug: page.slug,
        updatedAt: today,
      })),
    ].map((page) => {
      const path = page.slug === "home" ? "/" : `/${page.slug}`;

      return {
        loc: path,
        priority: path === "/" ? 1.0 : 0.9,
        changefreq: "weekly",
        lastmod: formatDate(page.updatedAt),
      };
    });

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemapXml);
  } catch (error) {
    console.error("❌ Error generating main sitemap:", error);
    res
      .status(500)
      .send("Internal Server Error: Could not generate main sitemap.");
  }
});

// 3. Hire Pages Sitemap
router.get("/sitemap-hire.xml", async (req, res) => {
  const baseUrl = process.env.Loc_url || "https://inspiretechnosolution.com";
  try {
    const seoDbPages = await SeoManager.find(
      { linkedType: "hire" },
      "slug updatedAt",
    ).lean();

    const urls = seoDbPages.map((page) => ({
      loc: `/hire/${page.slug}`,
      priority: 0.9,
      changefreq: "weekly",
      lastmod: formatDate(page.updatedAt),
    }));

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemapXml);
  } catch (error) {
    console.error("❌ Error generating hire sitemap:", error);
    res
      .status(500)
      .send("Internal Server Error: Could not generate hire sitemap.");
  }
});

// 4. Blog Pages Sitemap
router.get("/sitemap-blog.xml", async (req, res) => {
  const baseUrl = process.env.Loc_url || "https://inspiretechnosolution.com";
  try {
    const blogDbPages = await Blog.find({}, "slug updatedAt").lean();

    const urls = blogDbPages.map((post) => ({
      loc: `/blog/${post.slug}`,
      priority: 0.8,
      changefreq: "weekly",
      lastmod: formatDate(post.updatedAt),
    }));

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemapXml);
  } catch (error) {
    console.error("❌ Error generating blog sitemap:", error);
    res
      .status(500)
      .send("Internal Server Error: Could not generate blog sitemap.");
  }
});

// 5. Services Pages Sitemap
router.get("/sitemap-services.xml", async (req, res) => {
  const baseUrl = process.env.Loc_url || "https://inspiretechnosolution.com";
  try {
    const seoDbPages = await SeoManager.find(
      { linkedType: "service" },
      "slug updatedAt",
    ).lean();

    const urls = seoDbPages.map((page) => ({
      loc: `/${page.slug}`,
      priority: 0.9,
      changefreq: "weekly",
      lastmod: formatDate(page.updatedAt),
    }));

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${baseUrl}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(sitemapXml);
  } catch (error) {
    console.error("❌ Error generating services sitemap:", error);
    res
      .status(500)
      .send("Internal Server Error: Could not generate services sitemap.");
  }
});

module.exports = router;
