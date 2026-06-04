"use client";
import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import apiService from "@/lib/apiService";
import { FaPlus, FaMinus } from "react-icons/fa";
import NotFoundPage from "@/components/NotFoundPage";
import { HirePageData } from "@/types";

interface Faqs {
  categories: string;
  title: string;
  answer: string;
}


interface Category {
  _id: string;
  category: string;
  image: string;
}

interface FaqResponse {
  success: boolean;
  data: Faqs[];
}

function faqs() {
  const [faqs, setfaqs] = useState<Faqs[]>([]);
  const categoryRef = useRef<HTMLDivElement | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const [pageData, setPageData] = useState<HirePageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await apiService<{ success: boolean; data: Category[] }>(
          "/faq-category"
        );
        // setCategories(["All", ...res.data]);
        setCategories(res.data);
      } catch (error) {
        console.error("❌ Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);


  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      try {
        const params: Record<string, any> = {};

        if (selectedCategory !== "All") {
          params.category = selectedCategory;
        }

        const res = await apiService<FaqResponse>(
          "/faqs",
          { params }
        );

        setfaqs(res.data);
      } catch (error) {
        console.error("❌ Error fetching faqs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, [selectedCategory]);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };



  if (!faqs) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <NotFoundPage />
      </div>
    )
  }
  return (
    <>


      {/* Hero Section */}
      <section data-cursor className="px-12.5 common_background_gradient blog_hero_section flex flex-col items-center justify-center gap-10 py-20 relative">
        <div className="flex w-full z-20">
          <div className="flex mt-12.5 w-full">
            <div className="flex p-2.5 flex-wrap w-full mx-auto justify-center items-center">
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-5 w-full text-center"
              >
                <h1 className="text-center text-[46px]/[130%] text-black tracking-[1.2px] font-semibold">
                  Exploring the{" "}
                  <span className="text-[#d68029]">Frequently Asked Questions</span>
                </h1>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full text-center text-black font-medium text-[18px]/[30px] flex justify-center mt-4"
              >
                <p className="text-[18px]/[32px] tracking-[0.02em] font-normal max-w-4/5">
                  If you have questions about our services, experiences and approach, here are their answers. We are happy to answer any
                  other questions you may have.

                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      <section ref={categoryRef} className="w-full max-w-[90%] lg:max-w-[80%] mx-auto scroll-mt-24 px-5">
        <div className="">
          <div className="flex flex-wrap justify-between items-center gap-3 mt-10">
            {/* {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => handleCategoryClick(category)}
                className={`px-[40px] cursor-pointer py-[10px] rounded-e-xl rounded-t-xl text-[14px] font-semibold border transition-all duration-200 ${selectedCategory === category
                  ? "bg-[#d68029] text-white border-[#d68029]"
                  : "bg-[#ffd4a8] text-black border-[#ffd4a8] hover:bg-[#d68029] hover:text-white hover:border-[#d68029]"
                  }`}
              >
                {category}
              </button>
            ))} */}
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-[40px] py-[10px] rounded-e-xl rounded-t-xl text-[14px] font-semibold border transition-all duration-200
              ${selectedCategory === "All"
                ? "bg-[#d68029] text-white border-[#d68029]"
                : "bg-[#ffd4a8] text-black border-[#ffd4a8]"
              }`}
            >
              All
            </button>
            {categories.map((category, index) => (
              <button
                key={category._id ?? category.category ?? index}
                // onClick={() => handleCategoryClick(category.category)}
                onClick={() => handleCategoryClick(category._id)}
                className={`px-[40px] cursor-pointer py-[10px] rounded-e-xl rounded-t-xl text-[14px] font-semibold border transition-all duration-200 ${selectedCategory === category.category
                              ? "bg-[#d68029] text-white border-[#d68029]"
                              : "bg-[#ffd4a8] text-black border-[#ffd4a8] hover:bg-[#d68029] hover:text-white hover:border-[#d68029]"
                              }`}
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className='w-full max-w-[90%] lg:max-w-[80%] mx-auto mt-12'>
        <div className="">
          <div className="flex p-2.5 w-full content-start relative flex-wrap">
            <div className="w-full text-start box-border relative">
              {faqs.length > 0 &&
                faqs.map((item, index) => {
                  const isOpen = activeIndex === index;
                  return (
                    <div
                      key={index}
                      className={`mb-5 w-full rounded-lg hover:bg-[#ffd4a8] p-2.5 shadow-[0_0_9px_0px_rgba(0,0,0,0.25)] border border-[#d5d8dc] box-border ${isOpen ? "bg-[#ffd4a8]" : "bg-white"
                        }`}
                    >
                      <div
                        className="cursor-pointer py-4 px-5 box-border w-full  flex items-center justify-between font-bold"
                        onClick={() => toggleAccordion(index)}
                      >
                        <span className="font-medium w-full text-[20px] text-black">
                          {/* {item.title} */}
                          <span dangerouslySetInnerHTML={{ __html: item.title }} />
                        </span>
                        <span className="w-[1.5em] inline-block">
                          {isOpen ? <FaMinus /> : <FaPlus />}
                        </span>
                      </div>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.6,
                              ease: "easeInOut",
                              delay: 0.1,
                            }}
                            className="overflow-hidden"
                          >
                            <div className="block px-5 py-4 text-[#7a7a7a] text-md">
                              <div
                                className="prose max-w-none font-normal text-[#6f6f6f] [&_a]:text-[#d68029] [&_a]:no-underline [&_a:hover]:underline"
                                dangerouslySetInnerHTML={{
                                  __html: item?.answer || "",
                                }}
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default faqs
