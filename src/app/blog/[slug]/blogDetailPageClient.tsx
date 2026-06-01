"use client";

import { useEffect, useState } from "react";
import apiService from "@/lib/apiService";
import Link from "next/link";
import { Blog, SingleResponse } from "@/types";
import { motion } from "framer-motion";
import parse, { domToReact, Element, DOMNode } from "html-react-parser";
import Image from "next/image";
import Motion from "@/components/motionbar";
import { FaLongArrowAltRight } from "react-icons/fa";
import RelatedBlogs from "@/components/blog/RelatedBlogs";

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}


type TocItem = {
  id: string;
  text: string;
};

const processBlogContentOnClient = (htmlString: string) => {
  if (!htmlString) {
    return { tocItems: [] as TocItem[], cleanedHtml: "" };
  }

  if (typeof window === "undefined") {
    return { tocItems: [] as TocItem[], cleanedHtml: htmlString };
  }

  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, "text/html");

  const normalize = (text: string) => text.replace(/\s+/g, " ").trim();
  const tocItems: TocItem[] = [];

  const tocList = doc.querySelector("ol");
  if (tocList) {
    const listItems = tocList.querySelectorAll("li");
    const headings = Array.from(doc.querySelectorAll("h2"));

    listItems.forEach((li, index) => {
      const itemText = normalize(li.textContent || "");
      if (!itemText) return;

      const matchingHeading = headings.find(
        (h) => normalize(h.textContent || "") === itemText,
      );

      if (matchingHeading) {
        const id = `section-${itemText
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-")}-${index}`;

        matchingHeading.setAttribute("id", id);
        tocItems.push({ id, text: itemText });
      }
    });

    tocList.remove();
  }

  return {
    tocItems,
    cleanedHtml: doc.body.innerHTML,
  };
};

// ✅ A new, dedicated React component for the Table of Contents
// ✅ THIS COMPONENT HAS BEEN RESTYLED TO MATCH YOUR NEW, SIMPLER DESIGN
const TableOfContents = ({ items }: { items: TocItem[] }) => {
  if (!items || items.length === 0) {
    return null;
  }

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    e.preventDefault();
    const element = document.getElementById(id);

    if (element) {
      // 👈 IMPORTANT: Change this selector if your header is not a <header> tag.
      const headerSelector = "header";
      const header = document.querySelector(headerSelector);
      const headerHeight = header ? header.offsetHeight : 0;

      // Calculate the position of the element relative to the top of the page
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      // Subtract the header's height and a little extra margin (e.g., 20px)
      const offsetPosition = elementPosition - headerHeight - 60;

      // Scroll to the calculated position
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className=" blog-content-with-lists  mb-10">
      <ol className="custom-ordered-list  mb-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="custom-list-item flex  break-all wrap-break-word  items-center w-full "
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleLinkClick(e, item.id)}
              className="text-lg text-gray-700 font-medium cursor-pointer hover:text-[#d68029]"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
};

