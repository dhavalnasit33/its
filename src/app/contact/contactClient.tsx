"use client";

import Testimonials from "@/components/home/Testimonials";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ContactPageForm from "./ContactPageForm";
import ParallaxShape from "@/components/home/ParallaxShape";
import Section from "@/components/Section";
import Row from "@/components/Row";
import { BiCalendar } from "react-icons/bi";
import { MdEmail, MdPhone } from "react-icons/md";
import { useWebsiteSettings } from "@/context/WebsiteSettingsContext";

    

export default function ContactClient() {
const { contactEmail, phonePrimary, addressPrimary } = useWebsiteSettings();
  
const contactItems = [
        {
            icon: <MdEmail className="text-[22px] font-bold shrink-0" />,
            label: "Email",
            value: contactEmail,
            href: `mailto:${contactEmail}`,
            isEmail: true,
        },
        {
            icon: <MdPhone className="text-[22px] font-bold shrink-0" />,
            label: "Call",
            value: phonePrimary,
            href: `tel:${phonePrimary}`,
        },
        {
            icon: <MdPhone className="text-[22px] font-bold shrink-0" />,
            label: "Address",
            value: addressPrimary,
        },
    ];

  return (
    <section className="bg-white">

      <Section className="bg-[#0d1b2a] ">
        {/* <div className=" text-left   max-w-[90%] lg:max-w-[80%] mx-auto"> */}
        <Row className=" text-left">
          <h6 className="text-white opacity-60  text-sm leading-[1.25] font-semibold uppercase tracking-[0.2em] max-[767px]:text-[12px] max-[767px]:tracking-[0.15em]">
            WE TURN BOLD IDEAS INTO SUCCESSFUL PRODUCTS
          </h6>
          <h1 className=" text-white font-medium mb-12 md:mb-16 text-4xl md:text-[60px] lg:text-[76px]/[130%] leading-[1.1] max-[767px]:leading-[1.15] max-[767px]:mt-3">
            Got an idea?<br/>Let's talk!</h1>
        </Row>
        {/* </div> */}
         <ContactPageForm />
      </Section>
     
      <Section className="text-center  bg-[#0d1b2a]  lg:!pb-0 ">
        {/* <div className="w-full relative max-w-[90%] lg:max-w-[80%] mx-auto"> */}
         <Row >
        <div className="max-w-3xl space-y-3 mx-auto ">
          <h6 className="text-sm uppercase tracking-[0.2em] text-white opacity-70">VISIT OUR OFFICE OR DROP A LINE</h6>
          <h2 className="text-3xl md:text-4xl  font-medium text-white">Based in Surat,
            <br className="max-lg:hidden"/> building products for the world.  
          </h2>
          <p className="text-sm sm:text-base text-white opacity-70">
            Whether you prefer email, a quick call, or an in‑person meeting, our team is ready to explore your product idea and help you plan the next steps.
          </p>
        </div>
        </Row>
        {/* </div> */}
      </Section>

      <ParallaxShape type="bottom" bg="bg-[#0d1b2a]"  />




      {/* Full-Width Map */}
      {/* <div className="lg:mt-10 relative lg:min-h-[100vh] ">
        <div className="lg:fixed max-md:top-[50px] top-0 w-full z-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1043.5734208756965!2d72.88582798399636!3d21.236917844703505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fda718c65f9%3A0xb1fe219539f59c50!2sInspire%20Techno%20Solution%20-%20Web%20%26%20App%20Development%20Company%20in%20Surat!5e0!3m2!1sen!2sin!4v1758687073167!5m2!1sen!2sin"
            width="100%"
            height="1000vh"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div> */}
      <div className="lg:mt-10 relative w-full lg:min-h-screen ">
        <div className="lg:fixed  top-0 w-full lg:pt-20 relative">
          <div className="overflow-hidden  relative">
            <div className="group  w-full">
             <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1043.5734208756965!2d72.88582798399636!3d21.236917844703505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04fda718c65f9%3A0xb1fe219539f59c50!2sInspire%20Techno%20Solution%20-%20Web%20%26%20App%20Development%20Company%20in%20Surat!5e0!3m2!1sen!2sin!4v1758687073167!5m2!1sen!2sin"
              width="100%"
              // height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              className=" w-full  h-[300px]  md:h-[500px] lg:h-screen grayscale-100  group-hover:grayscale-0 transition-all duration-700 "
              referrerPolicy="no-referrer-when-downgrade"
            />
            </div>

          <div className="relative sm:absolute lg:top-[130px] lg:right-[65px] hidden md:flex justify-end px-4 lg:px-0">
            <div className="overflow-hidden rounded-2xl border border-[#0d1b2a] bg-[#0d1b2a] bg-clip-padding backdrop-blur-xl 
                          shadow-[0_18px_45px_rgba(0,0,0,0.5)] p-6 md:p-7 space-y-5 max-w-[400px] w-full text-white">
                  <div className="flex items-center justify-between sm:gap-3 gap-2">
                      <div>
                          <h3 className="text-sm uppercase tracking-[0.18em] opacity-60">
                              CONTACT DETAILS
                          </h3>
                          <p className=" mt-1 text-xl  text-white">
                              Let's plan your next release.
                          </p>
                      </div>
                      <div className="flex w-6 h-6 rounded-full bg-white/10 border border-white/10 items-center justify-center">
                          <span className="w-2 h-2 rounded-full bg-[#02caa6] shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                      </div>
                  </div>
  
                  <div className="md:space-y-4 mt-6 text-base md:text-xl">
                      {contactItems.map((item, index) => (
                          <a
                              key={index}
                              href={item.href}
                              rel="noopener noreferrer"
                              className={`flex items-start gap-3 w-full rounded-md bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 text-left transition-colors 
                                ${index !== contactItems.length - 1 ? "mb-4" : "mb-0" }`}
                          >
                              <div className="p-2 rounded-md bg-white/10">
                                  {item.icon}
                              </div>
  
                              <div className="flex flex-col">
                                  <h4 className="text-xs uppercase tracking-[0.16em] text-gray-100 ">
                                      {item.label}
                                  </h4>
  
                                  <p
                                      className={`text-sm ${item.isEmail ? "break-all" : "wrap-break-words"
                                          }`}
                                  >
                                      {item.value}
                                  </p>
                              </div>
                          </a>
                      ))}
                  </div>
  
                  <button
                      type="button"
                      className="w-full mt-7 flex items-center gap-3 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 text-left transition-colors"
                  >
                      <div className=" p-3 bg-white/10 rounded-md">
                          <BiCalendar size={30} />
                      </div>
                      <h4 className="text-[18px] text-white font-semibold leading-[22px] capitalize">
                          Book a meeting
                      </h4>
                  </button>
                  <div className="flex justify-end">
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-auto"
                        href="https://www.dmca.com/Protection/Status.aspx?ID=bacf8e02-d48d-415f-8b3b-cf0dbe330960"
                    >
                        <Image
                            alt="DMCA.com"
                            src="/home/dmca.png"
                            width={250}
                            height={50}
                            className="h-8 w-auto"
                        />
                    </a>
                  </div>
              </div>
            </div>
            </div>
          </div>
        </div>
      {/* </div> */}
      <Testimonials />

    </section>
  );
}



