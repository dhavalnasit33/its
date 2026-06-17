import Row from "@/components/Row";
import Section from "@/components/Section";
import TermsCondition from "@/components/terms-condition/TermsCondition";

export default async function TermsConditionPage() {

  return (
    <>
    <Section className="common_background_gradient blog_hero_section flex flex-col items-center justify-center gap-10 ">
        <Row className="flex z-20">
            <div className="flex flex-wrap w-full mx-auto justify-center items-center">
              <div
                className="mb-5 w-full text-center"
              >
                <h1 className="text-center text-4xl md:text-[42px] lg:text-[46px]/[130%] text-black tracking-[1.2px] font-semibold">
                   Terms <span className="text-[#D68029]">&</span> Conditions
                </h1>
              </div>
              <div
                className="w-full text-center text-black font-medium text-[18px]/[30px] flex justify-center mt-4"
              >
                <p className="text-[18px]/[32px] tracking-[0.02em] font-normal max-w-full xl:max-w-4/5">
                    These Terms & Conditions govern your access to and use of Inspire Techno Solution's website, products, and services. By accessing our platform, you agree to 
                    comply with these terms, policies, and applicable laws. Please read them carefully before using our services.
                </p>
              </div>
            </div>
        </Row>
    </Section>
    <TermsCondition />
    </>
  );
}