const BlogContent = ({ htmlString }: { htmlString: string }) => {
  return (
    <div className="blog-content-with-lists prose max-w-none text-gray-700 [&_a]:no-underline [&_a]:text-gray-600 [&_a:hover]:text-[#d68029] [&_a:hover]:underline leading-relaxed">
      {parse(htmlString, {
        replace: (domNode) => {
          if (!(domNode instanceof Element)) return;

          if (domNode.name === "ul") {
            return (
              <motion.ul
                className="custom-unordered-list mb-4"
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {domToReact(domNode.children as DOMNode[])}
              </motion.ul>
            );
          }
          if (domNode.name === "ol") {
            return (
              <motion.ol
                className="custom-ordered-list mb-4"
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {domToReact(domNode.children as DOMNode[])}
              </motion.ol>
            );
          }
          if (domNode.name === "li") {
            return (
              <motion.li
                className="custom-list-item flex break-all wrap-break-word items-center w-full"
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {domToReact(domNode.children as DOMNode[])}
              </motion.li>
            );
          }
          if (domNode.name === "h2") {
            return (
              <motion.h2
                id={domNode.attribs.id} // This ID is the scroll target
                className="md:pt-8 mb-4 text-2xl font-bold text-[#d68029]"
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {domToReact(domNode.children as DOMNode[])}
              </motion.h2>
            );
          }
          if (domNode.name === "p") {
            return (
              <motion.div
                className="mb-4"
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {domToReact(domNode.children as DOMNode[])}
              </motion.div>
            );
          }
          if (domNode.name === "pre") {
            return (
              <motion.pre
                className="bg-gray-100 p-4 rounded-md overflow-auto mb-4"
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {domToReact(domNode.children as DOMNode[])}
              </motion.pre>
            );
          }
          if (domNode.name === "code") {
            return (
              <code className="bg-gray-200 px-1 rounded text-sm font-mono">
                {domToReact(domNode.children as DOMNode[])}
              </code>
            );
          }
          if (domNode.name === "img") {
            const { src, alt, width, height } = domNode.attribs;
            return (
              <motion.div
                className="flex justify-center my-6"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <Image
                  src={src}
                  alt={alt || "Blog image"}
                  width={parseInt(width) || 700}
                  height={parseInt(height) || 400}
                  className="max-w-full h-auto rounded-lg shadow-md"
                />
              </motion.div>
            );
          }
        },
      })}
    </div>
  );
};

// Animated Content Component - Simplified version
// function AnimatedContent({ htmlString }: { htmlString: string }) {
// 	return (
// 		<div className="blog-content-with-lists prose max-w-none text-gray-700 [&_a]:no-underline [&_a]:text-gray-600 [&_a:hover]:text-[#d68029] [&_a:hover]:underline leading-relaxed">
// 			{parse(htmlString, {
// 				replace: (domNode) => {
// 					if (domNode instanceof Element) {
// 						// Unordered list with custom icons
// 						if (domNode.name === "ul") {
// 							return (
// 								<motion.ul
// 									className="custom-unordered-list  mb-4"
// 									initial={{ opacity: 0, x: -80 }}
// 									whileInView={{ opacity: 1, x: 0 }}
// 									viewport={{ once: true }}
// 									transition={{ duration: 0.6 }}
// 								>
// 									{domToReact(domNode.children as DOMNode[])}
// 								</motion.ul>
// 							);
// 						}

// 						// Ordered list (numbered)
// 						if (domNode.name === "ol") {
// 							return (
// 								<motion.ol
// 									className="custom-ordered-list  mb-4"
// 									initial={{ opacity: 0, x: -80 }}
// 									whileInView={{ opacity: 1, x: 0 }}
// 									viewport={{ once: true }}
// 									transition={{ duration: 0.6 }}
// 								>
// 									{domToReact(domNode.children as DOMNode[])}
// 								</motion.ol>
// 							);
// 						}

// 						// List item (works for both ul + ol)
// 						if (domNode.name === "li") {
// 							return (
// 								<motion.li
// 									className="custom-list-item flex  break-all wrap-break-word  items-center w-full "
// 									initial={{ opacity: 0, x: -80 }}
// 									whileInView={{ opacity: 1, x: 0 }}
// 									viewport={{ once: true }}
// 									transition={{ duration: 0.6 }}
// 								>
// 									{domToReact(domNode.children as DOMNode[])}
// 								</motion.li>
// 							);
// 						}

// 						if (domNode.name === "h2") {
// 							return (
// 								<motion.h2
// 									id={domNode.attribs.id} // This is the target for the scroll
// 									className="md:pt-8 mb-4 text-2xl font-bold text-[#d68029]"
// 								>
// 									{domToReact(domNode.children as DOMNode[])}
// 								</motion.h2>
// 							);
// 						}
// 						// Headings and paragraphs
// 						if (domNode.name === "p") {
// 							return (
// 								<motion.div
// 									initial={{ opacity: 0, x: -80 }}
// 									whileInView={{ opacity: 1, x: 0 }}
// 									viewport={{ once: true }}
// 									transition={{ duration: 0.6 }}
// 									className={
// 										"mb-4"
// 									}
// 								>
// 									{domToReact(domNode.children as DOMNode[])}
// 								</motion.div>
// 							);
// 						}

