"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import apiService from "@/lib/apiService";
import { Blog } from "@/types";
import Motion from "@/components/motionbar";
import { FaLongArrowAltRight } from "react-icons/fa";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";
import Section from "../Section";

// This is the full, self-contained RelatedBlogs component
export default function RelatedBlogs({
  subCategory,
}: {
  subCategory?: string;
}) {
  const [relatedBlogs, setRelatedBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { blogSlug } = useWebsiteSettings();

  useEffect(() => {
    const fetchRelatedBlogs = async () => {
      if (!subCategory) return;

      try {
        setLoading(true);
        const relatedRes = await apiService<{ success: boolean; data: Blog[] }>(
          `/blogs?category=${subCategory}&limit=3`,
        );
        console.log("Related Blogs:", relatedBlogs);
        setRelatedBlogs(relatedRes.data);
      } catch (error) {
        console.error("❌ Error fetching related blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedBlogs();
  }, [subCategory]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#d68029]"></div>
      </div>
    );
  }

  if (!relatedBlogs.length) {
    return null;
  }

  return (
    <Section className="bg-white">
      <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto relative">
        <div className="text-center  mb-2.5 w-full">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <h2 className="text-center w-full text-black common-h2">
              Related Blogs
            </h2>
            <Motion />
          </motion.div>
        </div>
        {/* 👇 FINAL BUTTON - Matches your images exactly 👇 */}
        <div className="w-full mb-10 flex justify-end">
          <Link
            href={`/${blogSlug}`}
            // className="group relative p-4 md:p-5 inline-flex items-center justify-center font-semibold text-md md:text-xl text-[#12203d]"
            className="group relative inline-flex items-center overflow-hidden rounded-full"
          >
            {/* Background circle that expands to a pill shape */}
            <span
              // className="absolute top-1/2 left-3 -translate-y-1/2 -z-10 h-12 w-12 md:h-14 md:w-14 rounded-full bg-gray-200 transition-all duration-300 ease-in-out group-hover:w-full"
               className="absolute left-0 top-1/2 -translate-y-1/2 h-12 w-12 md:h-14 md:w-14 rounded-full bg-gray-200 transition-all duration-500 ease-in-out group-hover:w-full "
            ></span>
            {/* <span className="px-6 md:px-8 py-3"> */}
            <span className="relative z-10 flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 text-md md:text-xl font-semibold text-[#12203d]">
              View All Blogs <FaLongArrowAltRight className="inline-block" />
            </span>
          </Link>
        </div>
        <div className="grid max-[640px]:grid-cols-1 grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {relatedBlogs.map((relatedBlog) => (
            <div
              key={relatedBlog._id}
              className="flex flex-col overflow-hidden items-center justify-center rounded-md bg-white shadow-[0_0_12.2px_0_rgba(0,0,0,0.25)] scale-3d shadow-gray-200 transition-all duration-750 ease-in-out hover:scale-90 border border-gray-200"
            >
              {relatedBlog.image ? (
                <Image
                  src={relatedBlog.image}
                  alt={relatedBlog.details.title}
                  width={400}
                  height={240}
                  className="w-full h-60 object-fill"
                />
              ) : (
                <div className="w-full h-60 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-400">No Image Available</span>
                </div>
              )}
              {/* <img
            src={relatedBlog.image || "/placeholder.png"}
            alt={relatedBlog.details.title}
            className="w-full h-60 object-fill"
          /> */}
              <div className="p-4 md:p-6 w-full">
                <div className="flex flex-col md:flex-row justify-start items-start md:items-center gap-2 mb-4">
                  {relatedBlog.subCategories && (
                    <span className="text-xs font-medium text-[#d68029] bg-[#fff4e9] px-3 py-1.5 rounded-full">
                      {/* {relatedBlog.subCategories} */}
                      {typeof relatedBlog.subCategories === "string"
                        ? relatedBlog.subCategories
                        : relatedBlog.subCategories?.subcategory
                      }
                    </span>
                  )}
                  <span className="text-xs font-medium text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                    {/* {relatedBlog.categories} */}
                    {typeof relatedBlog.categories === "string"
                      ? relatedBlog.categories
                      : relatedBlog.categories?.category
                    }
                  </span>
                </div>
                <div
                  className="text-xl font-bold mb-3 line-clamp-2 text-gray-800"
                  dangerouslySetInnerHTML={{
                    __html: relatedBlog.details.title,
                  }}
                />
                <div
                  className="text-sm text-gray-600 line-clamp-3 [&_a]:no-underline [&_a]:text-gray-600 [&_a:hover]:text-[#d68029] [&_a:hover]:underline mb-4"
                  dangerouslySetInnerHTML={{
                    __html: relatedBlog.details.description,
                  }}
                />
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <Link
                    href={`/${blogSlug}/${encodeURIComponent(relatedBlog.slug)}`}
                    className="text-[#d68029] font-semibold text-sm flex items-center hover:underline"
                  >
                    Read More →
                  </Link>
                  <div className="text-xs text-gray-400">
                    {new Date(relatedBlog.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      },
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
