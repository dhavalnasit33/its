// "use client";
// import React, { useState, useEffect, useCallback, useRef } from "react";
// import Image from "next/image";
// import { useMediaQuery } from "@/hook/useMediaQuery";
// import apiService from "@/lib/apiService";
// import Motion from "../motionbar";
// import { MdArrowBack, MdArrowForward } from "react-icons/md";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// type Testimonial = {
//     _id: string;
//     name: string;
//     image: string;
//     location: string;
//     description: string;
//     page?: number;
// };

// type Pagination = {
//     current: number;
//     pages: number;
//     total: number;
// };

// type PaginatedResponse<T> = {
//     success: boolean;
//     data: T[];
//     pagination: Pagination;
// };

// const TestimonialSkeleton = () => (
//     <div className="relative w-full h-80 shrink-0 flex flex-col bg-white p-8 rounded-2xl shadow-lg border border-gray-100 animate-pulse">
//         <div className="absolute -top-4 right-6 bg-gray-200 w-12 h-10 rounded-lg shadow"></div>
//         <div className="flex items-center gap-4 mb-5">
//             <div className="w-16 h-16 rounded-full bg-gray-200"></div>
//             <div className="flex-1 space-y-2">
//                 <div className="h-5 bg-gray-200 rounded w-3/4"></div>
//                 <div className="h-4 bg-gray-200 rounded w-1/2"></div>
//             </div>
//         </div>
//         <div className="space-y-3 mt-4 grow">
//             <div className="h-4 bg-gray-200 rounded w-full"></div>
//             <div className="h-4 bg-gray-200 rounded w-5/6"></div>
//         </div>
//     </div>
// );

// const Testimonials: React.FC = () => {
//     const PAGE_SIZE = 50;
//     const WINDOW_SIZE = 30;
//     const TRIGGER_DISTANCE_END = 5;
//     const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
//     const [pagination, setPagination] = useState<Pagination | null>(null);
//     const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());
//     const [isFetching, setIsFetching] = useState(false);
//     const [initialLoading, setInitialLoading] = useState(true);
//     const [isBeginning, setIsBeginning] = useState(true);
//     const [isEnd, setIsEnd] = useState(false);
//     const [currentSlidesToShow, setCurrentSlidesToShow] = useState(3);

//     const sliderRef = useRef<Slider | null>(null);
//     const isMobile = useMediaQuery('(max-width: 767px)');
//     const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');

//     useEffect(() => {
//         if (isMobile) {
//             setCurrentSlidesToShow(1);
//         } else if (isTablet) {
//             setCurrentSlidesToShow(2);
//         } else {
//             setCurrentSlidesToShow(3);
//         }
//     }, [isMobile, isTablet]);

//     const fetchPage = useCallback(async (pageToFetch: number) => {
//         if (isFetching || loadedPages.has(pageToFetch)) return;
//         if (pagination && (pageToFetch <= 0 || pageToFetch > pagination.pages)) return;

//         setIsFetching(true);
//         try {
//             const response = await apiService<PaginatedResponse<Testimonial>>(
//                 "/testimonials",
//                 { params: { page: pageToFetch, limit: PAGE_SIZE } }
//             );

//             if (response.success && response.data.length > 0) {
//                 const newData = response.data.map(item => ({ ...item, page: pageToFetch }));

//                 setTestimonials(prev => {
//                     const combined = [...prev, ...newData];
//                     const unique = combined.filter(
//                         (item, index, self) =>
//                             index === self.findIndex((t) => t._id === item._id)
//                     );
//                     return unique.length > WINDOW_SIZE ? unique.slice(unique.length - WINDOW_SIZE) : unique;
//                 });

//                 setLoadedPages(prev => new Set(prev).add(pageToFetch));
//                 setPagination(response.pagination);
//             }
//         } catch (err) {
//             console.error("Could not load testimonials.", err);
//         } finally {
//             setIsFetching(false);
//             if (initialLoading) setInitialLoading(false);
//         }
//     }, [isFetching, loadedPages, pagination, initialLoading]);

