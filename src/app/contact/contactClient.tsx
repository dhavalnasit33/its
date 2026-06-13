"use client";

import Testimonials from "@/components/home/Testimonials";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import ContactPageForm from "./ContactPageForm";
import ParallaxShape from "@/components/home/ParallaxShape";
import Section from "@/components/Section";
import Row from "@/components/Row";

export default function ContactClient() {
  return (
    <section className="bg-white">

      <Section className="bg-[#0d1b2a] ">
        {/* <div className=" text-left   max-w-[90%] lg:max-w-[80%] mx-auto"> */}
        <Row className=" text-left">
          <h6 className="text-white opacity-60  text-sm leading-[1.25] font-semibold uppercase tracking-[0.2em] max-[767px]:text-[12px] max-[767px]:tracking-[0.15em]">
            WE TURN BOLD IDEAS INTO SUCCESSFUL PRODUCTS
          </h6>
          <h1 className=" text-white font-medium mb-10 text-4xl md:text-[60px] lg:text-[76px]/[130%] leading-[1.1] mt-4  max-[767px]:leading-[1.15] max-[767px]:mt-3">
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
      <div className="lg:mt-10 relative lg:min-h-[100vh] ">
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
      </div>
    
      <Testimonials />

    </section>
  );
}