// 						// Code blocks
// 						if (domNode.name === "pre") {
// 							return (
// 								<motion.pre
// 									className="bg-gray-100 p-4 rounded-md overflow-auto mb-4"
// 									initial={{ opacity: 0, x: -80 }}
// 									whileInView={{ opacity: 1, x: 0 }}
// 									viewport={{ once: true }}
// 									transition={{ duration: 0.6 }}
// 								>
// 									{domToReact(domNode.children as DOMNode[])}
// 								</motion.pre>
// 							);
// 						}

// 						if (domNode.name === "code") {
// 							return (
// 								<code className="bg-gray-200 px-1 rounded text-sm font-mono">
// 									{domToReact(domNode.children as DOMNode[])}
// 								</code>
// 							);
// 						}

// 						// Image elements - add zoom-out animation
// 						if (domNode.name === "img") {
// 							const { src, alt, width, height } = domNode.attribs;
// 							return (
// 								<motion.div
// 									className="flex justify-center my-6"
// 									initial={{ opacity: 0, scale: 0.5 }}
// 									whileInView={{ opacity: 1, scale: 1 }}
// 									viewport={{ once: true, margin: "0px 0px -100px 0px" }}
// 									transition={{ duration: 0.7, ease: "easeOut" }}
// 								>
// 									<Image
// 										src={src}
// 										alt={alt || "Blog image"}
// 										width={parseInt(width) || 700}
// 										height={parseInt(height) || 400}
// 										className="max-w-full h-auto rounded-lg shadow-md"
// 									/>
// 								</motion.div>
// 							);
// 						}
// 					}
// 				},
// 			})}
// 		</div>
// 	);
// }