//     useEffect(() => {
//         fetchPage(1);
//     }, []);

//     const handleNext = () => sliderRef.current?.slickNext();
//     const handlePrev = () => sliderRef.current?.slickPrev();

//     const hasMorePages = pagination ? Math.max(...loadedPages) < pagination.pages : true;

//     const settings = {
//         dots: false,
//         arrows: false,
//         initialSlide: 1,
//         infinite: true,
//         speed: 500,
//         slidesToShow: currentSlidesToShow,
//         slidesToScroll: 2,
//         centerMode: true,
//         centerPadding: "5px",
//         beforeChange: (current: number, next: number) => {
//             setIsBeginning(next === 0);
//             const isAtEnd = next >= testimonials.length - currentSlidesToShow;
//             setIsEnd(isAtEnd);

//             const isNearEnd = next >= testimonials.length - TRIGGER_DISTANCE_END;
//             if (isNearEnd && hasMorePages && !isFetching) {
//                 fetchPage(Math.max(...loadedPages) + 1);
//             }
//         },
//         responsive: [
//             {
//                 breakpoint: 1024,
//                 settings: { slidesToShow: 2, slidesToScroll: 1, centerMode: false, centerPadding: "0px" }
//             },
//             {
//                 breakpoint: 768,
//                 settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: true, centerPadding: "0px" }
//             }
//         ]
//     };

//     const sliderStyles = `
//         .slick-slider { width: 100%; display: flex; align-items: center; }
//         .elevated-testimonial-card {
//             transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.4s ease;
//             transform: translateY(25px) scale(0.95);
//         }
//         .slick-center .elevated-testimonial-card { transform: translateY(0px) scale(1); opacity: 1; }
//     `;

//     return (
//         <section className="py-20 w-full relative bg-white z-10">
//             <style dangerouslySetInnerHTML={{ __html: sliderStyles }} />

//             <div className="w-full max-w-[90%] lg:max-w-[80%] relative mx-auto px-4">
//                 <div className="text-center pb-5 mb-2.5 w-full">
//                     <h2 className="text-center w-full font-bold text-gray-800 tracking-tight text-3xl md:text-4xl">
//                         Testimonials from our Clients
//                     </h2>
//                     <Motion />
//                 </div>
//             </div>

//             <div className="w-full common_background_gradient relative">
//                 <div className="w-full max-w-[90%] lg:max-w-[80%] relative mx-auto px-4">
//                     <div className="py-5 w-full h-125">
//                         {initialLoading ? (
//                             <div className="flex justify-center gap-4">
//                                 {Array.from({ length: 3 }).map((_, i) => (
//                                     <div key={`skeleton-${i}`} className="w-1/3 px-2">
//                                         <TestimonialSkeleton />
//                                     </div>
//                                 ))}
//                             </div>
//                         ) : (
//                             testimonials.length > 0 && (
//                                 <Slider ref={sliderRef} {...settings}>
//                                     {testimonials.map((testimonial) => (
//                                         <div key={testimonial._id} className="px-2 py-8">
//                                             <div className="relative elevated-testimonial-card bg-white p-8 rounded-2xl border border-gray-100 flex flex-col h-87.5 text-left shadow-lg">
//                                                 <div className="absolute -top-10 right-6 text-white p-3">
//                                                     <Image
//                                                         src={"/home/testimonail-quote.png"}
//                                                         alt={"quote"}
//                                                         width={60}
//                                                         height={60}
//                                                     />
//                                                 </div>
//                                                 <div className="flex items-center gap-4 mb-5">
//                                                     {testimonial.image ? (
//                                                         <Image
//                                                             src={testimonial.image}
//                                                             alt={testimonial.name}
//                                                             width={64}
//                                                             height={64}
//                                                             className="w-16 h-16 rounded-full object-cover"
//                                                         />
//                                                     ) : (
//                                                         <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-gray-500">
//                                                             {testimonial.name.charAt(0)}
//                                                         </div>
//                                                     )}
//                                                     <div>
//                                                         <h4 className="font-semibold text-lg text-gray-900">{testimonial.name}</h4>
//                                                         <span className="text-sm text-gray-500">{testimonial.location}</span>
//                                                     </div>
//                                                 </div>
//                                                 <div className="grow overflow-hidden">
//                                                     <p className="text-gray-600 leading-relaxed italic line-clamp-5">
//                                                         &quot;{testimonial.description}&quot;
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </Slider>
//                             )
//                         )}
//                     </div>

