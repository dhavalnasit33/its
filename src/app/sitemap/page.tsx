import { motion } from "framer-motion";
import Row from "@/components/Row";
import Section from "@/components/Section";
import SitemapSection from "@/components/sitemap/SitemapSection";
import { getNavigationStructure } from "@/lib/navigationService";
import Link from "next/link";

export default async function SitemapPage() {
  const navStructure = await getNavigationStructure();

  return (
    <>
    <Section className="common_background_gradient blog_hero_section flex flex-col items-center justify-center gap-10 ">
        <Row className="flex z-20">
            <div className="flex flex-wrap w-full mx-auto justify-center items-center">
              <div
                // initial={{ opacity: 0, y: -50 }}
                // whileInView={{ opacity: 1, y: 0 }}
                // viewport={{ once: true, amount: 0.1 }}
                // transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-5 w-full text-center"
              >
                <h1 className="text-center text-4xl md:text-[42px] lg:text-[46px]/[130%] text-black tracking-[1.2px] font-semibold">
                  Website Sitemap: <span className="text-[#d68029]">Navigate</span> with Ease
                  {/* <span className="text-[#d68029]">
                    Inspire Techno Solution
                  </span>{" "}
                  <br />
                  Tech Blog */}
                </h1>
              </div>
              <div
                // initial={{ opacity: 0, y: 50 }}
                // whileInView={{ opacity: 1, y: 0 }}
                // viewport={{ once: true, amount: 0.1 }}
                // transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full text-center text-black font-medium text-[18px]/[30px] flex justify-center mt-4"
              >
                <p className="text-[18px]/[32px] tracking-[0.02em] font-normal max-w-full xl:max-w-4/5">
                  Discover everything in one place. Browse through our services, company pages, blog sections, and resources to quickly find what you need at 
                  <Link
                    href="/"
                    className="text-[#d68029] font-semibold underline mx-1"
                  >
                    Inspire Techno Solution
                  </Link>
                 .
                </p>
              </div>
            </div>
        </Row>
    </Section>

    <SitemapSection navStructure={navStructure} />
    </>
  );
}