export default function BlogDetailPageClient({
  blog,
  tocItems,
  processedContent,
}: {
  blog: Blog;
  tocItems: TocItem[];
  processedContent: string;
}) {
  const [renderContent, setRenderContent] = useState<{
    tocItems: TocItem[];
    html: string;
  }>({
    tocItems: tocItems || [],
    html: processedContent || blog?.details?.answerOrDetails || "",
  });

  // const [resolvedParams, setResolvedParams] = useState<{ slug: string } | null>(
  //   null
  // );
  // const [blog, setBlog] = useState<Blog | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const sourceHtml = processedContent || blog?.details?.answerOrDetails || "";

    if (tocItems && tocItems.length > 0) {
      setRenderContent({
        tocItems,
        html: sourceHtml,
      });
      return;
    }

    const parsed = processBlogContentOnClient(sourceHtml);
    setRenderContent({
      tocItems: parsed.tocItems,
      html: parsed.cleanedHtml,
    });
  }, [tocItems, processedContent, blog?.details?.answerOrDetails]);

  // // Resolve the params promise
  // useEffect(() => {
  //   const resolveParams = async () => {
  //     const resolved = await params;
  //     setResolvedParams(resolved);
  //   };

  //   resolveParams();
  // }, [params]);

  // // Fetch Blog by slug
  // useEffect(() => {
  //   const fetchBlog = async () => {
  //     if (!resolvedParams) return;
  //     setLoading(true);

  //     try {
  //       const res = await apiService<SingleResponse<Blog>>(
  //         `/blogs/slug/${resolvedParams.slug}`
  //       );
  //       setBlog(res.data);
  //     } catch (error) {
  //       console.error("❌ Error fetching blog:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchBlog();
  // }, [resolvedParams]);

  // if (loading) {
  //   return (
  //     <div className="min-h-screen flex items-center justify-center">
  //       <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#d68029]"></div>
  //     </div>
  //   );
  // }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Blog not found.</p>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <nav className=" w-full max-w-[95%] lg:max-w-[80%]  mx-auto text-base text-gray-500">
        <div className="w-full px-4 md:px-8    py-4 flex flex-row">
          <Link href="/" className="hover:text-[#d68029] mx-1">
            Home
          </Link>{" "}
          /
          <Link href="/blog" className="hover:text-[#d68029] mx-1">
            Blog
          </Link>{" "}
          /
          <span className="ml-1 text-gray-800">
            {blog.details.title.replace(/<[^>]*>/g, "")}
          </span>
        </div>
      </nav>

      {/* Blog Content */}
      <section className="px-2 overflow-x-hidden  sm:px-4 md:px-8 lg:px-12 py-4">
        <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-8 w-full max-w-[95%] mx-auto">
          {/* Main Content */}

          <div className="w-full lg:max-w-5xl bg-white shadow-[0_0_16.9px_rgba(102,102,102,0.25)] p-8  ">
            {/* Blog Header */}
            <div className="mb-8">
              <h1
                className="text-3xl md:text-4xl font-bold text-gray-800 mb-4"
                dangerouslySetInnerHTML={{ __html: blog?.details?.title || "" }}
              />

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600">
                    By: {blog.details.author || "ITS"}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-sm font-medium text-gray-600">
                    {/* Category: {blog.categories} */}
                    Category: {
                      typeof blog.categories === "string"
                        ? blog.categories
                        : blog.categories?.category
                    }
                  </span>
                </div>
                {blog.subCategories && (
                  <div className="flex items-center">
                    <span className="text-sm font-medium text-gray-600">
                      {/* Subcategory: {blog.subCategories} */}
                      Subcategory: {
                        typeof blog.subCategories === "string"
                          ? blog.subCategories
                          : blog.subCategories?.subcategory
                      }
                    </span>
                  </div>
                )}
                <div className="flex items-center">
                  <span className="text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Blog Introduction */}
            <div
              className="prose max-w-none mb-12 text-gray-700 [&_a]:no-underline [&_a]:text-gray-600 [&_a:hover]:text-[#d68029] [&_a:hover]:underline leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog?.details?.description || "" }}
            />

            {/* Blog Content with Motion */}
            {/* ✅ Render the new Table of Contents */}
            <TableOfContents items={renderContent.tocItems} />

            {/* ✅ Render the cleaned main content */}
            <BlogContent htmlString={renderContent.html} />
          </div>

          {/* Sidebar */}
          <motion.div
            className="w-full max-w-full sm:w-[40%] lg:max-w-[25%]  overflow-x-hidden  flex flex-col gap-8"
            initial={{ opacity: 0, transform: "translateX(50px) scale(0.95)" }}
            whileInView={{ opacity: 1, transform: "translateX(0) scale(1)" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 0.4,
            }}
          >
            {/* Trusted By Section */}
            <div className="bg-white shadow-[0_0_16.9px_rgba(102,102,102,0.25)] overflow-hidden">
              <div className="relative">
                <Image
                  src="/blog/blog-detail.png"
                  alt="We are trusted by over 650+ clients."
                  width={400}
                  height={300}
                  className="w-full h-auto"
                />
              </div>
              <div className="p-6 text-center">
                <h6 className="font-semibold text-[#12203d] mb-4">
                  Join them by using our services and grow your business.
                </h6>
                <Link
                  href="/contact"
                  className="inline-block text-base font-normal rounded-lg bg-[#12203d] text-white px-6 py-3 hover:bg-[#1a2f57] transition-colors"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* About Company Section */}
            <div
              className="relative rounded-lg overflow-hidden p-6 min-h-75 flex items-center justify-center"
              style={{
                backgroundImage: "url('/blog/blog-detail-box2.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative z-10 text-center text-white">
                <div className="mb-6 flex justify-center">
                  <Image
                    src="/blog/logo.png"
                    alt="INSPIRE Techno Solution"
                    width={200}
                    height={50}
                    className="h-10 w-auto"
                  />
                </div>
                <p className="mb-6 italic">
                  &quot;At Inspire Techno Solution, our mission is to
                  continuously innovate...&quot;
                </p>
                <Link
                  href="/career"
                  className="inline-block text-[#d68029] font-semibold bg-white px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Find a Career with us →
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Blogs Section */}
      {/* <RelatedBlogs subCategory={blog.subCategories} /> */}
      <RelatedBlogs
        subCategory={
          typeof blog.subCategories === "string"
            ? blog.subCategories
            : blog.subCategories?.subcategory
        }
      />
    </>
  );
}