//                     <div className="flex justify-center items-center gap-4">
//                         <button
//                             onClick={handlePrev}
//                             className="p-3 rounded-lg shadow-md text-white cursor-pointer bg-linear-to-br from-[#d68029] to-[#ffc700] hover:scale-110 transition-transform duration-200"
//                         >
//                             <MdArrowBack size={24} />
//                         </button>
//                         <button
//                             onClick={handleNext}
//                             className="p-3 rounded-lg shadow-md text-white cursor-pointer bg-linear-to-br from-[#d68029] to-[#ffc700] hover:scale-110 transition-transform duration-200"
//                         >
//                             <MdArrowForward size={24} />
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Testimonials;

"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useMediaQuery } from "@/hook/useMediaQuery";
import apiService from "@/lib/apiService";
import Motion from "../motionbar";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import Section from "../Section";
import Row from "../Row";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

type Testimonial = {
  _id: string;
  name: string;
  image: string;
  location: string;
  description: string;
  page?: number;
};
type Pagination = {
  current: number;
  pages: number;
  total: number;
};
type PaginatedResponse<T> = {
  success: boolean;
  data: T[];
  pagination: Pagination;
};

const PAGE_SIZE = 50;
const TRIGGER_DISTANCE_END = 5;

const TestimonialSkeleton = ({ isCenter }: { isCenter?: boolean }) => (
  <div
    className={`relative w-full flex flex-col bg-white p-8 rounded-2xl shadow-lg border border-gray-100 animate-pulse ${
      isCenter ? "min-h-[320px]" : "min-h-[256px]"
    }`}
  >
    <div className="absolute -top-4 right-6 bg-gray-200 w-12 h-10 rounded-lg shadow" />
    <div className="flex items-center gap-4 mb-5">
      <div
        className={`rounded-full bg-gray-200 flex-shrink-0 ${
          isCenter ? "w-16 h-16" : "w-12 h-12"
        }`}
      />
      <div className="flex-1 space-y-2">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />
      </div>
    </div>
    <div className="space-y-3 mt-4 grow">
      <div className="h-4 bg-gray-200 rounded w-full" />
      <div className="h-4 bg-gray-200 rounded w-5/6" />
    </div>
  </div>
);

const Testimonials: React.FC = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loadedPages, setLoadedPages] = useState<Set<number>>(new Set());
  const [isFetching, setIsFetching] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const [cardColors] = useState(() =>
    Array.from({ length: 500 }, () => Math.floor(Math.random() * 360)),
  );

  const ROTATION_INTERVAL = 4000;
  const isMobile = useMediaQuery("(max-width: 767px)");

  const fetchPage = useCallback(
    async (pageToFetch: number) => {
      if (isFetching || loadedPages.has(pageToFetch)) return;
      if (pagination && (pageToFetch <= 0 || pageToFetch > pagination.pages))
        return;
      setIsFetching(true);
      try {
        const response = await apiService<PaginatedResponse<Testimonial>>(
          "/testimonials",
          { params: { page: pageToFetch, limit: PAGE_SIZE } },
        );
        if (response.success && response.data.length > 0) {
          const newData = response.data.map((item) => ({
            ...item,
            page: pageToFetch,
          }));
          setTestimonials((prev) => {
            const combined = [...prev, ...newData];
            return combined.filter(
              (item, idx, self) =>
                idx === self.findIndex((t) => t._id === item._id),
            );
          });
          setLoadedPages((prev) => new Set(prev).add(pageToFetch));
          setPagination(response.pagination);
        }
      } catch (err) {
        console.error("Could not load testimonials.", err);
      } finally {
        setIsFetching(false);
        if (initialLoading) setInitialLoading(false);
      }
    },
    [isFetching, loadedPages, pagination, initialLoading],
  );

  useEffect(() => {
    fetchPage(1);
  }, []);

 useEffect(() => {
    if (testimonials.length < 3) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, ROTATION_INTERVAL);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handleNext = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    const hasMore = pagination
      ? Math.max(...loadedPages) < pagination.pages
      : true;
    const next = (activeIndex + 1) % testimonials.length;
    if (
      next >= testimonials.length - TRIGGER_DISTANCE_END &&
      hasMore &&
      !isFetching
    ) {
      fetchPage(Math.max(...loadedPages) + 1);
    }
  };

  const handlePrev = () => {
    if (testimonials.length === 0) return;
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    // common_background_gradient
    <Section className="py-20 lg:py-28 relative overflow-hidden bg-white text-slate-900 border-t border-slate-200/70">
      <style
        dangerouslySetInnerHTML={{
          __html: `
                @keyframes fillProgress {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
            `,
        }}
      />

      <Row>
        <div className="text-center pb-5 mb-2.5 w-full">
          <h2 className="text-center common-h2">
            Testimonials from our Clients
          </h2>
          <Motion />
        </div>
      </Row>

     <div className="w-full relative z-20">
        <Row className="overflow-hidden">
          {initialLoading && (
            <div className="py-5 w-full h-125">
              <div className="flex justify-center gap-4">
                {[false, true, false].map((isCenter, i) => (
                  <div
                    key={i}
                    className={isCenter ? "w-1/3 px-2" : "w-1/3 px-2 self-end"}
                  >
                    <TestimonialSkeleton isCenter={isCenter} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {!initialLoading && testimonials.length > 0 && (
            <div className="w-full min-h-[460px] sm:min-h-[480px] relative flex items-center justify-center overflow-visible perspective-[1400px] py-4">
              <button
                onClick={handlePrev}
                className="hidden sm:flex items-center justify-center absolute left-2 sm:left-6 lg:left-12 z-50 p-3 sm:p-4 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-full shadow-2xl hover:bg-white hover:scale-110 hover:border-[#D68029] transition-all text-[#0F172A] hover:text-[#D68029] active:scale-95 cursor-pointer"
                aria-label="Previous card"
              >
                <LuChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
              </button>

              <button
                onClick={handleNext}
                className="hidden sm:flex items-center justify-center absolute right-2 sm:right-6 lg:right-12 z-50 p-3 sm:p-4 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-full shadow-2xl hover:bg-white hover:scale-110 hover:border-[#D68029] transition-all text-[#0F172A] hover:text-[#D68029] active:scale-95 cursor-pointer"
                aria-label="Next card"
              >
                <LuChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
              </button>

              {testimonials.map((testimonial, idx) => {
                const totalCards = testimonials.length;
                const cardHue = cardColors[idx];
                let offset = idx - activeIndex;

                if (offset > totalCards / 2) {
                  offset -= totalCards;
                } else if (offset < -totalCards / 2) {
                  offset += totalCards;
                }

                if (Math.abs(offset) > 4) return null;

                const isCenter = offset === 0;

                return (
                  <motion.div
                    key={testimonial._id}
                    onClick={() => setActiveIndex(idx)}
                    animate={{
                      x: offset * (isMobile ? 0 : 140),
                      y: Math.abs(offset) * 12,
                      scale: 1 - Math.abs(offset) * 0.12,
                      opacity: 1 - Math.abs(offset) * 0.08,
                      zIndex: 50 - Math.abs(offset),
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 28,
                      mass: 0.9,
                    }}
                    className={`absolute w-full max-w-md bg-white border rounded-[2rem] overflow-hidden p-8 sm:p-9 transition-colors duration-300 ${
                      isCenter
                        ? "cursor-default"
                        : "cursor-pointer hover:bg-slate-50"
                    }`}
                    style={{
                      pointerEvents: "auto",
                      boxShadow: isCenter
                        ? `0 25px 50px -12px hsla(${cardHue}, 85%, 45%, 0.25)`
                        : `0 4px 6px -1px rgba(0,0,0,0.05)`,
                      borderColor: isCenter
                        ? `hsla(${cardHue}, 85%, 45%, 0.35)`
                        : "#e2e8f0",
                    }}
                  >
                   <div className="absolute top-0 left-0 right-0 h-[6px] bg-slate-100/50">
                      {isCenter ? (
                        <div
                          key={activeIndex}
                          className="h-full"
                          style={{
                            backgroundColor: `hsl(${cardHue},85%,45%)`,
                            animation: `fillProgress ${ROTATION_INTERVAL}ms linear forwards`,
                            animationPlayState: "running",
                          }}
                        />
                      ) : (
                        <div className="h-full w-full bg-slate-200" />
                      )}
                    </div>

                    <div className="absolute top-6 right-6">
                      <Image
                        src="/home/testimonail-quote.png"
                        alt="quote"
                        width={isCenter ? 60 : 45}
                        height={isCenter ? 60 : 45}
                        className="w-auto h-auto"
                      />
                    </div>

                    <div className="grow overflow-hidden mt-6">
                      <div className="flex items-center gap-1 text-yellow-400 mb-3 text-xs">
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                        <FaStar />
                      </div>
                      <p
                        className={`text-gray-600 leading-relaxed italic ${isCenter ? "text-base line-clamp-5" : "text-sm line-clamp-4"}`}
                      >
                        &quot;{testimonial.description}&quot;
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-200 pt-4 mt-6 gap-2">
                      <div className="flex items-center gap-4">
                        {testimonial.image ? (
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={isCenter ? 64 : 52}
                            height={isCenter ? 64 : 52}
                            className={`rounded-full object-cover shrink-0 ${isCenter ? "w-16 h-16" : "w-13 h-13"}`}
                          />
                        ) : (
                          <div
                            className={`rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 flex-shrink-0 ${isCenter ? "w-16 h-16 text-2xl" : "w-13 h-13 text-xl"}`}
                          >
                            {testimonial.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <h3
                            className={`font-semibold text-gray-900 ${isCenter ? "text-lg" : "text-base"}`}
                          >
                            {testimonial.name}
                          </h3>
                          <span className="text-sm text-gray-500">
                            {testimonial.location}
                          </span>
                        </div>
                      </div>
                      {/* <div title="Google" className="w-8 h-8 p-1 bg-[#f1f1f1] flex items-center justify-center rounded cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg shrink-0">
                                                <a href="https://www.google.com" target="_blank" rel="noopener noreferrer">
                                                    <Image
                                                        src="/home/google.png"
                                                        alt="Google Logo"
                                                        width={20}
                                                        height={20}
                                                    />
                                                </a>
                                            </div> */}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {!initialLoading && testimonials.length > 0 && (
            <div className="flex sm:hidden items-center justify-center gap-4 mt-6 relative z-50">
              <button
                onClick={handlePrev}
                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-md text-xs font-bold text-[#0F172A] active:bg-slate-100"
              >
                <LuChevronLeft className="w-4 h-4 text-[#D68029]" /> Prev
              </button>
              <span className="text-xs font-mono font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
                {activeIndex + 1} / {testimonials.length}
              </span>
              <button
                onClick={handleNext}
                className="flex items-center gap-1.5 px-4 py-2 bg-white border border-slate-200 rounded-full shadow-md text-xs font-bold text-[#0F172A] active:bg-slate-100"
              >
                Next <LuChevronRight className="w-4 h-4 text-[#D68029]" />
              </button>
            </div>
          )}
        </Row>
      </div>
    </Section>
  );
};
export default Testimonials;
